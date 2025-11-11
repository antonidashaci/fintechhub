# Logo Dosyaları

Bu klasör fintech sağlayıcıları ve bankaların logolarını içerir.

## Logo Gereksinimleri

- **Format**: PNG (şeffaf arka plan) veya SVG
- **Boyut**: 200x200px (ideal)
- **İsimlendirme**: küçük harf, tire ile (örn: `iyzico.png`, `papara-business.png`)

## Dizin Yapısı

```
assets/logos/
├── providers/    # Ödeme sağlayıcı logoları
└── banks/        # Banka logoları
```

## Logo Kaynakları

Logolar şu kaynaklardan edinilebilir:
1. Resmi web sitelerinden
2. Clearbit Logo API: `https://logo.clearbit.com/domain.com`
3. Brandfetch: `https://brandfetch.com/`
4. Company press kit/media pages

## Kullanım

CSS'de logo gösterimi:

```css
.provider-logo {
    background: url('../assets/logos/providers/iyzico.png') center/contain no-repeat;
}
```

