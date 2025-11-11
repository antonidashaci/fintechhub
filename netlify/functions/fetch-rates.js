// Netlify Function to fetch TCMB rates
const https = require("https");

const SERIES = [
  { code: "TP.DK.USD.A", symbol: "USD/TRY", icon: "fa-dollar-sign" },
  { code: "TP.DK.EUR.A", symbol: "EUR/TRY", icon: "fa-euro-sign" },
  { code: "TP.DK.GBP.A", symbol: "GBP/TRY", icon: "fa-sterling-sign" },
  { code: "TP.DK.CHF.A", symbol: "CHF/TRY", icon: "fa-money-bill-wave" },
  { code: "TP.DK.CNY.A", symbol: "CNY/TRY", icon: "fa-yen-sign" },
  { code: "TP.DK.XAU.A", symbol: "GAU/TRY", icon: "fa-coins" }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      const { statusCode } = response;
      if (statusCode < 200 || statusCode >= 300) {
        response.resume();
        reject(new Error(`HTTP ${statusCode} error`));
        return;
      }

      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        try {
          const raw = Buffer.concat(chunks).toString("utf8");
          const data = JSON.parse(raw);
          resolve(data);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });

    request.on("error", (err) => reject(err));
  });
}

function formatForApi(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatForDisplay(date) {
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function parseEvdsDate(value) {
  const [day, month, year] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toNumber(value) {
  if (value == null) return null;
  if (typeof value === "number") return value;
  const normalized = String(value).replace(",", ".");
  const result = Number.parseFloat(normalized);
  return Number.isFinite(result) ? result : null;
}

function formatValue(value) {
  const formatter = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
  return formatter.format(value);
}

function formatChange(value) {
  const formatter = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const sign = value >= 0 ? "+" : "";
  return `${sign}${formatter.format(value)}%`;
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=3600" // Cache for 1 hour
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    const apiKey = process.env.EVDS_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "EVDS_API_KEY not configured" })
      };
    }

    // Build request
    const now = new Date();
    const endDate = formatForApi(now);
    const startWindow = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const startDate = formatForApi(startWindow);

    const baseUrl = new URL("https://evds2.tcmb.gov.tr/service/evds/");
    baseUrl.searchParams.set("series", SERIES.map((item) => item.code).join("-"));
    baseUrl.searchParams.set("startDate", startDate);
    baseUrl.searchParams.set("endDate", endDate);
    baseUrl.searchParams.set("type", "json");
    baseUrl.searchParams.set("key", apiKey);

    // Fetch data
    const response = await fetchJson(baseUrl.toString());
    
    if (!response || !Array.isArray(response.items) || response.items.length === 0) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "No data returned from TCMB EVDS" })
      };
    }

    // Transform response
    const sortedItems = [...response.items].sort((a, b) => {
      const dateA = parseEvdsDate(a.Tarih);
      const dateB = parseEvdsDate(b.Tarih);
      return dateA - dateB;
    });

    const latest = sortedItems[sortedItems.length - 1];
    const previous = sortedItems[sortedItems.length - 2] || latest;
    const lastUpdated = formatForDisplay(parseEvdsDate(latest.Tarih));

    const rates = SERIES.map((series) => {
      const key = series.code.replace(/\./g, "_");
      const latestValue = toNumber(latest[key]);
      const previousValue = toNumber(previous[key]);

      if (latestValue == null) {
        throw new Error(`No data for ${series.code}`);
      }

      const change = previousValue
        ? ((latestValue - previousValue) / previousValue) * 100
        : 0;

      return {
        symbol: series.symbol,
        icon: series.icon,
        value: formatValue(latestValue),
        rawValue: latestValue,
        change: formatChange(change),
        direction: change < 0 ? "down" : "up"
      };
    });

    const payload = {
      source: "TCMB EVDS",
      series: SERIES.map((item) => item.code),
      requestedRange: { startDate, endDate },
      lastUpdated,
      rates
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(payload)
    };

  } catch (error) {
    console.error("Error fetching rates:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Failed to fetch rates",
        message: error.message 
      })
    };
  }
};

