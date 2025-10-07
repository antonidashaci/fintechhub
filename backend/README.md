# Fintech Hub Türkiye Backend API (örnek)

Bu klasör, statik site formlarını test etmek ve yerel geliştirme ortamında basit bir API sağlamak için hazırlanmış Express tabanlı bir örnek backend içerir.

## Özellikler

- `/api/requests`: Sağlayıcı talep formlarını kaydeder.
- `/api/contact`: İletişim formu mesajlarını kaydeder.
- `/api/newsletter`: Bülten aboneliklerini kaydeder, tekrar eden abonelikleri engeller.
- `/api/admin/summary`: Kaydedilen toplamları ve son güncellenme zamanını döndürür.
- `/api/content`: Haber ve regülasyon içeriklerini döndürür.
- `/api/content/:section`: Belirli bir içerik bölümünü (`news`, `regulations` vb.) listeler.

Veriler `backend/data/submissions.json` dosyasında JSON formatında saklanır. Üretim için bir veritabanı veya CRM entegrasyonu önerilir.

## Kurulum

```bash
npm install
npm run dev:backend
```

Ardından `http://localhost:4000` adresinden API'ya erişebilirsiniz. Frontend varsayılan olarak `http://localhost:4000/api` taban adresini kullanacak şekilde yapılandırılmıştır.

## Geliştirme Notları

- CORS tüm origin'lere açıktır; prod ortamında sınırlama yapılmalıdır.
- Kayıtlar dosyaya eklendiği için yoğun trafikte dosya kilitlenmesini önlemek adına kalıcı bir veri deposu tercih edilmelidir.
- İlgili çevresel değişkenler: `PORT` (varsayılan 4000).

