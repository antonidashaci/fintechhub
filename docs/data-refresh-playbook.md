# Veri Güncelleme Planı – FintechHub Türkiye

Bu plan, sitede yayınlanan pazar verilerinin güncelliğini ve doğruluğunu sağlamak için takip edilecek kaynakları, sorumluları ve frekansları özetler.

| Veri Türü | Kaynak(lar) | Güncelleme Sıklığı | Sorumlu/Rol | Yöntem & Notlar |
| --- | --- | --- | --- | --- |
| TCMB Döviz Kurları (USD/EUR/GBP/CHF/CNY, GAU) | TCMB EVDS API (`evds2.tcmb.gov.tr`), `api/fetch-rates.js` | Günlük (07:00 + 13:00) | **Ops Müh.** – Sunucusuz fonksiyon bakımı | Vercel serverless (cron) + fallback JSON. Başarısız loglar Slack’e bildirilir. |
| Faiz Oranları (Politika, gecelik, TLREF) | TCMB duyuruları, `tbb.org.tr` | Haftalık (Pazartesi) | **İçerik Analisti** | Manuel kontrol, blog veri kartı güncellemesi. |
| Banka POS Komisyonları | Garanti BBVA, Akbank, Yapı Kredi, QNB Finansbank resmi sayfaları | 3 ayda bir (Mart/ Haziran/ Eylül/ Aralık) | **Bankacılık İlişkileri** | `providers.json` ve Notion audit tablosuna işlenir; değişiklikler blog haberinde duyurulur. |
| Fintech POS/Ödeme Sağlayıcı Ücretleri | iyzico, PayTR, Papara, Param, Moka resmi basın kitleri / satış ekipleri | 2 ayda bir (Ocak, Mart, Mayıs, Temmuz, Eylül, Kasım) | **SaaS Partner Manager** | Satış ekiplerinden doğrulama; `lastUpdated` alanı güncellenir. |
| BNPL Kampanyaları (Tosla, PayFlex) | Sağlayıcı kampanya sayfaları, basın duyuruları | Aylık (her ayın 5’i) | **Growth Specialist** | Kampanya süresi bitmişse provider kaydından kaldırılır, blog “güncel kampanyalar” notu eklenir. |
| Regülasyon Duyuruları (BDDK, MASAK, Resmi Gazete) | `bdk.gov.tr`, `resmigazete.gov.tr`, MASAK bültenleri | Haftalık takip, ayda 1 derleme | **Compliance Lead** | Notion’daki “Regülasyon Takibi” tablosuna eklenir, önem derecesine göre blog haberi veya rehber güncellemesi yapılır. |
| Fintech Haberleri / Yatırım Turları | Fintechtime, egirişim, Para Dergisi, TechCrunch | Haftalık | **İçerik Analisti** | Blog “haber” kategorisi ve bülten. Yayın sonrası GA4 etkinliği `content_publish`. |
| Veri Kartları (Ödeme Hacmi, POS kıyas) | BKM yıllık raporlar, Deloitte Fintech, Statista (lisanslı) | Çeyreklik | **Veri Analisti** | Grafikleri güncelle, JSON-LD `dataset` ekle, görselleri optimize et. |
| Makale/Blog İçerikleri | İçerik pipeline board | Haftalık sprint | **Editör** | Brief → Draft → Review akışı; meta ve structured data kontrolleri. |

## Süreç Kontrolleri
- Her veri türü için Notion’da “Veri Audit” tablosunda kayıt oluşturulur; güncelleme tarihi, sorumlu, kaynak linki ve notlar işlenir.
- Günlük otomasyon (TCMB) için Vercel cron job logları Slack #fintechhub-alerts kanalına düşer.
- Haftalık Pazartesi stand-up’ında kritik güncellemeler paylaşılır; gecikme varsa risk olarak işlenir.
- `GO-LIVE-CHECKLIST.md` içinde “Veri tazeliği” maddesi güncelleme tarihlerini kontrol eder.
- Yeni veri kaynağı eklenirse bu dosya PR sürecinde güncellenir.

## Belge Sorumlusu
- **Ops Owner:** Emre C. – Güncelleme takviminin işletilmesi, bu dokümanın güncellenmesi.


