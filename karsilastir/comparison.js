// Provider Comparison Page Logic
(function () {
  "use strict";

  const MAX_SELECTION = 4;
  let selectedProviders = [];
  let allProviders = [];

  // Logo mapping
  const providerLogos = {
    'iyzico': 'https://www.iyzico.com/assets/images/content/iyzico-one-line.svg',
    'paytr': 'https://www.paytr.com/logo/logo-dark.svg',
    'bkm-express': 'https://bkmexpress.com.tr/assets/images/bkm-express-logo.svg',
    'papara-business': 'https://www.papara.com/images/papara-logo.svg',
    'param': 'https://param.com.tr/Content/images/param-logo.png',
    'moka': 'https://moka.com/assets/img/moka-logo.svg',
    'payflex': 'https://logo.clearbit.com/payflex.com.tr',
    'tosla': 'https://tosla.com/assets/logo.svg',
    'kolektif': 'https://kolektifhouse.co/assets/logo.svg',
    // Banks - locally hosted
    'garanti-bbva': '/assets/logos/banks/garanti-bbva.svg',
    'akbank': '/assets/logos/banks/akbank.svg',
    'isbankasi': '/assets/logos/banks/isbank.svg',
    'yapi-kredi': '/assets/logos/banks/yapi-kredi.svg',
    'qnb-finansbank': '/assets/logos/banks/qnb-finansbank.svg'
  };

  function getProviderLogoUrl(providerId) {
    return providerLogos[providerId] || null;
  }

  // Load providers
  async function loadProviders() {
    try {
      const response = await fetch('/data/providers.json');
      if (!response.ok) throw new Error('Failed to load providers');
      
      allProviders = await response.json();
      renderProviderSelector();
      
      // Check for URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const compare = urlParams.get('compare');
      if (compare) {
        const ids = compare.split(',').slice(0, MAX_SELECTION);
        ids.forEach(id => {
          const provider = allProviders.find(p => p.id === id);
          if (provider) {
            selectedProviders.push(provider);
          }
        });
        if (selectedProviders.length >= 2) {
          updateComparison();
        }
      }
      
    } catch (error) {
      console.error('Error loading providers:', error);
    }
  }

  // Render provider selector
  function renderProviderSelector() {
    const grid = document.getElementById('provider-selector-grid');
    grid.innerHTML = allProviders.map(provider => {
      const logoUrl = getProviderLogoUrl(provider.id);
      const logoHtml = logoUrl
        ? `<img src="${logoUrl}" alt="${provider.name}" onerror="this.parentElement.innerHTML='<div style=\\'font-size: 1.5rem; font-weight: 700;\\'>${provider.logo}</div>'">`
        : `<div style="font-size: 1.5rem; font-weight: 700;">${provider.logo}</div>`;
      
      const isSelected = selectedProviders.some(p => p.id === provider.id);
      
      return `
        <div class="provider-select-card ${isSelected ? 'selected' : ''}" data-provider-id="${provider.id}">
          <div class="provider-select-logo">
            ${logoHtml}
          </div>
          <div style="font-weight: 600; font-size: 0.875rem;">${provider.name}</div>
          <div style="font-size: 0.75rem; color: var(--gray-600);">${provider.type}</div>
        </div>
      `;
    }).join('');

    // Add click handlers
    document.querySelectorAll('.provider-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const providerId = card.dataset.providerId;
        toggleProviderSelection(providerId);
      });
    });
  }

  // Toggle provider selection
  function toggleProviderSelection(providerId) {
    const provider = allProviders.find(p => p.id === providerId);
    if (!provider) return;

    const index = selectedProviders.findIndex(p => p.id === providerId);
    
    if (index >= 0) {
      // Deselect
      selectedProviders.splice(index, 1);
    } else {
      // Select
      if (selectedProviders.length >= MAX_SELECTION) {
        alert(`En fazla ${MAX_SELECTION} sağlayıcı seçebilirsiniz.`);
        return;
      }
      selectedProviders.push(provider);
    }

    // Update URL
    if (selectedProviders.length > 0) {
      const ids = selectedProviders.map(p => p.id).join(',');
      const newUrl = `${window.location.pathname}?compare=${ids}`;
      window.history.replaceState({}, '', newUrl);
    } else {
      window.history.replaceState({}, '', window.location.pathname);
    }

    renderProviderSelector();
    updateComparison();
  }

  // Update comparison table
  function updateComparison() {
    const comparisonSection = document.getElementById('comparison-section');
    const emptyState = document.getElementById('empty-state');

    if (selectedProviders.length < 2) {
      comparisonSection.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    comparisonSection.style.display = 'block';
    emptyState.style.display = 'none';

    renderComparisonTable();
  }

  // Render comparison table
  function renderComparisonTable() {
    const table = document.querySelector('.comparison-table');
    const thead = table.querySelector('thead tr');
    const tbody = document.getElementById('comparison-table-body');

    // Render headers
    thead.innerHTML = '<th>Özellik</th>' + selectedProviders.map(provider => {
      const logoUrl = getProviderLogoUrl(provider.id);
      const logoHtml = logoUrl
        ? `<img src="${logoUrl}" alt="${provider.name}">`
        : `<div style="font-size: 1.5rem; font-weight: 700;">${provider.logo}</div>`;

      return `
        <th class="provider-column">
          <div class="provider-header-content">
            <div class="provider-header-logo">
              ${logoHtml}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 1rem;">${provider.name}</div>
              <div style="font-size: 0.875rem; color: var(--gray-600); font-weight: 400;">${provider.type}</div>
            </div>
            <div class="provider-rating-display">
              <i class="fas fa-star" style="color: #ffd700;"></i>
              <span>${provider.rating.toFixed(1)}/5</span>
              <span style="color: var(--gray-600);">(${provider.reviews})</span>
            </div>
          </div>
        </th>
      `;
    }).join('');

    // Render comparison rows
    const rows = [
      {
        label: 'Genel Bilgi',
        getValue: (p) => p.cardDescription
      },
      {
        label: 'Öne Çıkan Özellikler',
        getValue: (p) => p.features && p.features.length > 0
          ? `<ul class="feature-list">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>`
          : '-'
      },
      {
        label: 'Fiyatlandırma',
        getValue: (p) => p.pricing
          ? `<div class="pricing-display">${p.pricing.headline}</div><div style="font-size: 0.75rem; color: var(--gray-600); margin-top: 0.25rem;">${p.pricing.label}</div>`
          : 'Teklif alın'
      },
      {
        label: 'Ödeme Döngüsü',
        getValue: (p) => p.metrics?.settlement || '-'
      },
      {
        label: 'Müşteri Desteği',
        getValue: (p) => p.metrics?.support || '-'
      },
      {
        label: 'Uptime',
        getValue: (p) => p.metrics?.uptime || '-'
      },
      {
        label: 'Başarı Oranı',
        getValue: (p) => p.metrics?.successRate || '-'
      },
      {
        label: 'Entegrasyon Süresi',
        getValue: (p) => p.comparison?.goLive || '-'
      },
      {
        label: 'Minimum Taahhüt',
        getValue: (p) => p.comparison?.minCommitment || '-'
      },
      {
        label: 'Uyumluluk Sertifikaları',
        getValue: (p) => p.comparison?.compliance && p.comparison.compliance.length > 0
          ? p.comparison.compliance.join(', ')
          : '-'
      },
      {
        label: 'Hazır Entegrasyonlar',
        getValue: (p) => p.comparison?.integrations && p.comparison.integrations.length > 0
          ? p.comparison.integrations.join(', ')
          : '-'
      },
      {
        label: 'Kampanya',
        getValue: (p) => p.campaign
          ? `<strong>${p.campaign.text}</strong><br><small>Son tarih: ${p.campaign.expires}</small>`
          : '<span style="color: var(--gray-500);">Aktif kampanya yok</span>'
      },
      {
        label: 'İşlemler',
        getValue: (p) => `
          <div class="cta-compare">
            <a href="/provider/?id=${p.id}" class="btn-primary" style="display: inline-block; padding: 0.75rem 1.5rem; text-decoration: none;">
              <i class="fas fa-info-circle"></i> Detaylı Bilgi
            </a>
          </div>
        `
      }
    ];

    tbody.innerHTML = rows.map(row => {
      return `
        <tr>
          <td>${row.label}</td>
          ${selectedProviders.map(provider => {
            const value = row.getValue(provider);
            return `<td class="provider-column">${value}</td>`;
          }).join('')}
        </tr>
      `;
    }).join('');
  }

  // Initialize
  loadProviders();
})();

