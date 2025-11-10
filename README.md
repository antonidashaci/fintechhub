# Fintech Hub Türkiye – statik site prototipi

Bu depo, Türkiye’deki fintech ve ödeme çözümleri ekosistemi için planlanan hub sitesinin temel bir prototipini içerir. Şimdilik basit bir **HTML/CSS** tabanlı statik site olarak hazırlanmıştır. İlerleyen aşamalarda içerik yönetimi (CMS), veritabanı ve dinamik özellikler eklenecektir.

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

## Netlify üzerinde yayınlamak

1. Bir [Netlify](https://www.netlify.com/) hesabı oluşturun.
2. Bu projeyi GitHub/GitLab üzerinde bir depoya gönderin (veya Netlify’nin “Deploy manually” seçeneği ile zip olarak yükleyin).
3. Netlify panelinde **“New site from Git”** seçeneğini seçip depoyu bağlayın.
4. Build ayarları olarak statik site olduğu için “build command” boş bırakılabilir, “publish directory” ise projenin kök dizini olacaktır (`/`).
5. Alan adınızı bağlamak için Netlify’nin **Domain Management** bölümünü kullanabilirsiniz.

## Sonraki adımlar

- Tasarımı ve kullanıcı deneyimini iyileştirmek için Figma üzerinde bir arayüz prototipi oluşturulabilir ve buradaki HTML/CSS kodu güncellenebilir.
- İçerik yönetimi için Netlify CMS, Sanity veya Strapi gibi bir headless CMS entegre edilebilir; bu sayede haberler ve firma bilgileri yönetim panelinden güncellenebilir.
- Site dinamik hâle getirilmek istenirse bir frontend framework’ü (örneğin Next.js veya SvelteKit) kullanılabilir ve serverless fonksiyonlar ile veriler sunulabilir.
- Sağlayıcı komisyon ve fiyat verilerini otomatik senkronize etmek için [docs/provider-data-strategy.md](docs/provider-data-strategy.md) belgesindeki veri hattı planı uygulanabilir.
