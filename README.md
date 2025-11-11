# Fintech Hub Türkiye – Production-Ready Fintech Platform 🚀

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

Türkiye'nin en kapsamlı fintech ve ödeme çözümleri platformu. **Full-stack** uygulama olarak PostgreSQL veritabanı, Express.js API backend'i, JWT authentication ve modern frontend ile geliştirilmiştir.

## ⭐ Platform Özellikleri

- 🔐 **JWT Authentication** - Güvenli kullanıcı yönetimi
- 🗄️ **PostgreSQL Database** - 12 tablo ile robust veri yapısı
- 🎯 **User Dashboard** - Favoriler, karşılaştırma geçmişi, kişisel panel
- 📊 **Analytics** - Google Analytics 4 + özel event tracking
- 🔍 **SEO Optimized** - Structured data, Open Graph, sitemap
- ⚖️ **Legal Compliant** - KVKK uyumlu gizlilik politikası
- 🚀 **Production Ready** - Netlify deploy, PM2 config, Nginx setup

## İçerik

- `index.html` – Ana sayfa. Fintech hub’ın amacı, öne çıkan ödeme sağlayıcıları ve haber bölümü için yer tutucular barındırır.
- `style.css` – Basit bir renk paleti ve tipografi içeren stil dosyası.
- `README.md` – Bu döküman.

## Nasıl çalıştırılır?

1. Projeyi bilgisayarınıza klonlayın veya indirin.
2. Dosyaları bir web sunucusunda veya doğrudan tarayıcıda açabilirsiniz. Örneğin:

```bash
# Python ile geçici bir sunucu başlatma
cd fintech-hub
python3 -m http.server 8000
```

Ardından tarayıcınızda `http://localhost:8000` adresine giderek siteyi görebilirsiniz.

## TCMB EVDS kur verilerini güncellemek

Projede yer alan TCMB referans kuru bandı `data/market-rates.json` dosyasından beslenir. Bu dosyayı güncellemek için TCMB EVDS API anahtarınızı `.env` dosyasına kaydedip aşağıdaki komutu çalıştırabilirsiniz:

```bash
cp .env.example .env # anahtarınızı bu dosyaya girin
npm run update:market
```

Komut, EVDS servisinden son 10 günün USD, EUR, GBP, CHF, CNY ve altın alış kurlarını alır, yüzde değişimleri hesaplar ve ticker bileşeni tarafından kullanılan JSON çıktısını üretir.

## 🌐 Netlify'de Deploy Etme

### Otomatik Deploy (Önerilen)

1. [Netlify](https://www.netlify.com/) hesabınızla giriş yapın
2. **"Add new site" > "Import an existing project"** seçin
3. GitHub reponuzu bağlayın
4. Netlify `netlify.toml` dosyasını otomatik algılayacak
5. **Deploy site** butonuna tıklayın

### Manuel Kurulum (Opsiyonel)

Netlify'de manuel ayarlar:
- **Build command**: `npm install`
- **Publish directory**: `.` (root)
- **Node version**: `18` (Environment variables'da)

### Preview Deployments

Her branch için otomatik preview URL'i oluşturulur:
- **Production**: `https://your-site.netlify.app`
- **Preview**: `https://deploy-preview-123--your-site.netlify.app`

> ⚠️ **Not**: Backend API'leri Netlify'de çalışmaz. Production için PostgreSQL ve Express backend'ini ayrı host etmeniz gerekir (Heroku, Railway, DigitalOcean vb.).

## Sonraki adımlar

- Tasarımı ve kullanıcı deneyimini iyileştirmek için Figma üzerinde bir arayüz prototipi oluşturulabilir ve buradaki HTML/CSS kodu güncellenebilir.
- İçerik yönetimi için Netlify CMS, Sanity veya Strapi gibi bir headless CMS entegre edilebilir; bu sayede haberler ve firma bilgileri yönetim panelinden güncellenebilir.
- Site dinamik hâle getirilmek istenirse bir frontend framework’ü (örneğin Next.js veya SvelteKit) kullanılabilir ve serverless fonksiyonlar ile veriler sunulabilir.
- Sağlayıcı komisyon ve fiyat verilerini otomatik senkronize etmek için [docs/provider-data-strategy.md](docs/provider-data-strategy.md) belgesindeki veri hattı planı uygulanabilir.
