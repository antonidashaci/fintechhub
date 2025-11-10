const providers = [
  {
    id: "iyzico",
    name: "iyzico",
    logo: "iyz",
    categories: ["payment-gateway"],
    type: "Ödeme Geçidi",
    rating: 4.8,
    reviews: 326,
    featured: true,
    isNew: false,
    badges: ["En Popüler"],
    cardDescription:
      "210+ banka entegrasyonu, PCI DSS 4.0 uyumu ve gelişmiş fraud yönetimiyle en kapsamlı ödeme geçidi.",
    modalSummary:
      "iyzico, yüksek işlem hacimli perakende ve pazaryeri platformları için optimize edilmiş ödeme geçidi sunar. PCI DSS 4.0 uyumu, PSD2 hazır mimarisi ve güçlü fraud yönetim panelleriyle ölçeklenebilirlik sağlar.",
    features: ["PCI DSS Level 1", "3D Secure 2.2", "REST & GraphQL API", "Webhook Retry"],
    differentiators: [
      "210+ banka/kart entegrasyonu",
      "T+1 ödeme döngüsü",
      "Gelişmiş fraud ekranı",
      "Dinamik kur oranı yönetimi"
    ],
    pricing: {
      label: "Komisyon:",
      headline: "%2.79 + ₺0.19",
      feeModel: { percentage: 2.79, fixed: 0.19, subscription: 0, currency: "TRY", installment: 0.45 },
      tiers: [
        { label: "₺0 - ₺250K", value: "%2.79 + ₺0.19" },
        { label: "₺250K - ₺750K", value: "%2.59 + ₺0.15" },
        { label: "₺750K+", value: "Özel fiyatlandırma" }
      ],
      notes: "Taksit başına +%0.45 maliyet uygulanır."
    },
    campaign: { label: "Kampanya", text: "Yeni POS entegrasyonunda %25 indirim", expires: "31 Mart 2025" },
    metrics: { settlement: "T+1", support: "7/24 Türkçe", uptime: "%99.95", successRate: "%99.2" },
    keywords: ["iyzico", "ödeme geçidi", "sanal pos", "fraud", "checkout"],
    addedAt: "2024-11-15",
    resources: [
      { label: "Dokümantasyon", url: "https://docs.iyzico.com", icon: "fa-book" },
      { label: "Sandbox", url: "https://sandbox.iyzico.com", icon: "fa-flask" },
      { label: "Durum Sayfası", url: "https://status.iyzico.com", icon: "fa-signal" }
    ],
    contact: { email: "sales@iyzico.com", phone: "+90 (212) 900 00 00" },
    comparison: {
      goLive: "2 hafta",
      compliance: ["PCI DSS 4.0", "KVKK", "PSD2"],
      integrations: ["Shopify", "Magento", "WooCommerce", "SAP"],
      minCommitment: "Yok"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "payflex",
    name: "PayFlex",
    logo: "PFX",
    categories: ["pos", "payment-gateway"],
    type: "Sanal POS",
    rating: 4.7,
    reviews: 189,
    featured: true,
    isNew: true,
    badges: ["Yeni Kampanya"],
    cardDescription:
      "Dinamik komisyonlar, abonelik ve çoklu para birimi yönetimiyle omnichannel POS deneyimi.",
    modalSummary:
      "PayFlex, hızla ölçeklenen e-ticaret markaları için çoklu para birimi desteği ve abonelik yönetimini bir arada sunar. Orta ölçekli işletmeler için self-servis onboarding ile 48 saat içinde yayına alınabilir.",
    features: ["Dinamik Komisyon", "Çoklu Para Birimi", "Abonelik Yönetimi", "Fraud AI"],
    differentiators: [
      "48 saat içinde canlıya alma",
      "Otomatik kart güncelleme",
      "Kapsamlı raporlama",
      "PCI Tokenization"
    ],
    pricing: {
      label: "Komisyon:",
      headline: "%2.49 + ₺0.25",
      feeModel: { percentage: 2.49, fixed: 0.25, subscription: 0, currency: "TRY", installment: 0.35 },
      tiers: [
        { label: "₺0 - ₺150K", value: "%2.79 + ₺0.25" },
        { label: "₺150K - ₺500K", value: "%2.49 + ₺0.19" },
        { label: "₺500K+", value: "Özel teklif" }
      ],
      notes: "Abonelik yönetimi modülü ek %0.3 komisyon."
    },
    campaign: { label: "Bonus", text: "İlk 3 ay abonelik modülü ücretsiz", expires: "30 Nisan 2025" },
    metrics: { settlement: "T+1/T+2", support: "Hafta içi 08:00-22:00", uptime: "%99.89", successRate: "%98.8" },
    keywords: ["payflex", "sanal pos", "abonelik", "dinamik fiyat", "çoklu para"],
    addedAt: "2025-01-12",
    resources: [
      { label: "API Referansı", url: "https://developers.payflex.com", icon: "fa-code" },
      { label: "Test Kartları", url: "https://developers.payflex.com/test-cards", icon: "fa-credit-card" }
    ],
    contact: { email: "growth@payflex.com", phone: "+90 (216) 400 10 10" },
    comparison: {
      goLive: "1 hafta",
      compliance: ["PCI DSS 4.0", "KVKK"],
      integrations: ["Shopify", "Wix", "BigCommerce"],
      minCommitment: "₺50K aylık hacim"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "papara-business",
    name: "Papara Business",
    logo: "PPR",
    categories: ["digital-wallet"],
    type: "Dijital Cüzdan",
    rating: 4.9,
    reviews: 412,
    featured: true,
    isNew: false,
    badges: ["En Çok Tercih Edilen"],
    cardDescription:
      "FAST uyumlu dijital cüzdan, toplu ödeme ve kart programı ile ölçeklenebilir kurumsal altyapı.",
    modalSummary:
      "Papara Business, kurumların maaş ve ödeme operasyonlarını dijitalleştirir. FAST, IBAN ve kart programı desteğiyle finans ekiplerine tek panelde kontrol sunar.",
    features: ["FAST Transfer", "Toplu Ödeme", "KYC Yönetimi", "Kart Programı"],
    differentiators: [
      "Anında bakiye tanımlama",
      "Esnek limit yönetimi",
      "Papara kullanıcı havuzu erişimi",
      "Otomatik mutabakat"
    ],
    pricing: {
      label: "Komisyon:",
      headline: "%1.99",
      feeModel: { percentage: 1.99, fixed: 0, subscription: 0, currency: "TRY", installment: 0 },
      tiers: [
        { label: "Standart", value: "%1.99" },
        { label: "Kurumsal", value: "Özel fiyatlandırma" }
      ],
      notes: "Toplu ödeme başına ₺0.75 hizmet bedeli."
    },
    campaign: null,
    metrics: { settlement: "Anlık", support: "7/24 Canlı Destek", uptime: "%99.97", successRate: "%99.5" },
    keywords: ["papara", "dijital cüzdan", "toplu ödeme", "wallet"],
    addedAt: "2024-08-04",
    resources: [
      { label: "Developer Portal", url: "https://developer.papara.com", icon: "fa-code" },
      { label: "Kart Programı", url: "https://papara.com/business/cards", icon: "fa-id-card" }
    ],
    contact: { email: "enterprise@papara.com", phone: "+90 (212) 900 50 00" },
    comparison: {
      goLive: "3 hafta",
      compliance: ["PCI DSS 4.0", "KVKK"],
      integrations: ["SAP", "Oracle", "Logo"],
      minCommitment: "₺100K aylık bakiye"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "apiconnect",
    name: "APIConnect",
    logo: "API",
    categories: ["open-banking"],
    type: "Açık Bankacılık",
    rating: 4.6,
    reviews: 148,
    featured: false,
    isNew: false,
    badges: ["PSD2 Uyumlu"],
    cardDescription:
      "PSD2 uyumlu hesap bilgisi, ödeme başlatma ve kimlik doğrulama hizmetlerini tek API ile sunar.",
    modalSummary:
      "APIConnect, bankalararası API çağrılarını konsolide eder. Finansal kurumların PSD2 ve açık bankacılık gerekliliklerini tek SDK ile karşılamasını sağlar.",
    features: ["PSD2 Uyumlu", "Hesap Doğrulama", "Ödeme Başlatma", "Sandbox"],
    differentiators: [
      "Avrupa bankalarıyla 60+ bağlantı",
      "Dinamik SCA",
      "Webhooks ile olay akışı",
      "İleri düzey loglama"
    ],
    pricing: {
      label: "Aylık:",
      headline: "₺1.490",
      feeModel: { percentage: 0, fixed: 0, subscription: 1490, currency: "TRY", installment: 0 },
      tiers: [
        { label: "Starter", value: "₺1.490 / ay" },
        { label: "Scale", value: "₺3.900 / ay" },
        { label: "Enterprise", value: "Teklif Alın" }
      ],
      notes: "İşlem bazlı ücretlendirme çağrı başına ₺0.12'den başlar."
    },
    campaign: null,
    metrics: { settlement: "Gerçek zamanlı", support: "Hafta içi 09:00-21:00", uptime: "%99.91", successRate: "%98.2" },
    keywords: ["open banking", "api", "hesap bilgisi", "ödeme başlatma"],
    addedAt: "2023-12-10",
    resources: [
      { label: "SDK", url: "https://developers.apiconnect.com/sdk", icon: "fa-puzzle-piece" },
      { label: "Uyumluluk Rehberi", url: "https://developers.apiconnect.com/compliance", icon: "fa-shield-alt" }
    ],
    contact: { email: "hello@apiconnect.com", phone: "+90 (850) 390 00 11" },
    comparison: {
      goLive: "4 hafta",
      compliance: ["PSD2", "KVKK"],
      integrations: ["Core banking", "ERP"],
      minCommitment: "₺1.490 / ay"
    },
    supportsCommissionCalculator: false
  },
  {
    id: "bulut-tahsilat",
    name: "Bulut Tahsilat",
    logo: "BLT",
    categories: ["cloud-collection"],
    type: "Bulut Tahsilat",
    rating: 4.5,
    reviews: 133,
    featured: false,
    isNew: false,
    badges: ["Kurumsal Tercih"],
    cardDescription:
      "Kurumsal tahsilat süreçleri için FAST destekli, ERP entegrasyonlu bulut tahsilat platformu.",
    modalSummary:
      "Bulut Tahsilat, bayi ve abonelik modellerinde tahsilatı otomatikleştiren bulut altyapısı sunar. Çoklu banka entegrasyonları ve FAST ile gecikmeleri minimize eder.",
    features: ["FAST Entegrasyonu", "Tahsilat Otomasyonu", "ERP Bağlantısı", "Detaylı Raporlama"],
    differentiators: [
      "Logo/Nebim entegrasyonu",
      "Linkle tahsilat",
      "Otomatik hatırlatma",
      "Çoklu para birimi"
    ],
    pricing: {
      label: "Başlangıç:",
      headline: "₺990/ay",
      feeModel: { percentage: 0.85, fixed: 0.19, subscription: 990, currency: "TRY", installment: 0.2 },
      tiers: [
        { label: "Pro", value: "₺990 / ay" },
        { label: "Enterprise", value: "₺2.450 / ay" }
      ],
      notes: "Tahsilat başına %0.85 + ₺0.19, FAST işlemleri için ek %0.2."
    },
    campaign: { label: "Yeni Özellik", text: "FAST tahsilat modülü dahil", expires: "30 Haziran 2025" },
    metrics: { settlement: "T+0/T+1", support: "Hafta içi 08:00-20:00", uptime: "%99.83", successRate: "%98.9" },
    keywords: ["tahsilat", "fast", "erp", "abonelik"],
    addedAt: "2024-05-20",
    resources: [
      { label: "ERP Eklentileri", url: "https://buluttahsilat.com/integrations", icon: "fa-plug" },
      { label: "Başlangıç Kılavuzu", url: "https://buluttahsilat.com/getting-started", icon: "fa-rocket" }
    ],
    contact: { email: "destek@buluttahsilat.com", phone: "+90 (212) 555 33 44" },
    comparison: {
      goLive: "3 hafta",
      compliance: ["KVKK", "ISO 27001"],
      integrations: ["Logo", "Nebim", "SAP"],
      minCommitment: "12 ay sözleşme"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "ledgerly",
    name: "Ledgerly",
    logo: "LDG",
    categories: ["financial-management"],
    type: "Finansal Yönetim",
    rating: 4.4,
    reviews: 96,
    featured: false,
    isNew: true,
    badges: ["AI Destekli"],
    cardDescription:
      "Otomatik mutabakat, IFRS raporlama ve AI tahminleriyle finans ekiplerine tek panel sunar.",
    modalSummary:
      "Ledgerly, büyüyen işletmelerin nakit akışı tahminini ve IFRS raporlamasını otomatikleştirir. ERP entegrasyonlarıyla gerçek zamanlı finansal görünürlük sağlar.",
    features: ["IFRS Raporlama", "Otomatik Mutabakat", "Rol Bazlı Erişim", "Tahminleme AI"],
    differentiators: [
      "Gerçek zamanlı dashboard",
      "Audit log",
      "Ön tanımlı rapor şablonları",
      "Bankadan veri çekme"
    ],
    pricing: {
      label: "Aylık:",
      headline: "₺1.990/ay",
      feeModel: { percentage: 0, fixed: 0, subscription: 1990, currency: "TRY", installment: 0 },
      tiers: [
        { label: "Growth", value: "₺1.990 / ay" },
        { label: "Scale", value: "₺3.490 / ay" }
      ],
      notes: "10 kullanıcı dahildir, ek kullanıcı ₺120/ay."
    },
    campaign: { label: "Deneme", text: "14 gün ücretsiz deneme", expires: "Sürekli" },
    metrics: { settlement: "Gerçek zamanlı", support: "Hafta içi 09:00-18:00", uptime: "%99.74", successRate: "%97.6" },
    keywords: ["finans", "raporlama", "mutabakat", "forecast"],
    addedAt: "2025-02-05",
    resources: [
      { label: "Demo Dashboard", url: "https://ledgerly.com/demo", icon: "fa-chart-line" },
      { label: "API", url: "https://ledgerly.com/api", icon: "fa-code" }
    ],
    contact: { email: "hello@ledgerly.com", phone: "+90 (850) 390 22 33" },
    comparison: {
      goLive: "2 hafta",
      compliance: ["KVKK", "ISO 27001"],
      integrations: ["SAP", "Netsis", "Logo"],
      minCommitment: "Yıllık sözleşme"
    },
    supportsCommissionCalculator: false
  },
  {
    id: "bnpl-max",
    name: "BNPL Max",
    logo: "BNP",
    categories: ["bnpl"],
    type: "BNPL",
    rating: 4.5,
    reviews: 121,
    featured: false,
    isNew: false,
    badges: ["Risk Skoru 92"],
    cardDescription:
      "Şimdi al sonra öde altyapısı, risk skorlama ve satıcı paneliyle sepet ortalamasını artırır.",
    modalSummary:
      "BNPL Max, yüksek dönüşümlü BNPL deneyimi sunar. Yapay zeka destekli risk skoru ve satıcı paneliyle tahsilat performansını optimize eder.",
    features: ["Risk Skorlama", "Taksit Yönetimi", "Satıcı Paneli", "Raporlama"],
    differentiators: [
      "Gerçek zamanlı skor güncelleme",
      "Limit paylaşımı",
      "Tahsilat takibi",
      "Pazaryeri uyumu"
    ],
    pricing: {
      label: "Komisyon:",
      headline: "%3.49",
      feeModel: { percentage: 3.49, fixed: 0, subscription: 0, currency: "TRY", installment: 0.6 },
      tiers: [
        { label: "Standart", value: "%3.49" },
        { label: "Enterprise", value: "Özel teklif" }
      ],
      notes: "Geciken ödemelerde komisyon %0.6 artar."
    },
    campaign: { label: "Öneri", text: "İlk 1.000 işlemde %2.99 komisyon", expires: "31 Mayıs 2025" },
    metrics: { settlement: "T+14", support: "Hafta içi 09:00-21:00", uptime: "%99.65", successRate: "%94.3" },
    keywords: ["bnpl", "taksit", "risk", "şimdi al sonra öde"],
    addedAt: "2024-03-18",
    resources: [
      { label: "Risk API", url: "https://developers.bnplmax.com/risk", icon: "fa-brain" },
      { label: "Satıcı Paneli", url: "https://vendors.bnplmax.com", icon: "fa-store" }
    ],
    contact: { email: "sales@bnplmax.com", phone: "+90 (212) 777 44 55" },
    comparison: {
      goLive: "5 hafta",
      compliance: ["KVKK", "MASAK"],
      integrations: ["Shopify", "PrestaShop"],
      minCommitment: "₺300K aylık hacim"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "neo-sigorta",
    name: "NeoSigorta",
    logo: "NEO",
    categories: ["insurtech"],
    type: "Sigorta Teknolojisi",
    rating: 4.3,
    reviews: 88,
    featured: false,
    isNew: false,
    badges: ["API Öncelikli"],
    cardDescription:
      "Gerçek zamanlı teklif üretimi ve otomatik yenileme ile poliçe satışlarını dijitalleştirir.",
    modalSummary:
      "NeoSigorta, sigorta acenteleri ve bankasurans için API tabanlı poliçe satışı sağlar. Gerçek zamanlı fiyatlama ve otomatik yenileme ile müşteri memnuniyetini artırır.",
    features: ["Gerçek Zamanlı Teklif", "Otomatik Yenileme", "Acente Paneli", "Mobil SDK"],
    differentiators: [
      "Anında risk değerlendirme",
      "Sözleşme otomasyonu",
      "Çok kanallı dağıtım",
      "Sigorta veri hub"
    ],
    pricing: {
      label: "Komisyon:",
      headline: "%4.2",
      feeModel: { percentage: 4.2, fixed: 0, subscription: 0, currency: "TRY", installment: 0 },
      tiers: [
        { label: "Standart", value: "%4.2" },
        { label: "Kurumsal", value: "%3.6 + hacim primi" }
      ],
      notes: "Prim tutarına göre değişen başarı primi uygulanır."
    },
    campaign: null,
    metrics: { settlement: "T+7", support: "Hafta içi 09:00-19:00", uptime: "%99.72", successRate: "%95.1" },
    keywords: ["sigorta", "insurtech", "poliçe", "yenileme"],
    addedAt: "2023-09-01",
    resources: [
      { label: "API Dokümanı", url: "https://developers.neosigorta.com", icon: "fa-book" },
      { label: "Mobil SDK", url: "https://developers.neosigorta.com/mobile", icon: "fa-mobile-screen" }
    ],
    contact: { email: "partner@neosigorta.com", phone: "+90 (212) 680 88 00" },
    comparison: {
      goLive: "6 hafta",
      compliance: ["KVKK", "Sigorta Denetleme Kurumu"],
      integrations: ["CRM", "Bankacılık API"],
      minCommitment: "Hacim bazlı prim"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "riskvision",
    name: "RiskVision AI",
    logo: "RV",
    categories: ["ai-risk"],
    type: "Yapay Zeka Risk",
    rating: 4.6,
    reviews: 142,
    featured: false,
    isNew: true,
    badges: ["AML+Fraud"],
    cardDescription:
      "Yapay zeka tabanlı fraud tespiti, AML kontrolleri ve gerçek zamanlı uyarı motoru.",
    modalSummary:
      "RiskVision AI, AML ve fraud süreçlerini tek panelde otomatikleştirir. Davranışsal analiz ve makine öğrenmesi modelleriyle riskli işlemleri anında işaretler.",
    features: ["AML Kontrolleri", "Gerçek Zamanlı Skorlama", "Yapay Zeka Modelleri", "Anomali Tespiti"],
    differentiators: [
      "Davranışsal biometrik analiz",
      "Model açıklanabilirliği",
      "Kara liste entegrasyonu",
      "Olay yönetim iş akışları"
    ],
    pricing: {
      label: "Başlangıç:",
      headline: "₺4.990/ay",
      feeModel: { percentage: 0.65, fixed: 0.15, subscription: 4990, currency: "TRY", installment: 0 },
      tiers: [
        { label: "Growth", value: "₺4.990 / ay" },
        { label: "Scale", value: "₺7.900 / ay" }
      ],
      notes: "İşlem başına %0.65 + ₺0.15 ücretlendirme uygulanır."
    },
    campaign: { label: "Pilot", text: "3 aylık pilotta %25 indirim", expires: "15 Haziran 2025" },
    metrics: { settlement: "Gerçek zamanlı", support: "7/24 SLA", uptime: "%99.9", successRate: "%97.4" },
    keywords: ["risk", "fraud", "aml", "yapay zeka"],
    addedAt: "2025-02-20",
    resources: [
      { label: "Model Kartları", url: "https://riskvision.ai/model-cards", icon: "fa-diagram-project" },
      { label: "Uyum Rehberi", url: "https://riskvision.ai/compliance", icon: "fa-scale-balanced" }
    ],
    contact: { email: "hello@riskvision.ai", phone: "+90 (216) 330 20 20" },
    comparison: {
      goLive: "4 hafta",
      compliance: ["MASAK", "FATF"],
      integrations: ["Core banking", "Kart izleme"],
      minCommitment: "₺4.990 / ay"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "garanti-bbva",
    name: "Garanti BBVA Ödeme Sistemleri",
    logo: "GAR",
    categories: ["bank", "pos", "open-banking"],
    type: "Banka Ödeme Çözümleri",
    rating: 4.7,
    reviews: 298,
    featured: true,
    isNew: false,
    badges: ["Kurumsal"],
    cardDescription:
      "Bankacılık destekli sanal POS, tahsilat yönetimi ve API altyapısı ile yüksek hacimli işletmelere güvenli çözümler sunar.",
    modalSummary:
      "Garanti BBVA, perakende ve abonelik modelleri için ölçeklenebilir POS ve tahsilat altyapısı sağlar. Çok kanallı ödeme, Açık Bankacılık API'leri ve kurumsal destek ekibiyle işletmelerin nakit akışını optimize eder.",
    features: ["Dinamik POS", "Tahsilat API", "Açık Bankacılık", "Kur Risk Yönetimi"],
    differentiators: [
      "Kurumsal seviye SLA",
      "Yerinde uyumluluk desteği",
      "EMEA çapında kart kabulü",
      "ERP entegrasyon kitleri"
    ],
    pricing: {
      label: "POS Komisyonu:",
      headline: "%2.39 + ₺0.19",
      feeModel: { percentage: 2.39, fixed: 0.19, subscription: 0, currency: "TRY", installment: 0.4 },
      tiers: [
        { label: "₺0 - ₺1M", value: "%2.59 + ₺0.19" },
        { label: "₺1M - ₺3M", value: "%2.39 + ₺0.15" },
        { label: "₺3M+", value: "Özel fiyatlandırma" }
      ],
      notes: "Kur garantili tahsilat ve döviz hesaplaması opsiyoneldir."
    },
    campaign: { label: "Teşvik", text: "Yeni Açık Bankacılık API'lerinde ilk 6 ay ücretsiz", expires: "30 Haziran 2025" },
    metrics: { settlement: "T+1/T+2", support: "Özel müşteri temsilcisi", uptime: "%99.98", successRate: "%99.1" },
    keywords: ["garanti", "banka pos", "açık bankacılık", "tahsilat"],
    addedAt: "2024-06-10",
    resources: [
      { label: "API Portal", url: "https://developers.garantibbva.com.tr", icon: "fa-code" },
      { label: "POS Başvuru", url: "https://www.garantibbva.com.tr/isletme/sanal-pos", icon: "fa-file-signature" }
    ],
    contact: { email: "fintech@garantibbva.com.tr", phone: "+90 (212) 318 18 18" },
    comparison: {
      goLive: "4 hafta",
      compliance: ["PCI DSS 4.0", "KVKK", "PSD2"],
      integrations: ["SAP", "Oracle", "Microsoft Dynamics"],
      minCommitment: "₺250K aylık hacim"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "akbank",
    name: "Akbank Axess POS & API",
    logo: "AKB",
    categories: ["bank", "pos"],
    type: "Banka POS",
    rating: 4.6,
    reviews: 254,
    featured: true,
    isNew: false,
    badges: ["Axess"],
    cardDescription:
      "E-ticaret ve fiziki POS kanallarını tek panelde yöneten, kampanya yönetimi ve taksitli satış desteği sağlayan banka çözümü.",
    modalSummary:
      "Akbank Axess POS, çok kanallı kampanya kurguları ve taksitli satış seçenekleriyle büyüyen KOBİ'lere odaklanır. Yenilenmiş panel üzerinden gerçek zamanlı raporlama ve iade yönetimi sunar.",
    features: ["Omnichannel POS", "Kampanya Motoru", "Gelişmiş Raporlama", "İade Otomasyonu"],
    differentiators: [
      "Axess üye işyeri kampanyaları",
      "Anlık limit kontrolü",
      "Kasa ve muhasebe entegrasyonları",
      "Taksit optimizasyonu"
    ],
    pricing: {
      label: "POS Komisyonu:",
      headline: "%2.49 + ₺0.25",
      feeModel: { percentage: 2.49, fixed: 0.25, subscription: 0, currency: "TRY", installment: 0.35 },
      tiers: [
        { label: "₺0 - ₺500K", value: "%2.79 + ₺0.29" },
        { label: "₺500K - ₺1.5M", value: "%2.49 + ₺0.25" },
        { label: "₺1.5M+", value: "Özel teklif" }
      ],
      notes: "Taksit başına ek %0.35 maliyet uygulanır."
    },
    campaign: { label: "Kampanya", text: "Axess üye işyerlerine 12 aya kadar faizsiz taksit", expires: "31 Temmuz 2025" },
    metrics: { settlement: "T+1", support: "7/24 Çağrı Merkezi", uptime: "%99.94", successRate: "%98.9" },
    keywords: ["akbank", "axess", "pos", "kampanya"],
    addedAt: "2024-03-18",
    resources: [
      { label: "POS Başvuru", url: "https://www.akbank.com/tr-tr/isletme/sanal-pos", icon: "fa-credit-card" },
      { label: "Teknik Döküman", url: "https://developer.akbank.com", icon: "fa-book" }
    ],
    contact: { email: "pos@akbank.com", phone: "+90 (212) 385 77 77" },
    comparison: {
      goLive: "3 hafta",
      compliance: ["PCI DSS 4.0", "KVKK"],
      integrations: ["Logo", "Paraşüt", "Mikro"],
      minCommitment: "₺150K aylık hacim"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "isbankasi",
    name: "Türkiye İş Bankası MaxiPOS",
    logo: "ISB",
    categories: ["bank", "cloud-collection"],
    type: "Tahsilat & POS",
    rating: 4.5,
    reviews: 221,
    featured: false,
    isNew: false,
    badges: ["MaxiPOS"],
    cardDescription:
      "MaxiPOS paneliyle dijital tahsilat, linkle ödeme ve kurumsal raporlama çözümleri sunan banka altyapısı.",
    modalSummary:
      "Türkiye İş Bankası MaxiPOS, saha satış ekipleri ve B2B tahsilatlar için linkle ödeme, abonelik tahsilatı ve raporlama hizmetlerini tek platformda sunar. KVKK uyumlu veri saklama özellikleri bulunur.",
    features: ["Linkle Ödeme", "Abonelik Tahsilatı", "Kurumsal Raporlama", "Yetki Yönetimi"],
    differentiators: [
      "MaxiPOS mobil uygulaması",
      "Kur bazlı raporlama",
      "Yetki ve rol tabanlı erişim",
      "Banka teminat desteği"
    ],
    pricing: {
      label: "Tahsilat Ücreti:",
      headline: "%2.29 + ₺0.22",
      feeModel: { percentage: 2.29, fixed: 0.22, subscription: 149, currency: "TRY", installment: 0.28 },
      tiers: [
        { label: "₺0 - ₺300K", value: "%2.49 + ₺0.25" },
        { label: "₺300K - ₺1M", value: "%2.29 + ₺0.22" },
        { label: "₺1M+", value: "Özel fiyat" }
      ],
      notes: "MaxiPOS paneli için aylık ₺149 bakım bedeli alınır."
    },
    campaign: null,
    metrics: { settlement: "T+2", support: "Özel müşteri yöneticisi", uptime: "%99.9", successRate: "%98.4" },
    keywords: ["iş bankası", "maxipos", "tahsilat", "linkle ödeme"],
    addedAt: "2024-05-02",
    resources: [
      { label: "MaxiPOS Bilgi", url: "https://www.isbank.com.tr/sanal-pos", icon: "fa-circle-info" },
      { label: "Başvuru Formu", url: "https://www.isbank.com.tr/isletme/basvuru", icon: "fa-file-lines" }
    ],
    contact: { email: "maxipos@isbank.com.tr", phone: "+90 (850) 724 72 47" },
    comparison: {
      goLive: "5 hafta",
      compliance: ["PCI DSS 4.0", "KVKK"],
      integrations: ["Logo", "Nebim", "Workcube"],
      minCommitment: "₺200K aylık hacim"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "yapi-kredi",
    name: "Yapı Kredi Ödeme Kurulumu",
    logo: "YKB",
    categories: ["bank", "payment-gateway"],
    type: "Banka Ödeme Geçidi",
    rating: 4.6,
    reviews: 245,
    featured: false,
    isNew: true,
    badges: ["World"],
    cardDescription:
      "Worldcard uyumlu taksit kampanyaları, tokenizasyon ve çoklu para birimi desteği sunan banka geçidi.",
    modalSummary:
      "Yapı Kredi Ödeme Kurulumu, World üye işyerlerine özel kampanyalar ve çoklu para birimi desteği sağlar. Tokenizasyon ile PCI yükünü azaltır ve abonelik işlemlerini kolaylaştırır.",
    features: ["Tokenizasyon", "World Kampanyaları", "Çoklu Para Birimi", "Abonelik API"],
    differentiators: [
      "World ekosistemi kampanyaları",
      "Dövizli tahsilat",
      "3D Secure 2.2 geçiş paketi",
      "PCI danışmanlığı"
    ],
    pricing: {
      label: "Komisyon:",
      headline: "%2.45 + ₺0.18",
      feeModel: { percentage: 2.45, fixed: 0.18, subscription: 0, currency: "TRY", installment: 0.38 },
      tiers: [
        { label: "₺0 - ₺400K", value: "%2.65 + ₺0.20" },
        { label: "₺400K - ₺1.2M", value: "%2.45 + ₺0.18" },
        { label: "₺1.2M+", value: "Özel anlaşma" }
      ],
      notes: "Dövizli tahsilat için ek %0.25 spread uygulanır."
    },
    campaign: { label: "World", text: "Yeni üye işyerlerine ilk 3 ay taksit farkı yok", expires: "31 Ağustos 2025" },
    metrics: { settlement: "T+1", support: "7/24 World Posline", uptime: "%99.92", successRate: "%98.7" },
    keywords: ["yapı kredi", "world", "tokenizasyon", "döviz"],
    addedAt: "2025-01-28",
    resources: [
      { label: "World POS", url: "https://www.yapikredi.com.tr/isletme/world-pos", icon: "fa-store" },
      { label: "Developer Portal", url: "https://developer.yapikredi.com.tr", icon: "fa-code" }
    ],
    contact: { email: "worldpos@yapikredi.com.tr", phone: "+90 (212) 339 70 00" },
    comparison: {
      goLive: "4 hafta",
      compliance: ["PCI DSS 4.0", "KVKK"],
      integrations: ["Magento", "WooCommerce", "Shopify"],
      minCommitment: "₺180K aylık hacim"
    },
    supportsCommissionCalculator: true
  },
  {
    id: "qnb-finansbank",
    name: "QNB Finansbank Enpara İş",
    logo: "QNB",
    categories: ["bank", "open-banking"],
    type: "Açık Bankacılık & POS",
    rating: 4.4,
    reviews: 187,
    featured: false,
    isNew: true,
    badges: ["Enpara İş"],
    cardDescription:
      "API tabanlı hesap bilgisi, ödeme başlatma ve uygun maliyetli POS çözümlerini tek platformda sunar.",
    modalSummary:
      "QNB Finansbank Enpara İş, dijital KOBİ'lere yönelik açık bankacılık API'leri ve uygun maliyetli POS çözümleri sunar. Self-servis paneli sayesinde hızlı başvuru ve entegrasyon imkânı sağlar.",
    features: ["Ödeme Başlatma", "Hesap Bilgisi API", "Hızlı Başvuru", "Finansal Analitik"],
    differentiators: [
      "Enpara düşük maliyetli fiyatlama",
      "Tamamen dijital onboarding",
      "Finansal analitik paneller",
      "PSD2 uyumlu API yönetimi"
    ],
    pricing: {
      label: "POS Komisyonu:",
      headline: "%2.19 + ₺0.21",
      feeModel: { percentage: 2.19, fixed: 0.21, subscription: 0, currency: "TRY", installment: 0.32 },
      tiers: [
        { label: "₺0 - ₺250K", value: "%2.39 + ₺0.23" },
        { label: "₺250K - ₺800K", value: "%2.19 + ₺0.21" },
        { label: "₺800K+", value: "Özel fiyat" }
      ],
      notes: "API kullanımında aylık 1.000 ücretsiz çağrı, sonrasında çağrı başına ₺0.05."
    },
    campaign: { label: "Dijital", text: "Enpara İş müşterilerine POS kurulumu ücretsiz", expires: "31 Aralık 2025" },
    metrics: { settlement: "T+1", support: "Dijital destek ekibi", uptime: "%99.9", successRate: "%98.1" },
    keywords: ["qnb", "enpara", "açık bankacılık", "kobi"],
    addedAt: "2024-11-30",
    resources: [
      { label: "Enpara İş", url: "https://www.qnbfinansbank.enpara.com/isletme", icon: "fa-rocket" },
      { label: "API Belgeleri", url: "https://developer.qnbfinansbank.com", icon: "fa-diagram-project" }
    ],
    contact: { email: "fintech@qnbfinansbank.com", phone: "+90 (850) 222 3663" },
    comparison: {
      goLive: "3 hafta",
      compliance: ["PCI DSS 4.0", "KVKK", "PSD2"],
      integrations: ["Paraşüt", "Netsis", "Unity"],
      minCommitment: "₺120K aylık hacim"
    },
    supportsCommissionCalculator: true
  }
];

const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/info@fintechhubturkiye.com";
const NEWSLETTER_ENDPOINT = "https://formsubmit.co/ajax/newsletter@fintechhubturkiye.com";
const DEMO_ENDPOINT = "https://formsubmit.co/ajax/demo@fintechhubturkiye.com";
const FOCUSABLE_SELECTOR = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
const DEFAULT_AUTH_USERS = [
  {
    name: "Demo Kullanıcısı",
    company: "Fintech Hub Türkiye",
    email: "demo@fintechhubturkiye.com",
    password: "Fintech!2025"
  },
  {
    name: "Selin Kaya",
    company: "Growth Lab",
    email: "selin.kaya@fintechhubturkiye.com",
    password: "Growth2025!"
  }
];
const AUTH_STORAGE_KEYS = {
  USERS: "fintechhub_auth_users_v1",
  SESSION: "fintechhub_auth_session_v1",
  PERSIST: "fintechhub_auth_persist_v1"
};

const MARKET_DATA_URL = "/api/fetch-rates";
const MARKET_DATA_FALLBACK = "/data/market-rates.json";
const DEFAULT_MARKET_DATA = {
  lastUpdated: "10 Kasım 2025",
  rates: [
    { symbol: "USD/TRY", value: "34,52", change: "+0,38%", direction: "up", icon: "fa-dollar-sign" },
    { symbol: "EUR/TRY", value: "36,74", change: "-0,12%", direction: "down", icon: "fa-euro-sign" },
    { symbol: "GBP/TRY", value: "42,05", change: "+0,21%", direction: "up", icon: "fa-sterling-sign" },
    { symbol: "CHF/TRY", value: "37,42", change: "+0,07%", direction: "up", icon: "fa-money-bill-wave" },
    { symbol: "CNY/TRY", value: "4,72", change: "-0,29%", direction: "down", icon: "fa-yen-sign" },
    { symbol: "GAU/TRY", value: "2.412,00", change: "+0,44%", direction: "up", icon: "fa-coins" }
  ]
};

let marketDataPromise = null;

let activeCategory = "all";
let searchQuery = "";
let sortOption = "featured";
let renderedProviders = [];
let activeModal = null;
let lastFocusedElement = null;
let currentProvider = null;
const modalFocusTrapHandlers = new Map();
let cachedAuthUsers = null;
let cachedSessionUser = null;

document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  initScrollAnimations();
  initSmoothScroll();
  initProviders();
  initSearch();
  initCategoryTabs();
  initSort();
  initModals();
  initForms();
  initBusinessTools();
  initMarketTicker();
  initAuth();
});

function initProviders() {
  const initialCategory = document.body?.dataset?.initialCategory;
  if (initialCategory) {
    activeCategory = initialCategory;
    document.querySelectorAll(".tab-btn").forEach((button) => {
      if (button.getAttribute("data-category") === initialCategory) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }
  renderedProviders = [...providers];
  applyFilters();
}

function applyFilters() {
  const normalizedQuery = normalizeText(searchQuery);
  let filtered = providers.filter((provider) => {
    const matchCategory = activeCategory === "all" || provider.categories.includes(activeCategory);
    if (!matchCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      provider.name,
      provider.type,
      provider.cardDescription,
      ...(provider.features || []),
      ...(provider.differentiators || []),
      ...(provider.keywords || [])
    ]
      .map((item) => normalizeText(item))
      .join(" ");
    return haystack.includes(normalizedQuery);
  });

  filtered = sortProviders(filtered);
  renderedProviders = filtered;
  renderProviders(filtered);
}

function sortProviders(list) {
  const sorted = [...list];
  switch (sortOption) {
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "fee":
      sorted.sort((a, b) => {
        const feeA = (a.pricing?.feeModel?.percentage || 99) + (a.pricing?.feeModel?.fixed || 0);
        const feeB = (b.pricing?.feeModel?.percentage || 99) + (b.pricing?.feeModel?.fixed || 0);
        return feeA - feeB;
      });
      break;
    case "new":
      sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      break;
    default:
      sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }
  return sorted;
}

function renderProviders(list) {
  const grid = document.getElementById("providers-grid");
  const emptyState = document.getElementById("providers-empty-state");
  const countElement = document.getElementById("provider-count");
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = "";
    emptyState?.removeAttribute("hidden");
  } else {
    grid.innerHTML = list.map(createProviderCard).join("\n");
    emptyState?.setAttribute("hidden", "hidden");
  }

  if (countElement) {
    countElement.textContent = `${list.length} sağlayıcı`;
  }

  bindProviderCardEvents();
}

function createProviderCard(provider) {
  const badgeHtml = (provider.badges || [])
    .map((badge) => `<span class="provider-badge">${badge}</span>`)
    .join("");
  const campaignHtml = provider.campaign
    ? `<div class="provider-campaign"><span class="campaign-badge">${provider.campaign.label}</span><span class="campaign-text">${provider.campaign.text}</span></div>`
    : "";
  const features = (provider.features || [])
    .slice(0, 4)
    .map((feature) => `<span class="feature-tag">${feature}</span>`)
    .join("");

  // Get logo URL or use fallback
  const logoUrl = getProviderLogoUrl(provider.id);
  const logoHtml = logoUrl 
    ? `<img src="${logoUrl}" alt="${provider.name} logo" onerror="this.parentElement.innerHTML='<div class=\\'logo-img\\'>${provider.logo}</div>'">`
    : `<div class="logo-img">${provider.logo}</div>`;

  return `
    <article class="provider-card ${provider.featured ? "featured-provider" : ""}" data-category="${provider.categories.join(
      " "
    )}">
      <header class="provider-header">
        <div class="provider-logo" data-provider="${provider.id}">
          ${logoHtml}
        </div>
        <div class="provider-info">
          <h3>${provider.name}</h3>
          <span class="provider-type">${provider.type}</span>
          ${badgeHtml}
        </div>
        <div class="provider-rating">
          <div class="stars">${renderStars(provider.rating)}</div>
          <span>${provider.rating.toFixed(1)}/5</span>
        </div>
      </header>
      <p class="provider-description">${provider.cardDescription}</p>
      <div class="provider-features">${features}</div>
      <div class="provider-pricing">
        <span class="pricing-label">${provider.pricing?.label || "Ücretlendirme:"}</span>
        <span class="pricing-value">${provider.pricing?.headline || "Teklif Alın"}</span>
      </div>
      ${campaignHtml}
      <div class="provider-actions">
        <button class="btn-outline provider-detail-btn" type="button" data-provider="${provider.id}">Detaylı Bilgi</button>
        <button class="btn-primary provider-demo-btn" type="button" data-provider="${provider.id}">Demo Talep Et</button>
      </div>
    </article>
  `;
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  let stars = "";
  for (let i = 0; i < fullStars; i += 1) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i += 1) {
    stars += '<i class="far fa-star"></i>';
  }
  return stars;
}

function bindProviderCardEvents() {
  document.querySelectorAll(".provider-detail-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const providerId = event.currentTarget.getAttribute("data-provider");
      // Navigate to provider detail page
      window.location.href = `/provider/?id=${providerId}`;
    });
  });

  document.querySelectorAll(".provider-demo-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const providerId = event.currentTarget.getAttribute("data-provider");
      openDemoModal(providerId);
    });
  });
}

function initCategoryTabs() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
      const current = event.currentTarget;
      current.classList.add("active");
      activeCategory = current.getAttribute("data-category");
      applyFilters();
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById("provider-search");
  const searchForm = document.getElementById("provider-search-form");
  const suggestions = document.getElementById("search-suggestions");
  if (!searchInput || !searchForm || !suggestions) return;

  searchInput.addEventListener("input", (event) => {
    searchQuery = event.target.value.trim();
    updateSuggestions(searchQuery);
    applyFilters();
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchQuery = searchInput.value.trim();
    updateSuggestions(searchQuery, true);
    applyFilters();
  });

  document.addEventListener("click", (event) => {
    if (!suggestions.contains(event.target) && event.target !== searchInput) {
      suggestions.innerHTML = "";
      suggestions.classList.remove("is-visible");
    }
  });
}

function updateSuggestions(query, forceClose = false) {
  const suggestions = document.getElementById("search-suggestions");
  if (!suggestions) return;
  suggestions.innerHTML = "";
  suggestions.classList.remove("is-visible");
  if (!query || forceClose) {
    return;
  }
  const normalized = normalizeText(query);
  const results = new Set();
  providers.forEach((provider) => {
    if (normalizeText(provider.name).includes(normalized)) {
      results.add(provider.name);
    }
    (provider.features || []).forEach((feature) => {
      if (normalizeText(feature).includes(normalized)) {
        results.add(feature);
      }
    });
    (provider.keywords || []).forEach((keyword) => {
      if (normalizeText(keyword).includes(normalized)) {
        results.add(keyword);
      }
    });
  });
  const topResults = Array.from(results).slice(0, 6);
  if (!topResults.length) return;
  suggestions.innerHTML = topResults
    .map(
      (result) => `
        <button type="button" class="suggestion-item" role="option" data-value="${result}">
          <i class="fas fa-magnifying-glass"></i>${result}
        </button>
      `
    )
    .join("");
  suggestions.classList.add("is-visible");
  suggestions.querySelectorAll(".suggestion-item").forEach((item) => {
    item.addEventListener("click", () => {
      const value = item.getAttribute("data-value");
      const input = document.getElementById("provider-search");
      if (input) {
        input.value = value;
        searchQuery = value;
        applyFilters();
      }
      suggestions.innerHTML = "";
      suggestions.classList.remove("is-visible");
    });
  });
}

function initSort() {
  const sortSelect = document.getElementById("provider-sort-select");
  if (!sortSelect) return;
  sortSelect.addEventListener("change", (event) => {
    sortOption = event.target.value;
    applyFilters();
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initModals() {
  document.querySelectorAll("[data-modal-target]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const targetSelector = event.currentTarget.getAttribute("data-modal-target");
      const providerId = event.currentTarget.getAttribute("data-provider");
      if (targetSelector === "#provider-modal" && providerId) {
        openProviderModal(providerId);
        return;
      }
      if (targetSelector === "#demo-modal" && providerId) {
        openDemoModal(providerId);
        return;
      }
      if (targetSelector) {
        const modal = document.querySelector(targetSelector);
        if (modal) {
          openModal(modal);
        }
      }
    });
  });

  document.querySelectorAll("[data-modal-dismiss]").forEach((element) => {
    element.addEventListener("click", () => {
      if (activeModal) {
        closeModal(activeModal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeModal) {
      closeModal(activeModal);
    }
  });
}

function openModal(modal) {
  lastFocusedElement = document.activeElement;
  activeModal = modal;
  modal.classList.add("is-active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const focusableElements = getFocusableElements(modal);
  const modalContainer = modal.querySelector(".modal-container");
  const focusTarget = focusableElements[0] || modalContainer || modal;
  if (focusTarget) {
    focusTarget.focus();
  }
  const trapHandler = (event) => {
    if (event.key !== "Tab") return;
    const elements = getFocusableElements(modal);
    if (!elements.length) {
      event.preventDefault();
      if (modalContainer) {
        modalContainer.focus();
      }
      return;
    }
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };
  modal.addEventListener("keydown", trapHandler);
  modalFocusTrapHandlers.set(modal, trapHandler);
}

function closeModal(modal) {
  modal.classList.remove("is-active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeModal = null;
  const trapHandler = modalFocusTrapHandlers.get(modal);
  if (trapHandler) {
    modal.removeEventListener("keydown", trapHandler);
    modalFocusTrapHandlers.delete(modal);
  }
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function getFocusableElements(modal) {
  return Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    const isDisabled = element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
    const isHidden = element.getAttribute("aria-hidden") === "true" || element.classList.contains("is-hidden");
    const styles = window.getComputedStyle(element);
    const isDisplayNone = styles.display === "none";
    const isVisibilityHidden = styles.visibility === "hidden";
    return !isDisabled && !isHidden && !isDisplayNone && !isVisibilityHidden;
  });
}

function openProviderModal(providerId) {
  const provider = providers.find((item) => item.id === providerId);
  if (!provider) return;
  currentProvider = provider;
  populateProviderModal(provider);
  const modal = document.getElementById("provider-modal");
  if (modal) {
    openModal(modal);
  }
}

function populateProviderModal(provider) {
  const logo = document.getElementById("provider-modal-logo");
  const title = document.getElementById("provider-modal-title");
  const type = document.getElementById("provider-modal-type");
  const summary = document.getElementById("provider-modal-summary");
  const rating = document.getElementById("provider-modal-rating");
  const settlement = document.getElementById("provider-modal-settlement");
  const support = document.getElementById("provider-modal-support");
  const features = document.getElementById("provider-modal-features");
  const differentiators = document.getElementById("provider-modal-differentiators");
  const pricing = document.getElementById("provider-modal-pricing");
  const resources = document.getElementById("provider-modal-resources");
  const demoButton = document.getElementById("provider-modal-demo-btn");
  const contactLink = document.getElementById("provider-modal-contact-link");

  if (logo) {
    const logoUrl = getProviderLogoUrl(provider.id);
    if (logoUrl) {
      logo.innerHTML = `<img src="${logoUrl}" alt="${provider.name} logo" style="width: 100%; height: 100%; object-fit: contain; padding: 4px;" onerror="this.parentElement.textContent='${provider.logo}'">`;
      logo.style.background = '#fff';
    } else {
      logo.textContent = provider.logo;
    }
  }
  if (title) title.textContent = provider.name;
  if (type) type.textContent = provider.type;
  if (summary) summary.textContent = provider.modalSummary || provider.cardDescription;
  if (rating) rating.textContent = `${provider.rating.toFixed(1)} / 5 (${provider.reviews}+ değerlendirme)`;
  if (settlement) settlement.textContent = provider.metrics?.settlement || "T+3";
  if (support) support.textContent = provider.metrics?.support || "Destek bilgisi";

  if (features) {
    features.innerHTML = (provider.features || [])
      .map((item) => `<li><i class="fas fa-check-circle"></i>${item}</li>`)
      .join("");
  }

  if (differentiators) {
    differentiators.innerHTML = (provider.differentiators || [])
      .map((item) => `<li><i class="fas fa-star"></i>${item}</li>`)
      .join("");
  }

  if (pricing) {
    const tiers = (provider.pricing?.tiers || [])
      .map(
        (tier) => `
          <div class="pricing-tier">
            <span class="tier-label">${tier.label}</span>
            <span class="tier-value">${tier.value}</span>
          </div>
        `
      )
      .join("");
    const notes = provider.pricing?.notes ? `<p class="pricing-note">${provider.pricing.notes}</p>` : "";
    pricing.innerHTML = tiers + notes;
  }

  if (resources) {
    resources.innerHTML = (provider.resources || [])
      .map(
        (resource) => `
          <li>
            <a href="${resource.url}" target="_blank" rel="noopener">
              <i class="fas ${resource.icon || "fa-arrow-up-right-from-square"}"></i>
              ${resource.label}
            </a>
          </li>
        `
      )
      .join("");
  }

  if (demoButton) {
    demoButton.onclick = () => openDemoModal(provider.id);
  }

  if (contactLink) {
    if (provider.contact?.email) {
      contactLink.href = `mailto:${provider.contact.email}`;
    } else {
      contactLink.href = "#contact";
    }
  }
}

function openDemoModal(providerId) {
  const provider = providers.find((item) => item.id === providerId) || currentProvider;
  if (!provider) return;
  currentProvider = provider;
  const modal = document.getElementById("demo-modal");
  const providerLabel = document.getElementById("demo-modal-provider");
  const providerInput = document.getElementById("demo-provider-input");
  const status = document.getElementById("demo-form-status");
  if (providerLabel) providerLabel.textContent = `${provider.name} ile görüşme planlayın`;
  if (providerInput) providerInput.value = provider.name;
  if (status) {
    status.textContent = "";
    status.classList.remove("success", "error");
  }
  if (modal) {
    openModal(modal);
  }
}

function initForms() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(contactForm, {
        endpoint: CONTACT_ENDPOINT,
        successMessage: "Mesajınız bize ulaştı. 1 iş günü içinde dönüş yapacağız.",
        errorMessage: "Mesaj gönderilirken sorun oluştu. Lütfen daha sonra tekrar deneyin."
      });
    });
  }

  const contactGeneralForm = document.getElementById("contact-general-form");
  if (contactGeneralForm) {
    contactGeneralForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(contactGeneralForm, {
        endpoint: CONTACT_ENDPOINT,
        successMessage: "Destek talebiniz kaydedildi. Kısa süre içinde dönüş yapacağız.",
        errorMessage: "Destek talebi gönderilirken hata oluştu. Lütfen tekrar deneyin."
      });
    });
  }

  const contactPartnerForm = document.getElementById("contact-partner-form");
  if (contactPartnerForm) {
    contactPartnerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(contactPartnerForm, {
        endpoint: CONTACT_ENDPOINT,
        successMessage: "İş ortaklığı talebiniz alındı. 24 saat içinde partner ekibimiz dönüş yapacak.",
        errorMessage: "Talebiniz iletilemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyin."
      });
    });
  }

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(newsletterForm, {
        endpoint: NEWSLETTER_ENDPOINT,
        successMessage: "Bülten kaydınız alındı. Hoş geldiniz!",
        errorMessage: "Abonelik sırasında bir sorun oluştu. Lütfen tekrar deneyin."
      });
    });
  }

  const aboutContactForm = document.getElementById("about-contact-form");
  if (aboutContactForm) {
    aboutContactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(aboutContactForm, {
        endpoint: CONTACT_ENDPOINT,
        successMessage: "Ekibimiz 1 iş günü içinde sizinle iletişime geçecek.",
        errorMessage: "Form gönderilirken hata oluştu. Lütfen daha sonra tekrar deneyin."
      });
    });
  }

  const demoForm = document.getElementById("demo-request-form");
  if (demoForm) {
    demoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(demoForm, {
        endpoint: DEMO_ENDPOINT,
        successMessage: "Demo talebiniz kaydedildi. Ekiplerimiz kısa sürede iletişime geçecek.",
        errorMessage: "Demo talebi gönderilemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyin."
      });
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleLogin(loginForm);
    });
  }

  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleSignup(signupForm);
    });
  }
}

async function submitForm(form, { endpoint, successMessage, errorMessage }) {
  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector("button[type='submit']");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const formData = new FormData(form);
  formData.append("_captcha", "false");
  try {
    form.classList.add("is-loading");
    if (submitButton) submitButton.disabled = true;
    if (status) {
      status.textContent = "Gönderiliyor...";
      status.classList.remove("error", "success");
    }
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error("Form submission failed");
    }
    if (status) {
      status.textContent = successMessage;
      status.classList.add("success");
      status.classList.remove("error");
    }
    form.reset();
  } catch (error) {
    if (status) {
      status.textContent = errorMessage;
      status.classList.add("error");
      status.classList.remove("success");
    }
  } finally {
    form.classList.remove("is-loading");
    if (submitButton) submitButton.disabled = false;
  }
}

function initAuth() {
  updateAuthState();

  const logoutButton = document.getElementById("account-logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      handleLogout();
    });
  }

  const forgotPasswordButton = document.getElementById("forgot-password-btn");
  if (forgotPasswordButton) {
    forgotPasswordButton.addEventListener("click", () => {
      const status = document.getElementById("login-form-status");
      if (status) {
        status.textContent =
          "Demo hesabı için şifre: Fintech!2025. Özel hesaplar için destek@fintechhubturkiye.com üzerinden ulaşabilirsiniz.";
        status.classList.remove("success", "error");
      }
    });
  }

  document.querySelectorAll("[data-account-open-modal]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSelector = button.getAttribute("data-account-open-modal");
      const accountModal = document.getElementById("account-modal");
      if (accountModal) {
        closeModal(accountModal);
      }
      if (!targetSelector) return;
      const targetModal = document.querySelector(targetSelector);
      if (targetModal) {
        openModal(targetModal);
      }
    });
  });
}

function getStoredUsers() {
  if (cachedAuthUsers) return cachedAuthUsers;
  const baseUsers = DEFAULT_AUTH_USERS.map((user) => ({ ...user }));
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEYS.USERS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        parsed.forEach((user) => {
          if (!user || !user.email) return;
          const existingIndex = baseUsers.findIndex(
            (item) => item.email && item.email.toLowerCase() === user.email.toLowerCase()
          );
          if (existingIndex >= 0) {
            baseUsers[existingIndex] = { ...baseUsers[existingIndex], ...user };
          } else {
            baseUsers.push(user);
          }
        });
      }
    }
  } catch (error) {
    // Depolama okumasında sorun olursa varsayılan kullanıcılar kullanılmaya devam eder.
  }
  cachedAuthUsers = baseUsers;
  return cachedAuthUsers;
}

function saveAuthUsers(users) {
  cachedAuthUsers = users;
  try {
    localStorage.setItem(AUTH_STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (error) {
    // Depolama erişimi başarısız olursa hatayı sessizce yok say.
  }
}

function getActiveUser() {
  if (cachedSessionUser) return cachedSessionUser;
  try {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEYS.SESSION);
    if (stored) {
      cachedSessionUser = JSON.parse(stored);
      return cachedSessionUser;
    }
    const persistent = localStorage.getItem(AUTH_STORAGE_KEYS.PERSIST);
    if (persistent) {
      cachedSessionUser = JSON.parse(persistent);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION, JSON.stringify(cachedSessionUser));
      } catch (storageError) {
        // Oturum depolaması kullanılamıyorsa göz ardı et.
      }
      return cachedSessionUser;
    }
  } catch (error) {
    cachedSessionUser = null;
  }
  return cachedSessionUser;
}

function setActiveUser(user) {
  if (user) {
    cachedSessionUser = {
      name: user.name || "Fintech Hub Üyesi",
      email: user.email,
      company: user.company || ""
    };
    try {
      sessionStorage.setItem(AUTH_STORAGE_KEYS.SESSION, JSON.stringify(cachedSessionUser));
    } catch (error) {
      // Sessiz geç
    }
  } else {
    cachedSessionUser = null;
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEYS.SESSION);
    } catch (error) {
      // Sessiz geç
    }
  }
}

function persistActiveUser(user, shouldPersist) {
  try {
    if (shouldPersist && user) {
      localStorage.setItem(
        AUTH_STORAGE_KEYS.PERSIST,
        JSON.stringify({ name: user.name || "Fintech Hub Üyesi", email: user.email, company: user.company || "" })
      );
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEYS.PERSIST);
    }
  } catch (error) {
    // Tarayıcı depolaması kullanılamıyorsa sessizce yoksay.
  }
}

function updateAuthState() {
  const user = getActiveUser();
  const authButtons = document.getElementById("auth-buttons");
  const authLoggedIn = document.getElementById("auth-logged-in");
  const accountShortcut = document.getElementById("account-shortcut");
  if (authButtons) {
    authButtons.toggleAttribute("hidden", Boolean(user));
  }
  if (authLoggedIn) {
    authLoggedIn.toggleAttribute("hidden", !user);
  }
  if (accountShortcut) {
    const fallbackLabel = "Hesap panelini aç";
    if (user && (user.name || user.email)) {
      const displayName = user.name || user.email;
      accountShortcut.setAttribute("aria-label", `${displayName} hesabını aç`);
      accountShortcut.setAttribute("title", displayName);
    } else {
      accountShortcut.setAttribute("aria-label", fallbackLabel);
      accountShortcut.removeAttribute("title");
    }
  }
  populateAccountModal(user);
}

function populateAccountModal(user) {
  const nameElement = document.getElementById("account-user-name");
  const emailElement = document.getElementById("account-user-email");
  const companyElement = document.getElementById("account-user-company");
  const statusElement = document.getElementById("account-status");
  if (statusElement) {
    statusElement.textContent = "";
    statusElement.classList.remove("success", "error");
  }
  if (user && user.email) {
    if (nameElement) nameElement.textContent = user.name || "Fintech Hub Üyesi";
    if (emailElement) emailElement.textContent = user.email;
    if (companyElement) {
      companyElement.textContent = user.company ? `${user.company}` : "";
    }
  } else {
    if (nameElement) nameElement.textContent = "Misafir Kullanıcı";
    if (emailElement) emailElement.textContent = "Giriş yapmadınız.";
    if (companyElement) companyElement.textContent = "";
  }
}

function handleLogin(form) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const status = document.getElementById("login-form-status");
  const email = (form.email.value || "").trim().toLowerCase();
  const password = form.password.value || "";
  const users = getStoredUsers();
  const user = users.find((item) => item.email && item.email.toLowerCase() === email);
  if (!user || user.password !== password) {
    if (status) {
      status.textContent = "E-posta veya şifre hatalı. Demo hesap bilgilerinin doğru olduğundan emin olun.";
      status.classList.add("error");
      status.classList.remove("success");
    }
    return;
  }
  setActiveUser(user);
  persistActiveUser(user, form.remember?.checked);
  updateAuthState();
  if (status) {
    status.textContent = "Başarıyla giriş yaptınız. Hesap panelinizi açıyoruz.";
    status.classList.add("success");
    status.classList.remove("error");
  }
  form.reset();
  setTimeout(() => {
    const loginModal = document.getElementById("login-modal");
    if (loginModal) {
      closeModal(loginModal);
    }
    const accountModal = document.getElementById("account-modal");
    if (accountModal) {
      openModal(accountModal);
    }
  }, 700);
}

function handleSignup(form) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const status = document.getElementById("signup-form-status");
  const name = (form.name.value || "").trim();
  const company = (form.company.value || "").trim();
  const email = (form.email.value || "").trim().toLowerCase();
  const password = form.password.value || "";
  const users = getStoredUsers();
  const exists = users.some((item) => item.email && item.email.toLowerCase() === email);
  if (exists) {
    if (status) {
      status.textContent = "Bu e-posta ile zaten kayıt bulunuyor. Lütfen giriş yapmayı deneyin.";
      status.classList.add("error");
      status.classList.remove("success");
    }
    return;
  }
  const newUser = { name, company, email, password };
  const updatedUsers = [...users, newUser];
  saveAuthUsers(updatedUsers);
  setActiveUser(newUser);
  persistActiveUser(newUser, true);
  updateAuthState();
  if (status) {
    status.textContent = "Üyeliğiniz oluşturuldu. Araçlara erişim için hesap panelini açıyoruz.";
    status.classList.add("success");
    status.classList.remove("error");
  }
  form.reset();
  setTimeout(() => {
    const signupModal = document.getElementById("signup-modal");
    if (signupModal) {
      closeModal(signupModal);
    }
    const accountModal = document.getElementById("account-modal");
    if (accountModal) {
      openModal(accountModal);
    }
  }, 700);
}

function handleLogout() {
  setActiveUser(null);
  persistActiveUser(null, false);
  updateAuthState();
  const status = document.getElementById("account-status");
  if (status) {
    status.textContent = "Çıkış yapıldı. Tekrar görüşmek üzere!";
    status.classList.add("success");
    status.classList.remove("error");
  }
  setTimeout(() => {
    const accountModal = document.getElementById("account-modal");
    if (accountModal) {
      closeModal(accountModal);
    }
  }, 800);
}

function initBusinessTools() {
  populateCommissionSelect();
  initCommissionCalculator();
  populateComparisonSelector();
}

function populateCommissionSelect() {
  const select = document.getElementById("commission-provider");
  if (!select) return;
  const options = providers
    .filter((provider) => provider.supportsCommissionCalculator)
    .map((provider) => `<option value="${provider.id}">${provider.name}</option>`)
    .join("");
  select.innerHTML = `<option value="" disabled selected>Sağlayıcı seçin</option>${options}`;
}

function initCommissionCalculator() {
  const form = document.getElementById("commission-form");
  const result = document.getElementById("commission-result");
  if (!form || !result) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const providerId = form.provider.value;
    const provider = providers.find((item) => item.id === providerId);
    if (!provider) {
      result.innerHTML = '<p class="calc-result-error">Lütfen sağlayıcı seçin.</p>';
      return;
    }
    const volume = Number(form.volume.value || 0);
    const average = Number(form.average.value || 0);
    const installmentRate = Number(form.installment.value || 0);
    if (!volume || !average) {
      result.innerHTML = '<p class="calc-result-error">Hacim ve ortalama sepet bilgilerini girin.</p>';
      return;
    }
    const transactions = Math.max(Math.round(volume / average), 1);
    const feeModel = provider.pricing?.feeModel || {};
    const baseCommission = volume * ((feeModel.percentage || 0) / 100);
    const fixedCost = transactions * (feeModel.fixed || 0);
    const subscriptionCost = feeModel.subscription || 0;
    const installmentCost =
      installmentRate > 0
        ? volume * ((feeModel.installment || 0) / 100) * (installmentRate / 100)
        : 0;
    const total = baseCommission + fixedCost + subscriptionCost + installmentCost;
    result.innerHTML = `
      <div class="calc-result-card">
        <h4>${provider.name}</h4>
        <p class="calc-highlight">Tahmini aylık maliyet: <strong>${formatCurrency(total)}</strong></p>
        <ul>
          <li>İşlem adedi: <strong>${transactions}</strong></li>
          <li>Komisyon: <strong>${formatCurrency(baseCommission)}</strong></li>
          <li>Sabit ücret: <strong>${formatCurrency(fixedCost)}</strong></li>
          <li>Abonelik: <strong>${formatCurrency(subscriptionCost)}</strong></li>
        </ul>
        <p class="calc-note">Not: Gerçek maliyet işlem dağılımına ve sağlayıcı kampanyalarına göre değişebilir.</p>
      </div>
    `;
  });
}

function populateComparisonSelector() {
  const selector = document.getElementById("comparison-selector");
  if (!selector) return;
  selector.innerHTML = providers
    .map(
      (provider) => `
        <label class="comparison-option">
          <input type="checkbox" value="${provider.id}">
          <span>${provider.name}</span>
        </label>
      `
    )
    .join("");
  selector.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener("change", () => {
      const checked = Array.from(selector.querySelectorAll('input[type="checkbox"]:checked'));
      if (checked.length > 3) {
        input.checked = false;
        return;
      }
      const selectedProviders = checked
        .map((item) => providers.find((provider) => provider.id === item.value))
        .filter(Boolean);
      updateComparisonTable(selectedProviders);
    });
  });
  updateComparisonTable([]);
}

function updateComparisonTable(selectedProviders) {
  const table = document.getElementById("comparison-table");
  if (!table) return;
  const headerCells = table.querySelectorAll("thead th[data-column]");
  headerCells.forEach((cell, index) => {
    const provider = selectedProviders[index];
    cell.textContent = provider ? provider.name : "—";
  });

  const rows = [
    {
      label: "Puan",
      accessor: (provider) => `${provider.rating.toFixed(1)} / 5 (${provider.reviews}+)`
    },
    {
      label: "Ücretlendirme",
      accessor: (provider) => provider.pricing?.headline || "Teklif Alın"
    },
    {
      label: "Yerleşim",
      accessor: (provider) => provider.metrics?.settlement || "Bilgi alın"
    },
    {
      label: "Destek",
      accessor: (provider) => provider.metrics?.support || "Bilgi alın"
    },
    {
      label: "Uyumluluk",
      accessor: (provider) => (provider.comparison?.compliance || []).join(", ") || "Belirtilmemiş"
    },
    {
      label: "Entegrasyonlar",
      accessor: (provider) => (provider.comparison?.integrations || []).join(", ") || "Belirtilmemiş"
    },
    {
      label: "Go-live süresi",
      accessor: (provider) => provider.comparison?.goLive || "—"
    },
    {
      label: "Taahhüt",
      accessor: (provider) => provider.comparison?.minCommitment || "—"
    }
  ];

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = rows
    .map((row) => {
      const cells = [0, 1, 2]
        .map((index) => {
          const provider = selectedProviders[index];
          return `<td>${provider ? row.accessor(provider) : "—"}</td>`;
        })
        .join("");
      return `<tr><th>${row.label}</th>${cells}</tr>`;
    })
    .join("");
}

async function initMarketTicker() {
  const tickers = document.querySelectorAll("[data-market-ticker]");
  if (!tickers.length) {
    return;
  }

  const marketData = await loadMarketData();
  const rates = marketData.rates || [];
  const items = rates.length ? rates : DEFAULT_MARKET_DATA.rates;
  const updatedLabel = marketData.lastUpdated || DEFAULT_MARKET_DATA.lastUpdated;

  tickers.forEach((ticker) => {
    const updated = ticker.querySelector("[data-market-updated]");
    if (updated && updatedLabel) {
      updated.textContent = updatedLabel;
    }

    const track = ticker.querySelector(".market-ticker-track");
    if (!track) {
      return;
    }

    const itemsMarkup = items
      .map((rate) => {
        const trendClass = rate.direction === "down" ? "negative" : "positive";
        const iconMarkup = rate.icon ? `<i class="fas ${rate.icon}" aria-hidden="true"></i>` : "";
        const symbolMarkup = iconMarkup ? `${iconMarkup} ${rate.symbol}` : rate.symbol;
        return `
          <div class="ticker-item ${trendClass}" role="listitem">
            <span class="ticker-symbol">${symbolMarkup}</span>
            <span class="ticker-value">${rate.value}</span>
            <span class="ticker-change ${trendClass}">${rate.change}</span>
          </div>
        `;
      })
      .join("");

    track.innerHTML = `${itemsMarkup}${itemsMarkup}`;
    const duration = Math.max(20, items.length * 4);
    track.style.setProperty("--ticker-duration", `${duration}s`);
    ticker.classList.add("is-active");
  });
}

function loadMarketData() {
  if (!marketDataPromise) {
    marketDataPromise = fetch(MARKET_DATA_URL, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Piyasa verileri alınamadı (HTTP ${response.status})`);
        }
        return response.json();
      })
      .catch((error) => {
        console.warn("Market ticker verileri yüklenemedi, varsayılan değerler kullanılacak.", error);
        return { ...DEFAULT_MARKET_DATA };
      });
  }

  return marketDataPromise;
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  if (!("IntersectionObserver" in window) || elements.length === 0) {
    elements.forEach((el) => el.classList.add("animated"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));
}

function normalizeText(value) {
  return (value || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2
  }).format(value || 0);
}

// Logo URL mapping for providers and banks
const providerLogos = {
  // Payment Gateways
  'iyzico': 'https://www.iyzico.com/assets/images/content/iyzico-one-line.svg',
  'paytr': 'https://www.paytr.com/logo/logo-dark.svg',
  'bkm-express': 'https://bkmexpress.com.tr/assets/images/bkm-express-logo.svg',
  
  // Digital Wallets
  'papara-business': 'https://www.papara.com/images/papara-logo.svg',
  'param': 'https://param.com.tr/Content/images/param-logo.png',
  
  // mPOS
  'moka': 'https://moka.com/assets/img/moka-logo.svg',
  
  // BNPL
  'payflex': 'https://logo.clearbit.com/payflex.com.tr',
  'tosla': 'https://tosla.com/assets/logo.svg',
  
  // Neo Bank
  'kolektif': 'https://kolektifhouse.co/assets/logo.svg',

  // Banks - using Clearbit and direct CDN links for better reliability
  'garanti-bbva': 'https://logo.clearbit.com/garantibbva.com.tr',
  'akbank': 'https://logo.clearbit.com/akbank.com',
  'isbankasi': 'https://logo.clearbit.com/isbank.com.tr',
  'yapi-kredi': 'https://logo.clearbit.com/yapikredi.com.tr',
  'qnb-finansbank': 'https://logo.clearbit.com/qnbfinansbank.com'
};

function getProviderLogoUrl(providerId) {
  return providerLogos[providerId] || null;
}

function initCharts() {
  initPaymentVolumeChart();
  initPaymentMethodsChart();
  initGrowthTrendChart();
  initRegionalChart();
  initMonthlyVolumeChart();
}

function initPaymentVolumeChart() {
  const ctx = document.getElementById("paymentVolumeChart");
  if (!ctx) return;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2020", "2021", "2022", "2023", "2024", "2025 (tah.)"],
      datasets: [
        {
          label: "Dijital Ödeme Hacmi (₺B)",
          data: [45.2, 67.8, 89.4, 103.7, 127.3, 153.5],
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: "#e5e7eb" } },
        x: { grid: { display: false } }
      }
    }
  });
}

function initPaymentMethodsChart() {
  const ctx = document.getElementById("paymentMethodsChart");
  if (!ctx) return;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Kart", "FAST", "BNPL", "Cüzdan", "Diğer"],
      datasets: [
        {
          data: [46, 18, 12, 17, 7],
          backgroundColor: ["#1e3a8a", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
          borderWidth: 2,
          borderColor: "#ffffff"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

function initGrowthTrendChart() {
  const ctx = document.getElementById("growthTrendChart");
  if (!ctx) return;
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Fintech Gelir Büyümesi",
          data: [14, 18, 21, 24],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: (value) => `${value}%` } },
        x: { grid: { display: false } }
      }
    }
  });
}

function initRegionalChart() {
  const ctx = document.getElementById("regionalChart");
  if (!ctx) return;
  new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Diğer"],
      datasets: [
        {
          data: [43.8, 15.2, 12.6, 8.9, 6.8, 12.7],
          backgroundColor: ["#1e3a8a", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
          borderWidth: 2,
          borderColor: "#ffffff"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } }
    }
  });
}

function initMonthlyVolumeChart() {
  const ctx = document.getElementById("monthlyVolumeChart");
  if (!ctx) return;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
      datasets: [
        {
          label: "İşlem Hacmi (₺B)",
          data: [11.3, 10.7, 12.1, 11.9, 13.4, 13.1, 14.6, 14.1, 15.5, 15.2, 16.7, 18.4],
          borderColor: "#1e3a8a",
          backgroundColor: "rgba(30, 58, 138, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: "#e5e7eb" } },
        x: { grid: { display: false } }
      }
    }
  });
}
