# .nojekyll Dosyası Hakkında

## Ne İşe Yarar?

`.nojekyll` dosyası **tamamen boş olmalıdır** - bu normaldir ve doğrudur!

### Teknik Açıklama

- **GitHub Pages** varsayılan olarak **Jekyll** (statik site oluşturucu) kullanır
- Jekyll, dosyaları işlerken bazı dosyaları değiştirir veya görmezden gelir
- Bu işlem modern JavaScript uygulamalarında sorunlara neden olur

### Sorunlar

Jekyll olmadan:
- ❌ JavaScript modülleri yanlış MIME type ile sunulur (`application/octet-stream`)
- ❌ `_` ile başlayan dosyalar/klasörler görmezden gelinir
- ❌ Vite/Webpack gibi modern build araçları düzgün çalışmaz

### Çözüm

`.nojekyll` dosyası GitHub Pages'e şunu söyler:
> "Jekyll kullanma, dosyaları olduğu gibi yayınla!"

### Sonuç

- ✅ JavaScript modülleri doğru MIME type ile sunulur (`application/javascript`)
- ✅ Tüm dosyalar ve klasörler yayınlanır
- ✅ Modern build araçları sorunsuz çalışır
- ✅ Deployment hataları ortadan kalkar

## Önemli Notlar

1. **Dosya boş olmalıdır** - içeriği önemli değil, sadece varlığı önemlidir
2. **public/ klasöründe olmalıdır** - build sırasında dist/ klasörüne kopyalanır
3. **Silmeyin!** - Bu dosya olmadan site düzgün çalışmaz

---

*Bu dosya deployment sorunlarını çözmek için otomatik olarak oluşturulmuştur.*
