# Fintech Hub Türkiye – statik site prototipi

Bu depo, Türkiye’deki fintech ve ödeme çözümleri ekosistemi için planlanan hub sitesinin temel bir prototipini içerir. Şimdilik basit bir **HTML/CSS** tabanlı statik site olarak hazırlanmıştır. İlerleyen aşamalarda içerik yönetimi (CMS), veritabanı ve dinamik özellikler eklenecektir.

## İçerik

- `index.html` – Ana sayfa. Fintech hub’ın amacı, öne çıkan ödeme sağlayıcıları ve haber bölümü için yer tutucular barındırır.
- `solutions.html` – Çözüm rehberlerinin detay sayfası.
- `providers.html` – Sağlayıcı dizini ve filtreleme araçları.
- `news.html` – Fintechtime kaynaklı 2024 haberlerini backend API'dan çekip FintechUBB yorumlarıyla gösterir.
- `regulation.html` – Regülasyon takvimini API'dan besler, aksiyon planları ve sık sorulan sorular içerir.
- `legal.html` – KVKK, gizlilik ve çerez politikaları.
- `style.css` – Global stil dosyası.
- `assets/js/app.js` – Navigasyon, formlar, içerik API çağrıları ve grafiklerin modüler inisyalizasyonunu yöneten modern JavaScript modülü.
- `backend/` – Form verilerini kaydeden ve haber/regülasyon içeriklerini sunan Express tabanlı örnek API (`data/content.json`).
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
- Form verilerini kalıcı olarak saklamak için backend klasöründeki Express sunucusu bir veritabanı ile genişletilebilir veya mevcut CRM sistemleriyle entegre edilebilir.
