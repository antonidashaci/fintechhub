# Sağlayıcı Verisi Güncelleme Stratejisi

## Amaç
Fintech Hub Türkiye'deki ödeme sağlayıcısı kartlarının fiyat, komisyon, ödeme süresi ve SLA gibi metriklerinin güncel kalmasını sağlamak için yarı otomatik bir veri besleme hattı kurmak.

## Veri Kaynakları
- **Resmî API'ler:** iyzico, PayTR, Param, Craftgate gibi sağlayıcıların partner API'lerinden fiyatlandırma ve SLA metrikleri okunabilir. Her sağlayıcı için OAuth/API anahtarı yönetimi `config/providers/<sağlayıcı>.json` dosyalarında saklanmalı.
- **Kamu duyuruları:** BDDK/TCMB bültenleri ile kartlı ödemeler komisyon sınırları gibi düzenleyici veriler `scripts/fetch_regulations.js` benzeri görevlerle indirilebilir.
- **Manuel doğrulama:** API sunmayan sağlayıcılar için satış ekiplerinden alınan PDF/Excel teklifleri `data/provider-sources/` klasörüne tarih damgasıyla kaydedilir.

## Normalizasyon
1. `scripts/fetch_providers.js` dosyası tüm kaynaklardan çekilen ham verileri `temp/provider-raw.json` dosyasında birleştirir.
2. Dönüşümler (para birimi, yüzdelik formatı, tarih) `scripts/normalize_providers.js` içerisinde yapılır.
3. Normalize edilen kayıtlar `data/providers.json` dosyasına yazılır ve site tarafından istemci tarafında tüketilir.

## Doğrulama ve Kalite
- Her güncelleme öncesinde `npm run validate:providers` komutu, JSON şemasına ve beklenen aralık kontrollerine göre veri kalitesini doğrular.
- Kritik alanlar (komisyon, settlement süresi) için önceki değerle fark %10'dan fazlaysa `reports/provider-changes/<tarih>.md` dosyasına insan incelemesi için rapor düşülür.
- Gerektiğinde yönetici panelinden manuel override alanı (`data/providers-overrides.json`) uygulanır ve normalize süreçte birleştirilir.

## Senkronizasyon Sıklığı
- **Haftalık:** Standart sağlayıcı fiyatları ve kampanya oranları.
- **Günlük:** TCMB/BDDK referans oranları.
- **Anlık:** API webhooks'u destekleyen sağlayıcılar için queue (örn. Redis Streams) üzerinden tetiklenen güncellemeler.

## Depolama ve Yayınlama
- Üretimde veriler Firebase Firestore veya Supabase gibi yönetilen bir veritabanında saklanıp CDN önbelleğiyle (`data/providers.json` statik çıktısı) yayınlanabilir.
- Yerel geliştirmede JSON dosyası yeterlidir; `npm run sync:providers` komutu Firestore'dan çekilen son hali indirir.

## Sonraki Adımlar
1. `scripts/fetch_providers.js` ve `scripts/normalize_providers.js` için iskelet dosyalar oluşturulmalı.
2. Sağlayıcı başına kimlik bilgileri `.env` yerine `config/providers/` altında ayrı dosyalara taşınmalı.
3. Doğrulama şeması için `schemas/provider.schema.json` hazırlanmalı.
4. CI üzerinde haftalık cron tetikleyip `npm run update:providers` komutunun çıktısını gözden geçirecek bir GitHub Actions iş akışı eklenmeli.
