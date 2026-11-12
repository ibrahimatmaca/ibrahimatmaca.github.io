import React from 'react';
import KidTalesLegalLayout from './KidTalesLegalLayout';

const englishContent = `
      <p><strong>Last Updated:</strong> November 12, 2026<br />
      <strong>Developer:</strong> İbrahim Atmaca (individual developer, Türkiye)<br />
      <strong>Contact:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a></p>

      <p>
        These Terms of Use ("Terms") govern your use of Wada Closet ("the App").
        By downloading or using the App you agree to them. If you do not agree,
        do not use the App. Nothing in these Terms limits any mandatory consumer
        rights you have under the law of your country.
      </p>

      <h2>1. License and Apple terms</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable, revocable
        license to use the App on Apple devices you own or control, as permitted
        by the Apple Media Services Terms and the
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">Apple Standard End User License Agreement (EULA)</a>,
        which also apply. These Terms are between you and us, not Apple. Apple
        has no obligation to provide maintenance or support for the App, and is
        not responsible for claims relating to it. If the App fails to conform to
        a warranty that applies, you may notify Apple for a refund of the
        purchase price, if any; Apple has no other warranty obligation for the App.
        Apple and its subsidiaries are third-party beneficiaries of these Terms and
        may enforce them against you. Apple is not responsible for third-party
        claims such as product liability, legal-compliance or intellectual-property
        claims, which are handled by us. You confirm that you are not located in a
        country under a U.S. government embargo and are not on a U.S. list of
        prohibited or restricted parties. You must also comply with the applicable
        terms of third-party services you use together with the App, such as
        Google AdMob and your wireless or data provider.
      </p>

      <h2>2. What the App does</h2>
      <p>
        Wada Closet lets you photograph clothes, build a digital closet, match
        each item to the Sanzo Wada color palette, receive outfit suggestions
        based on color harmony, get weather-based outfit ideas, export outfits as an image or PDF, back up
        and restore your closet, and enhance garment images with AI (daily or
        monthly limits apply). Outfit suggestions are
        creative inspiration only. Colors detected from photos depend on
        lighting, camera and screen, and may differ from the real item. We do
        not guarantee that any suggestion will suit you, your body, an occasion
        or a dress code.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        You must be at least 13 years old, or the minimum age required in your
        country to use such services. If you are under the age of majority, a
        parent or guardian must agree to these Terms and approve any purchase.
      </p>

      <h2>4. Your content</h2>
      <p>
        You keep ownership of the photos and other content you add. The App stores
        them on your device. You grant us a limited license to process an image
        only when you use "Enhance image", solely to deliver that feature to you
        (see the Privacy Policy). You are responsible for your content and promise
        that you have the rights to it and that it does not infringe others'
        rights or break the law. Do not submit images of other people, faces,
        documents, or unlawful, explicit or harmful material to the enhancement
        feature. AI-enhanced images are generated automatically and may contain
        inaccuracies, such as altered details, shapes, patterns or colors, so
        check them before relying on them.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>reverse engineer, decompile or copy the App or its server, except where the law allows;</li>
        <li>bypass, automate or abuse the purchase checks, device checks or enhancement quotas;</li>
        <li>overload or attack our servers, or use the App to build a competing dataset or service;</li>
        <li>use the App unlawfully or in a way that harms others.</li>
      </ul>
      <p>We may limit or end access to the server-based feature if these rules are broken.</p>

      <h2>6. Free plan, ads and Premium</h2>
      <p>
        The free plan includes a limited number of closet items and outfit
        suggestions and is supported by ads. Premium removes these limits and the
        ads, and raises the AI image enhancement quota (currently 50 images a
        month, which may change). Features and limits may be adjusted over time.
      </p>
      <p>
        <strong>Ads.</strong> On the free plan the App shows third-party ads
        served by Google AdMob: banner and native ads, occasional full-screen ads
        after you save or delete an item, and optional rewarded video ads. Watching
        a rewarded ad unlocks extra Wada Lab suggestions for the current session
        only. We do not control or endorse advertisers' content or products, and
        we are not responsible for what advertisers offer or for your dealings with
        them. Do not click ads fraudulently or use tools to generate artificial
        impressions or clicks. Ad data practices are described in the
        <a href="/wada-closet-privacy">Privacy Policy</a>. Purchasing Premium
        removes ads.
      </p>
      <ul>
        <li><strong>Plans:</strong> weekly subscription, monthly subscription, and a one-time lifetime purchase. Prices and any free trial are shown in the App before you buy and in your local currency.</li>
        <li><strong>Payment:</strong> charged to your Apple Account at confirmation of purchase.</li>
        <li><strong>Auto-renewal:</strong> subscriptions renew automatically at the same price for the same period unless you cancel at least 24 hours before the end of the current period. Your account is charged for renewal within 24 hours before the period ends.</li>
        <li><strong>Manage or cancel:</strong> in Settings &gt; your name &gt; Subscriptions on your device. Deleting the App does not cancel a subscription. Canceling stops the next renewal; you keep Premium until the paid period ends.</li>
        <li><strong>Free trial:</strong> if a trial is offered, any unused part is forfeited when you buy a subscription, and it converts to a paid subscription unless canceled in time.</li>
        <li><strong>Lifetime purchase:</strong> a one-time payment that unlocks Premium for as long as the App is offered to you. It is not a subscription and is not tied to a particular device; you can restore it with "Restore Purchases" using the same Apple Account.</li>
        <li><strong>Refunds:</strong> payments and refunds are handled by Apple. Request a refund at <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>. This does not affect any statutory right of withdrawal you may have as a consumer.</li>
      </ul>

      <h2>7. Intellectual property and third-party materials</h2>
      <p>
        The App, its design, code, text and branding belong to us and are
        protected by law. The Sanzo Wada color data comes from a public
        third-party source and from the historical work <em>A Dictionary of Color
        Combinations</em>; Wada Closet is not affiliated with or endorsed by any
        of its authors, publishers or hosts. Weather data is provided by Apple Weather and
        may be inaccurate or delayed. Apple, App Store and iPhone are trademarks of
        Apple Inc., Google and AdMob are trademarks of Google LLC, and Cloudflare
        is a trademark of Cloudflare, Inc.;
        they are used only to identify the services we use.
      </p>

      <h2>8. Availability and changes</h2>
      <p>
        We try to keep the App working, but we do not promise uninterrupted or
        error-free service. The server-based feature depends on third-party
        infrastructure and may be unavailable at times. We may update, change or
        discontinue features, and these Terms, from time to time. Continued use
        after an update means you accept the new Terms. If a change is material
        we will say so in the App or its listing.
      </p>

      <h2>9. Disclaimer of warranties</h2>
      <p>
        To the maximum extent permitted by law, the App is provided "as is" and
        "as available", without warranties of any kind, including fitness for a
        particular purpose and accuracy of colors, matches or AI output. Nothing
        here excludes warranties that cannot be excluded under mandatory
        consumer law.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for indirect,
        incidental, special or consequential damages, loss of data, or loss of
        profit arising from your use of the App. Where liability cannot be
        excluded, it is limited to the amount you paid for the App in the 12 months
        before the claim. This does not limit liability for intent, gross
        negligence, death or personal injury, or any liability that cannot be
        limited under mandatory law. Because your closet is stored only on your
        device, back up your device or use the App's backup export; we cannot restore lost data.
      </p>

      <h2>11. Termination</h2>
      <p>
        You can stop using the App at any time by deleting it. We may suspend or
        end your access if you seriously breach these Terms. Sections that by
        their nature should continue (such as intellectual property, disclaimers
        and liability) survive termination.
      </p>

      <h2>12. Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws of the Republic of Türkiye, without
        affecting mandatory consumer protections of the country where you live.
        If you are a consumer in Türkiye, you may apply to the Consumer Arbitration
        Committee or Consumer Court within the limits set by law. If you are a
        consumer in the EU/UK, you may also bring a claim in the courts of your
        country of residence. Otherwise, the courts and enforcement offices of
        Istanbul have jurisdiction.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions, complaints or legal notices:<br />
        <strong>Email:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a><br />
        See also our <a href="/wada-closet-privacy">Privacy Policy</a>.
      </p>
`;

const turkishContent = `
      <p><strong>Son Güncelleme:</strong> 12 Kasım 2026<br />
      <strong>Geliştirici:</strong> İbrahim Atmaca (bireysel geliştirici, Türkiye)<br />
      <strong>İletişim:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a></p>

      <p>
        Bu Kullanım Koşulları ("Koşullar"), Wada Closet'i ("Uygulama")
        kullanımınızı düzenler. Uygulamayı indirerek veya kullanarak bu Koşulları
        kabul etmiş olursunuz. Kabul etmiyorsanız Uygulamayı kullanmayın. Bu
        Koşullardaki hiçbir hüküm, ülkenizin mevzuatından doğan emredici tüketici
        haklarınızı sınırlamaz.
      </p>

      <h2>1. Lisans ve Apple koşulları</h2>
      <p>
        Size, sahip olduğunuz veya kontrol ettiğiniz Apple cihazlarında Uygulamayı
        kullanmanız için kişisel, münhasır olmayan, devredilemez ve geri alınabilir
        bir lisans veriyoruz. Apple Medya Hizmetleri Koşulları ve
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">Apple Standart Son Kullanıcı Lisans Sözleşmesi (EULA)</a>
        de ayrıca geçerlidir. Bu Koşullar sizinle bizim aramızdadır, Apple'ı
        bağlamaz. Apple'ın Uygulama için bakım veya destek yükümlülüğü yoktur ve
        Uygulamayla ilgili taleplerden sorumlu değildir. Uygulama geçerli bir
        garantiye uymazsa, varsa satın alma bedelinin iadesi için Apple'a bildirimde
        bulunabilirsiniz; Apple'ın Uygulama için başka bir garanti yükümlülüğü yoktur.
        Apple ve bağlı şirketleri bu Koşulların üçüncü taraf lehtarlarıdır ve bunları
        size karşı ileri sürebilir. Ürün sorumluluğu, mevzuata uyum veya fikri mülkiyet
        gibi üçüncü taraf talepleri Apple'ın değil bizim sorumluluğumuzdadır. ABD
        hükümetinin ambargo uyguladığı bir ülkede bulunmadığınızı ve ABD'nin yasaklı
        veya kısıtlı taraflar listesinde yer almadığınızı beyan edersiniz. Uygulamayla birlikte kullandığınız
        üçüncü taraf hizmetlerin (Google AdMob ve mobil veri sağlayıcınız gibi)
        geçerli koşullarına da uymanız gerekir.
      </p>

      <h2>2. Uygulama ne yapar?</h2>
      <p>
        Wada Closet; kıyafetlerinizi fotoğraflamanıza, dijital gardırop
        oluşturmanıza, her parçayı Sanzo Wada renk paletiyle eşleştirmenize, renk
        uyumuna göre kombin önerileri almanıza, kombinleri görsel veya PDF olarak
        dışa aktarmanıza hava durumuna göre kombin fikri almanıza, gardırobunuzu yedekleyip geri yüklemenize ve giysi görsellerini yapay zekayla
        iyileştirmenize olanak tanır. Kombin önerileri yalnızca yaratıcı ilham
        amaçlıdır. Fotoğraflardan algılanan renkler ışığa, kameraya ve ekrana bağlıdır
        ve gerçek üründen farklı olabilir. Herhangi bir önerinin size, vücudunuza,
        bir davete veya kıyafet kuralına uygun olacağını garanti etmeyiz.
      </p>

      <h2>3. Uygunluk</h2>
      <p>
        En az 13 yaşında olmalısınız veya bu tür hizmetleri kullanmak için ülkenizde
        gereken asgari yaşta olmalısınız. Reşit değilseniz, bu Koşulları ebeveyniniz
        veya vasiniz kabul etmeli ve her satın alımı onaylamalıdır.
      </p>

      <h2>4. İçeriğiniz</h2>
      <p>
        Eklediğiniz fotoğrafların ve diğer içeriklerin sahibi sizsiniz. Uygulama bunları
        cihazınızda saklar. Yalnızca "Görseli iyileştir"i kullandığınızda, sadece bu
        özelliği size sunmak amacıyla, bir görseli işlemek için bize sınırlı bir
        lisans verirsiniz (bkz. Gizlilik Politikası). İçeriğinizden siz sorumlusunuz;
        içerik üzerinde hakkınız olduğunu, başkalarının haklarını ihlal etmediğini ve
        yasalara aykırı olmadığını taahhüt edersiniz. İyileştirme özelliğine başka
        kişilerin görsellerini, yüz, belge veya hukuka aykırı, müstehcen ya da zararlı
        içerik yüklemeyin. Yapay zekayla iyileştirilen görseller otomatik üretilir;
        detay, şekil, desen veya renklerde değişiklik gibi hatalar içerebilir, bu
        nedenle güvenmeden önce kontrol edin.
      </p>

      <h2>5. Kabul edilebilir kullanım</h2>
      <p>Aşağıdakileri yapmamayı kabul edersiniz:</p>
      <ul>
        <li>yasanın izin verdiği haller dışında Uygulamayı veya sunucusunu tersine mühendislikle çözmek, ayrıştırmak veya kopyalamak;</li>
        <li>satın alma kontrollerini, cihaz doğrulamasını veya iyileştirme haklarını aşmak, otomatikleştirmek veya kötüye kullanmak;</li>
        <li>sunucularımıza aşırı yük bindirmek veya saldırmak, Uygulamayı rakip bir veri seti ya da hizmet oluşturmak için kullanmak;</li>
        <li>Uygulamayı hukuka aykırı biçimde veya başkalarına zarar verecek şekilde kullanmak.</li>
      </ul>
      <p>Bu kurallar ihlal edilirse sunucu tabanlı özelliğe erişimi sınırlayabilir veya sona erdirebiliriz.</p>

      <h2>6. Ücretsiz plan, reklamlar ve Premium</h2>
      <p>
        Ücretsiz plan, sınırlı sayıda gardırop parçası ve kombin önerisi içerir
        ve reklamlarla desteklenir. Premium bu sınırları ve reklamları kaldırır,
        yapay zeka görsel iyileştirme hakkını artırır (şu an ayda 50 görsel;
        değişebilir). Özellikler ve sınırlar zamanla değiştirilebilir.
      </p>
      <p>
        <strong>Reklamlar.</strong> Ücretsiz planda Uygulama, Google AdMob
        tarafından sunulan üçüncü taraf reklamlar gösterir: banner ve yerel
        reklamlar, bir parçayı kaydedip sildikten sonra ara sıra tam ekran reklamlar
        ve isteğe bağlı ödüllü video reklamlar. Ödüllü reklam izlemek yalnızca o
        oturum için ek Wada Lab önerilerini açar. Reklam verenlerin içeriğini veya
        ürünlerini kontrol etmez, onaylamayız; reklam verenlerin sunduklarından ve
        onlarla ilişkilerinizden sorumlu değiliz. Reklamlara hileli tıklamayın veya
        yapay gösterim ya da tıklama üreten araçlar kullanmayın. Reklam veri
        uygulamaları <a href="/wada-closet-privacy">Gizlilik Politikası</a>'nda
        açıklanır. Premium satın almak reklamları kaldırır.
      </p>
      <ul>
        <li><strong>Planlar:</strong> haftalık abonelik, aylık abonelik ve tek seferlik ömür boyu satın alma. Fiyatlar ve varsa ücretsiz deneme, satın almadan önce Uygulamada yerel para biriminizle gösterilir.</li>
        <li><strong>Ödeme:</strong> satın alma onayında Apple Hesabınızdan tahsil edilir.</li>
        <li><strong>Otomatik yenileme:</strong> abonelikler, geçerli dönemin bitiminden en az 24 saat önce iptal edilmezse aynı fiyat ve süreyle otomatik yenilenir. Yenileme ücreti dönem bitiminden önceki 24 saat içinde tahsil edilir.</li>
        <li><strong>Yönetme veya iptal:</strong> cihazınızda Ayarlar &gt; adınız &gt; Abonelikler bölümünden. Uygulamayı silmek aboneliği iptal etmez. İptal bir sonraki yenilemeyi durdurur; ödenen dönem sonuna kadar Premium'unuz sürer.</li>
        <li><strong>Ücretsiz deneme:</strong> deneme sunulursa, abonelik satın aldığınızda kullanılmayan kısmı geçersiz olur ve zamanında iptal edilmezse ücretli aboneliğe dönüşür.</li>
        <li><strong>Ömür boyu satın alma:</strong> Uygulama size sunulduğu sürece Premium'u açan tek seferlik ödemedir. Abonelik değildir ve belirli bir cihaza bağlı değildir; aynı Apple Hesabıyla "Satın Alımları Geri Yükle" ile geri yükleyebilirsiniz.</li>
        <li><strong>İade:</strong> ödemeler ve iadeler Apple tarafından yürütülür. İade için <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a> adresini kullanın. Bu, tüketici olarak sahip olabileceğiniz yasal cayma hakkınızı etkilemez.</li>
      </ul>

      <h2>7. Fikri mülkiyet ve üçüncü taraf materyaller</h2>
      <p>
        Uygulama, tasarımı, kodu, metinleri ve markası bize aittir ve yasalarla
        korunur. Sanzo Wada renk verileri herkese açık bir üçüncü taraf kaynaktan ve
        <em>A Dictionary of Color Combinations</em> adlı tarihî çalışmadan gelir; Wada
        Closet'in yazarları, yayıncıları veya barındırıcılarıyla bağlantısı ya da
        onayı yoktur. Hava durumu verileri Apple Weather tarafından sağlanır ve hatalı veya
        gecikmeli olabilir. Apple, App Store ve iPhone Apple Inc.'in, Google ve AdMob
        Google LLC'nin, Cloudflare ise Cloudflare, Inc.'in ticari markalarıdır; yalnızca kullandığımız hizmetleri
        belirtmek için anılır.
      </p>

      <h2>8. Erişilebilirlik ve değişiklikler</h2>
      <p>
        Uygulamayı çalışır tutmaya çalışırız ancak kesintisiz veya hatasız hizmet
        vaat etmeyiz. Sunucu tabanlı özellik üçüncü taraf altyapıya bağlıdır ve zaman
        zaman kullanılamayabilir. Özellikleri ve bu Koşulları zaman zaman
        güncelleyebilir, değiştirebilir veya sonlandırabiliriz. Güncellemeden sonra
        kullanmaya devam etmeniz yeni Koşulları kabul ettiğiniz anlamına gelir. Önemli
        bir değişiklik olursa Uygulamada veya mağaza sayfasında belirtiriz.
      </p>

      <h2>9. Garanti reddi</h2>
      <p>
        Yasanın izin verdiği azami ölçüde Uygulama "olduğu gibi" ve "mevcut haliyle",
        belirli bir amaca uygunluk ile renklerin, eşleşmelerin veya yapay zeka
        çıktısının doğruluğu dahil hiçbir garanti verilmeksizin sunulur. Burada yer
        alan hiçbir hüküm, emredici tüketici mevzuatı uyarınca hariç tutulamayacak
        garantileri hariç tutmaz.
      </p>

      <h2>10. Sorumluluğun sınırlandırılması</h2>
      <p>
        Yasanın izin verdiği azami ölçüde, Uygulamayı kullanımınızdan doğan dolaylı,
        arızi, özel veya sonuç olarak ortaya çıkan zararlardan, veri kaybından veya
        kâr kaybından sorumlu değiliz. Sorumluluğun hariç tutulamadığı hallerde
        sorumluluğumuz, talepten önceki 12 ayda Uygulama için ödediğiniz tutarla
        sınırlıdır. Bu sınır; kast, ağır kusur, ölüm veya bedensel zarar ya da emredici
        hukuk uyarınca sınırlandırılamayan sorumluluklar için geçerli değildir.
        Gardırobunuz yalnızca cihazınızda saklandığı için cihazınızı yedekleyin veya Uygulamanın yedek dışa aktarımını kullanın;
        kaybolan verileri geri getiremeyiz.
      </p>

      <h2>11. Fesih</h2>
      <p>
        Uygulamayı silerek kullanmayı istediğiniz zaman bırakabilirsiniz. Bu
        Koşulları ciddi biçimde ihlal ederseniz erişiminizi askıya alabilir veya sona
        erdirebiliriz. Niteliği gereği devam etmesi gereken hükümler (fikri mülkiyet,
        garanti reddi ve sorumluluk gibi) fesihten sonra da geçerlidir.
      </p>

      <h2>12. Uygulanacak hukuk ve uyuşmazlıklar</h2>
      <p>
        Bu Koşullar, yaşadığınız ülkenin emredici tüketici korumalarını etkilemeksizin
        Türkiye Cumhuriyeti hukukuna tabidir. Türkiye'de tüketiciyseniz, kanunda
        belirtilen parasal sınırlar dahilinde Tüketici Hakem Heyeti'ne veya Tüketici
        Mahkemesi'ne başvurabilirsiniz. AB/Birleşik Krallık'ta tüketiciyseniz ayrıca
        yerleşim yerinizin mahkemelerinde dava açabilirsiniz. Bunun dışında İstanbul
        mahkemeleri ve icra daireleri yetkilidir.
      </p>

      <h2>13. İletişim</h2>
      <p>
        Sorular, şikâyetler veya hukuki bildirimler için:<br />
        <strong>E-posta:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a><br />
        Ayrıca <a href="/wada-closet-privacy">Gizlilik Politikamıza</a> bakın.
      </p>
`;

const WadaClosetTerms: React.FC = () => (
  <KidTalesLegalLayout
    englishContent={englishContent}
    turkishContent={turkishContent}
    titleEn="Wada Closet Terms of Use"
    titleTr="Wada Closet Kullanım Koşulları"
  />
);

export default WadaClosetTerms;
