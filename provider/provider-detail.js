// Provider Detail Page Logic
(function () {
  "use strict";

  // Logo URL mapping (same as main app.js)
  const providerLogos = {
    'iyzico': 'https://www.iyzico.com/assets/images/content/iyzico-one-line.svg',
    'payflex': 'https://logo.clearbit.com/payflex.com.tr',
    'papara-business': 'https://www.papara.com/images/papara-logo.svg',
    'apiconnect': 'https://logo.clearbit.com/apiconnect.com',
    'bulut-tahsilat': 'https://logo.clearbit.com/buluttahsilat.com',
    'ledgerly': 'https://logo.clearbit.com/ledgerly.com',
    'bnpl-max': 'https://logo.clearbit.com/bnplmax.com',
    'neo-sigorta': 'https://logo.clearbit.com/neosigorta.com',
    'riskvision': 'https://logo.clearbit.com/riskvision.ai',
    'garanti-bbva': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Garanti_BBVA_logo.svg/200px-Garanti_BBVA_logo.svg.png',
    'akbank': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Akbank_logo.svg/200px-Akbank_logo.svg.png',
    'isbankasi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/T%C3%BCrkiye_%C4%B0%C5%9F_Bankas%C4%B1_logo.svg/200px-T%C3%BCrkiye_%C4%B0%C5%9F_Bankas%C4%B1_logo.svg.png',
    'yapi-kredi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Yap%C4%B1_Kredi_logo.svg/200px-Yap%C4%B1_Kredi_logo.svg.png',
    'qnb-finansbank': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/QNB_Finansbank_logo.svg/200px-QNB_Finansbank_logo.svg.png'
  };

  function getProviderLogoUrl(providerId) {
    return providerLogos[providerId] || null;
  }

  // Get provider ID from URL
  function getProviderIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  // Load provider data
  async function loadProviderData(providerId) {
    try {
      const response = await fetch('/data/providers.json');
      if (!response.ok) throw new Error('Failed to load providers');
      
      const providers = await response.json();
      const provider = providers.find(p => p.id === providerId);
      
      if (!provider) {
        throw new Error('Provider not found');
      }
      
      return provider;
    } catch (error) {
      console.error('Error loading provider:', error);
      throw error;
    }
  }

  // Render provider hero
  function renderHero(provider) {
    const logoUrl = getProviderLogoUrl(provider.id);
    const logoElement = document.getElementById('hero-logo');
    
    if (logoUrl) {
      logoElement.innerHTML = `<img src="${logoUrl}" alt="${provider.name} logo" onerror="this.parentElement.innerHTML='<div style=\\'font-size: 2rem; font-weight: 700;\\'>${provider.logo}</div>'">`;
    } else {
      logoElement.innerHTML = `<div style="font-size: 2rem; font-weight: 700;">${provider.logo}</div>`;
    }
    
    document.getElementById('hero-name').textContent = provider.name;
    document.getElementById('hero-type').textContent = provider.type;
    document.getElementById('hero-rating').textContent = provider.rating.toFixed(1);
    document.getElementById('hero-reviews').textContent = `(${provider.reviews} değerlendirme)`;
    
    const badgesContainer = document.getElementById('hero-badges');
    if (provider.badges && provider.badges.length > 0) {
      badgesContainer.innerHTML = provider.badges
        .map(badge => `<span class="provider-badge">${badge}</span>`)
        .join('');
    }
    
    // Update page meta
    document.getElementById('page-title').textContent = `${provider.name} - ${provider.type} | Fintech Hub Türkiye`;
    document.getElementById('page-description').content = provider.modalSummary || provider.cardDescription;
    document.getElementById('page-keywords').content = (provider.keywords || []).join(', ');
    document.getElementById('og-title').content = `${provider.name} | Fintech Hub Türkiye`;
    document.getElementById('og-description').content = provider.cardDescription;
  }

  // Render campaign banner
  function renderCampaign(provider) {
    if (!provider.campaign) return;
    
    const banner = document.getElementById('campaign-banner');
    banner.style.display = 'flex';
    banner.innerHTML = `
      <div class="campaign-icon">
        <i class="fas fa-gift"></i>
      </div>
      <div class="campaign-content">
        <h3><span class="provider-badge" style="background: rgba(0,0,0,0.1);">${provider.campaign.label}</span> ${provider.campaign.text}</h3>
        ${provider.campaign.expires ? `<p class="campaign-expires"><i class="fas fa-clock"></i> Son başvuru: ${provider.campaign.expires}</p>` : ''}
      </div>
    `;
  }

  // Render overview tab
  function renderOverview(provider) {
    const overview = document.getElementById('tab-overview');
    overview.innerHTML = `
      <div class="info-section">
        <h2><i class="fas fa-building"></i> ${provider.name} Hakkında</h2>
        <p style="font-size: 1.125rem; line-height: 1.7; color: var(--gray-700);">
          ${provider.modalSummary || provider.cardDescription}
        </p>
        
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Kuruluş Türü</span>
            <span class="info-value">${provider.type}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Değerlendirme</span>
            <span class="info-value">
              <i class="fas fa-star" style="color: #ffd700;"></i> ${provider.rating.toFixed(1)} / 5.0
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">Kullanıcı Yorumu</span>
            <span class="info-value">${provider.reviews} değerlendirme</span>
          </div>
          ${provider.metrics?.settlement ? `
          <div class="info-item">
            <span class="info-label">Ödeme Döngüsü</span>
            <span class="info-value">${provider.metrics.settlement}</span>
          </div>` : ''}
          ${provider.metrics?.support ? `
          <div class="info-item">
            <span class="info-label">Destek</span>
            <span class="info-value">${provider.metrics.support}</span>
          </div>` : ''}
          ${provider.metrics?.uptime ? `
          <div class="info-item">
            <span class="info-label">Çalışma Süresi</span>
            <span class="info-value">${provider.metrics.uptime}</span>
          </div>` : ''}
        </div>
      </div>
      
      ${provider.differentiators && provider.differentiators.length > 0 ? `
      <div class="info-section">
        <h2><i class="fas fa-star"></i> Temel Farklılaştırıcılar</h2>
        <div class="features-grid">
          ${provider.differentiators.map(diff => `
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-check"></i>
              </div>
              <span>${diff}</span>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
    `;
  }

  // Render features tab
  function renderFeatures(provider) {
    const features = document.getElementById('tab-features');
    features.innerHTML = `
      <div class="info-section">
        <h2><i class="fas fa-list-check"></i> Teknik Özellikler</h2>
        ${provider.features && provider.features.length > 0 ? `
        <div class="features-grid">
          ${provider.features.map(feature => `
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <span>${feature}</span>
            </div>
          `).join('')}
        </div>` : '<p>Özellik bilgisi mevcut değil.</p>'}
      </div>
      
      ${provider.comparison ? `
      <div class="info-section">
        <h2><i class="fas fa-chart-bar"></i> Karşılaştırma Bilgileri</h2>
        <div class="info-grid">
          ${provider.comparison.goLive ? `
          <div class="info-item">
            <span class="info-label">Entegrasyon Süresi</span>
            <span class="info-value">${provider.comparison.goLive}</span>
          </div>` : ''}
          ${provider.comparison.minCommitment ? `
          <div class="info-item">
            <span class="info-label">Minimum Taahhüt</span>
            <span class="info-value">${provider.comparison.minCommitment}</span>
          </div>` : ''}
          ${provider.comparison.compliance && provider.comparison.compliance.length > 0 ? `
          <div class="info-item">
            <span class="info-label">Uyumluluk Sertifikaları</span>
            <span class="info-value">${provider.comparison.compliance.join(', ')}</span>
          </div>` : ''}
          ${provider.comparison.integrations && provider.comparison.integrations.length > 0 ? `
          <div class="info-item">
            <span class="info-label">Hazır Entegrasyonlar</span>
            <span class="info-value">${provider.comparison.integrations.join(', ')}</span>
          </div>` : ''}
        </div>
      </div>` : ''}
    `;
  }

  // Render pricing tab
  function renderPricing(provider) {
    const pricing = document.getElementById('tab-pricing');
    
    if (!provider.pricing) {
      pricing.innerHTML = `
        <div class="info-section">
          <h2><i class="fas fa-tag"></i> Fiyatlandırma</h2>
          <p>Fiyatlandırma bilgisi için lütfen doğrudan şirketle iletişime geçin.</p>
        </div>
      `;
      return;
    }
    
    pricing.innerHTML = `
      <div class="info-section">
        <h2><i class="fas fa-tag"></i> Fiyatlandırma</h2>
        <div style="background: var(--gray-50); padding: 2rem; border-radius: var(--border-radius); text-align: center; margin: 1.5rem 0;">
          <p style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">${provider.pricing.label}</p>
          <p style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color); margin: 0;">${provider.pricing.headline}</p>
        </div>
        
        ${provider.pricing.tiers && provider.pricing.tiers.length > 0 ? `
        <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Fiyatlandırma Seviyeleri</h3>
        <div class="pricing-tiers">
          ${provider.pricing.tiers.map(tier => `
            <div class="pricing-tier">
              <span class="pricing-label">${tier.label}</span>
              <span class="pricing-value">${tier.value}</span>
            </div>
          `).join('')}
        </div>` : ''}
        
        ${provider.pricing.notes ? `
        <p style="margin-top: 1.5rem; padding: 1rem; background: var(--gray-50); border-radius: var(--border-radius); font-size: 0.875rem; color: var(--gray-600);">
          <i class="fas fa-info-circle"></i> ${provider.pricing.notes}
        </p>` : ''}
      </div>
    `;
  }

  // Render integration tab
  function renderIntegration(provider) {
    const integration = document.getElementById('tab-integration');
    integration.innerHTML = `
      <div class="info-section">
        <h2><i class="fas fa-code"></i> Entegrasyon ve Dokümantasyon</h2>
        
        ${provider.resources && provider.resources.length > 0 ? `
        <div class="resources-grid">
          ${provider.resources.map(resource => `
            <a href="${resource.url}" target="_blank" class="resource-card">
              <div class="resource-icon">
                <i class="fas ${resource.icon}"></i>
              </div>
              <div>
                <div style="font-weight: 600;">${resource.label}</div>
                <div style="font-size: 0.875rem; color: var(--gray-600);">
                  <i class="fas fa-external-link-alt"></i> ${new URL(resource.url).hostname}
                </div>
              </div>
            </a>
          `).join('')}
        </div>` : '<p>Dokümantasyon linkleri yakında eklenecek.</p>'}
      </div>
      
      ${provider.comparison?.integrations && provider.comparison.integrations.length > 0 ? `
      <div class="info-section">
        <h2><i class="fas fa-plug"></i> Hazır Entegrasyonlar</h2>
        <div class="features-grid">
          ${provider.comparison.integrations.map(integration => `
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-puzzle-piece"></i>
              </div>
              <span>${integration}</span>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
    `;
  }

  // Render contact tab
  function renderContact(provider) {
    const contact = document.getElementById('tab-contact');
    contact.innerHTML = `
      <div class="info-section">
        <h2><i class="fas fa-phone"></i> İletişim Bilgileri</h2>
        
        ${provider.contact ? `
        <div class="info-grid">
          ${provider.contact.email ? `
          <div class="info-item">
            <span class="info-label">E-posta</span>
            <span class="info-value">
              <a href="mailto:${provider.contact.email}" style="color: var(--primary-color);">
                <i class="fas fa-envelope"></i> ${provider.contact.email}
              </a>
            </span>
          </div>` : ''}
          ${provider.contact.phone ? `
          <div class="info-item">
            <span class="info-label">Telefon</span>
            <span class="info-value">
              <a href="tel:${provider.contact.phone.replace(/\s/g, '')}" style="color: var(--primary-color);">
                <i class="fas fa-phone"></i> ${provider.contact.phone}
              </a>
            </span>
          </div>` : ''}
        </div>` : '<p>İletişim bilgileri için lütfen resmi websitesini ziyaret edin.</p>'}
        
        ${provider.resources && provider.resources.length > 0 ? `
        <div style="margin-top: 2rem;">
          <h3 style="margin-bottom: 1rem;">Faydalı Linkler</h3>
          <div class="resources-grid">
            ${provider.resources.map(resource => `
              <a href="${resource.url}" target="_blank" class="resource-card">
                <div class="resource-icon">
                  <i class="fas ${resource.icon}"></i>
                </div>
                <span>${resource.label}</span>
              </a>
            `).join('')}
          </div>
        </div>` : ''}
      </div>
    `;
  }

  // Tab switching
  function setupTabs() {
    const tabs = document.querySelectorAll('.provider-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        contents.forEach(c => c.classList.remove('active'));
        document.getElementById(`tab-${targetTab}`).classList.add('active');
        
        // Update URL hash
        window.location.hash = targetTab;
        
        // Scroll to tabs
        document.querySelector('.provider-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    
    // Handle initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`[data-tab="${hash}"]`)) {
      document.querySelector(`[data-tab="${hash}"]`).click();
    }
  }

  // Main initialization
  async function init() {
    const providerId = getProviderIdFromUrl();
    
    if (!providerId) {
      document.getElementById('loading-state').style.display = 'none';
      document.getElementById('error-state').style.display = 'block';
      return;
    }
    
    try {
      const provider = await loadProviderData(providerId);
      
      // Render all sections
      renderHero(provider);
      renderCampaign(provider);
      renderOverview(provider);
      renderFeatures(provider);
      renderPricing(provider);
      renderIntegration(provider);
      renderContact(provider);
      
      // Setup tabs
      setupTabs();
      
      // Update CTA button
      if (provider.resources && provider.resources.length > 0) {
        const websiteLink = provider.resources.find(r => r.label.includes('Dokümantasyon') || r.url);
        if (websiteLink) {
          document.getElementById('cta-primary').href = websiteLink.url;
        }
      }
      
      // Show content, hide loading
      document.getElementById('loading-state').style.display = 'none';
      document.getElementById('provider-content').style.display = 'block';
      
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('loading-state').style.display = 'none';
      document.getElementById('error-state').style.display = 'block';
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

