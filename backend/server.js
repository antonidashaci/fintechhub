const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'data', 'submissions.json');
const CONTENT_FILE = path.join(__dirname, 'data', 'content.json');

const ensureStore = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
        fs.writeFileSync(DATA_FILE, JSON.stringify({
            requests: [],
            contacts: [],
            newsletter: []
        }, null, 2));
    }
};

const ensureContentStore = () => {
    if (!fs.existsSync(CONTENT_FILE)) {
        fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
        fs.writeFileSync(CONTENT_FILE, JSON.stringify({
            news: [],
            regulations: []
        }, null, 2));
    }
};

const readStore = () => {
    ensureStore();
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        return raw ? JSON.parse(raw) : { requests: [], contacts: [], newsletter: [] };
    } catch (error) {
        console.error('Veri okunamadı:', error);
        return { requests: [], contacts: [], newsletter: [] };
    }
};

const readContentStore = () => {
    ensureContentStore();
    try {
        const raw = fs.readFileSync(CONTENT_FILE, 'utf8');
        return raw ? JSON.parse(raw) : { news: [], regulations: [] };
    } catch (error) {
        console.error('İçerik verisi okunamadı:', error);
        return { news: [], regulations: [] };
    }
};

const writeStore = data => {
    ensureStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const getTotals = data => ({
    requests: data.requests.length,
    contacts: data.contacts.length,
    newsletter: data.newsletter.length,
    lastUpdate: [
        ...data.requests,
        ...data.contacts,
        ...data.newsletter
    ].sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0))[0]?.createdAt || null
});

const validateFields = (payload, required) => {
    const missing = required.filter(field => !payload[field] || String(payload[field]).trim() === '');
    return missing;
};

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        name: 'Fintech Hub Türkiye API',
        status: 'online',
        endpoints: ['POST /api/requests', 'POST /api/contact', 'POST /api/newsletter', 'GET /api/admin/summary']
    });
});

app.get('/api/admin/summary', (req, res) => {
    const data = readStore();
    res.json({ totals: getTotals(data) });
});

app.get('/api/content', (req, res) => {
    const content = readContentStore();
    res.json(content);
});

app.get('/api/content/:section', (req, res) => {
    const { section } = req.params;
    const content = readContentStore();
    const key = section?.toLowerCase();
    if (!key || !(key in content)) {
        return res.status(404).json({ error: 'İstenen içerik bulunamadı.' });
    }
    res.json({ items: content[key], total: Array.isArray(content[key]) ? content[key].length : undefined });
});

app.post('/api/requests', (req, res) => {
    const payload = req.body || {};
    const missing = validateFields(payload, ['fullName', 'email', 'company', 'provider', 'intent']);
    if (missing.length) {
        return res.status(400).json({ error: `Eksik alanlar: ${missing.join(', ')}` });
    }

    const now = new Date().toISOString();
    const entry = {
        id: `req_${Date.now()}`,
        fullName: payload.fullName,
        company: payload.company,
        email: payload.email,
        phone: payload.phone || null,
        provider: payload.provider,
        volume: payload.volume || null,
        notes: payload.notes || null,
        intent: payload.intent,
        source: payload.source || payload.origin || 'web',
        createdAt: payload.timestamp || now
    };

    const data = readStore();
    data.requests.unshift(entry);
    writeStore(data);
    res.status(201).json({ message: 'Talebiniz kaydedildi.', totals: getTotals(data) });
});

app.post('/api/contact', (req, res) => {
    const payload = req.body || {};
    const missing = validateFields(payload, ['name', 'email', 'company', 'topic', 'message']);
    if (missing.length) {
        return res.status(400).json({ error: `Eksik alanlar: ${missing.join(', ')}` });
    }

    const now = new Date().toISOString();
    const entry = {
        id: `contact_${Date.now()}`,
        name: payload.name,
        company: payload.company,
        email: payload.email,
        phone: payload.phone || null,
        topic: payload.topic,
        volume: payload.volume || null,
        message: payload.message,
        source: payload.source || payload.origin || 'web',
        createdAt: payload.timestamp || now
    };

    const data = readStore();
    data.contacts.unshift(entry);
    writeStore(data);
    res.status(201).json({ message: 'Mesajınız kaydedildi.', totals: getTotals(data) });
});

app.post('/api/newsletter', (req, res) => {
    const payload = req.body || {};
    const missing = validateFields(payload, ['email']);
    if (missing.length) {
        return res.status(400).json({ error: 'E-posta adresi zorunludur.' });
    }

    const now = new Date().toISOString();
    const entry = {
        id: `newsletter_${Date.now()}`,
        email: payload.email,
        source: payload.source || 'web',
        createdAt: payload.timestamp || now
    };

    const data = readStore();
    const alreadyExists = data.newsletter.some(item => item.email === entry.email && item.source === entry.source);
    if (!alreadyExists) {
        data.newsletter.unshift(entry);
        writeStore(data);
    }

    res.status(201).json({ message: 'Bülten aboneliğiniz kaydedildi.', totals: getTotals(data) });
});

app.use((err, req, res, next) => {
    console.error('Sunucu hatası:', err);
    res.status(500).json({ error: 'Beklenmeyen bir hata oluştu.' });
});

app.listen(PORT, () => {
    ensureStore();
    ensureContentStore();
    console.log(`Fintech Hub Türkiye API ${PORT} portunda çalışıyor`);
});
