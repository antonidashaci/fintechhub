# Fintech Hub Türkiye – Production Setup (Local)

Bu klasör, Fintech Hub Türkiye sitesinin prodüksiyon sürümüdür ve yerel geliştirme ortamınızda çalıştırmanız için gerekli dosyaları içerir. Basit bir statik site olduğundan, ek derleme adımı gerekmez. Yerel makinenizde bir HTTP sunucusu kullanarak sitenin çalışmasını sağlayabilirsiniz.

## Yerel Sunucu ile Çalıştırma

### Python HTTP Sunucusu

Python 3 yüklü ise aşağıdaki komutla 8000 portu üzerinden sunucu başlatabilirsiniz:

```bash
cd fintech-hub-prod
python3 -m http.server 8000
```

Tarayıcınızda `http://localhost:8000` adresine giderek siteyi görüntüleyebilirsiniz.

### Basit HTTP Sunucusu (Node.js)

Node.js kurulu ise `http-server` paketini global olarak kurarak da çalıştırabilirsiniz:

```bash
npm install -g http-server
cd fintech-hub-prod
http-server -p 8000
```

(Not: Bu seçeneği kullanmak için npm paketlerine erişim gereklidir.)

## Dağıtım (Deploy) Notları

- Site tamamen statik olduğundan herhangi bir CDN veya web sunucusu üzerinden kolaylıkla dağıtılabilir.
- Daha kapsamlı bir prodüksiyon ortamı için Nginx veya Apache gibi bir web sunucusuyla yapılandırabilirsiniz. Nginx üzerinde root dizini `fintech-hub-prod/` olarak ayarlamanız yeterli olacaktır.

