import React from 'react';
import KidTalesLegalLayout from './KidTalesLegalLayout';

const englishContent = `
      <p><strong>Last Updated:</strong> November 12, 2026<br />
      <strong>Developer and data controller:</strong> İbrahim Atmaca (individual developer, Türkiye)<br />
      <strong>Contact:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a></p>

      <p>
        Wada Closet ("the App", "we", "our") is a digital wardrobe app that matches
        your clothes to the color combinations of Sanzo Wada. This policy explains
        what data the App processes, why, and what choices you have. The short
        version: your closet stays on your device. Two things involve outside
        services: the optional "Enhance image" feature (section 4) and, on the
        free plan, ads served by Google AdMob (section 6). Premium removes ads.
      </p>

      <h2>1. Summary</h2>
      <ul>
        <li>We do not run user accounts or a user database. Your closet is stored on your device.</li>
        <li>We do not sell your data. The free plan shows ads from Google AdMob, which may use an advertising identifier to personalize ads if you allow it. You can refuse, and Premium removes ads.</li>
        <li>Photos you take or pick are analyzed on your device. They are sent to a server only if you choose "Enhance image" on an item.</li>
        <li>Weather suggestions use your approximate location only if you allow it.</li>
        <li>Payments are handled entirely by Apple. We never see your payment details.</li>
      </ul>

      <h2>2. Data stored on your device</h2>
      <p>The following is saved locally by the App and is not transmitted to us:</p>
      <ul>
        <li><strong>Closet items:</strong> the photos or cut-outs you add, their detected dominant color, matched Wada color, category and the date added.</li>
        <li><strong>Style profile:</strong> favorite colors, skin tone and undertone, if you choose to enter them. They are used only on your device to rank outfit suggestions.</li>
        <li><strong>Sign-in details:</strong> if you use Sign in with Apple, the name and email address Apple shares with the App are kept on your device to show your profile. If you continue as a guest, nothing is stored.</li>
        <li><strong>Planner data:</strong> saved outfits, the outfits you plan or log for each day, wear statistics, and trip and packing lists. A small snapshot (today's plan and images) is shared with the App's widget through an App Group on your device.</li>
        <li><strong>Preferences:</strong> appearance mode, onboarding progress, weather setting and similar settings, plus counters that limit how often full-screen ads appear.</li>
        <li><strong>Reminders:</strong> if you turn on morning and evening reminders and allow notifications, the App schedules local notifications on your device. They use no server and send no data to us. You can turn them off in the App or in iOS Settings.</li>
        <li><strong>Weather cache:</strong> the last weather result and a rounded location (about 1 km precision, with the city name).</li>
        <li><strong>Backups:</strong> if you export a backup file, it is created on your device and goes only where you save or share it.</li>
      </ul>
      <p>
        Deleting an item, signing out, deleting your profile in the App, or
        uninstalling the App removes this data from your device. Because we do
        not hold a copy, we cannot recover it for you.
      </p>

      <h2>3. Camera and photo library</h2>
      <p>
        The App asks for camera access to photograph your clothes and for photo
        library access so you can pick existing photos. Background removal,
        color detection, category guessing and the "whole outfit from one photo"
        separation all run on your device using Apple's Core ML and Vision
        frameworks. You can withdraw either permission at any time in iOS
        Settings; the App still works, but you cannot add photos.
      </p>

      <h2>4. Enhance image (optional)</h2>
      <p>
        If you tap "Enhance image" on a closet item, the App sends data to a
        server we operate on Cloudflare so that an AI model can produce a cleaner
        product-style picture. This happens only when you start it, and only for
        that item. The data sent is:
      </p>
      <ul>
        <li>the cut-out image of the garment (without your original photo background),</li>
        <li>a hash (fingerprint) of that image, the garment category and its dominant color,</li>
        <li>your App Store transaction identifier (if you have Premium), used to check your plan and to count your usage quota,</li>
        <li>a device-integrity proof from Apple's App Attest service, which contains a random key identifier created for this app on your device. It does not identify you personally.</li>
      </ul>
      <p>
        The image is processed by Cloudflare Workers AI. We do not store the
        cut-out you send; only the enhanced result is kept, so that the same
        garment does not have to be generated twice. It is cached on our Cloudflare
        storage under a name made from the image hash, category and color, and is
        deleted automatically after about 90 days.
      </p>
      <p>
        To limit abuse and cost, our server also keeps a few technical records:
        (a) the public part of your device's App Attest key and a counter, kept
        while the key is in use and removed after about 180 days without use;
        (b) usage counters tied to that key (free plan, per day), to your IP address
        (free plan, per day, at most a few days) and to an account identifier
        derived from your Premium purchase (per month, up to about 40 days); and
        (c) a short-lived (about one hour) record of whether your purchase is
        valid and, if Apple notifies us that a purchase was refunded or revoked,
        that transaction identifier, kept for up to about 400 days so the refund
        stays effective. To verify a purchase, our server sends your transaction identifier
        to Apple's App Store Server API, and Apple may notify our server of
        refunds and revocations. Our own application logs record error types only and do not
        contain your device key, IP address or transaction identifier. Cloudflare
        may keep standard request metadata in its infrastructure logs under its
        own privacy policy. We do not use your images to train AI
        models, do not link them to your name or email address, and do not use
        them for advertising. The App shows a notice before your first
        enhancement, and you can avoid the feature entirely.
      </p>
      <p>
        <strong>Please do not enhance images of other people or images containing
        faces, documents or other sensitive content.</strong> The feature is meant
        for garments.
      </p>

      <h2>5. Weather and location</h2>
      <p>
        If you turn on weather-based outfit suggestions, the App asks for
        location access while you use it. It reads your location once to find
        your city, rounds it to about 1 km, and sends that rounded location to
        Apple WeatherKit to get the local weather. To find the city name, iOS may
        send the coordinates to Apple's geocoding service. It does not track you in the
        background or keep a location history. The App may refresh the weather in
        the background using the rounded location it saved. You can decline or
        turn off location in iOS Settings, and the rest of the App keeps working.
        Weather data is provided by Apple Weather; see
        <a href="https://weatherkit.apple.com/legal-attribution.html" target="_blank" rel="noopener noreferrer">attribution</a>.
      </p>

      <h2>6. Advertising (Google AdMob)</h2>
      <p>
        The free plan shows ads provided by Google AdMob: banner and native
        ads, occasional full-screen ads after you save or delete an item, and
        optional rewarded video ads that unlock extra Wada Lab suggestions for
        the session. <strong>Premium users see no ads.</strong>
      </p>
      <p>
        When ads are shown, Google and its ad partners may collect and use data
        from your device: your IP address, device and OS information, an
        advertising identifier (IDFA) if you allow tracking, and how you interact
        with ads, to deliver, personalize, measure and secure ads and to prevent
        fraud. We do not give Google your photos, closet contents, style
        profile, name or email. Ads are not tailored to the content of your
        closet.
      </p>
      <ul>
        <li><strong>Consent:</strong> where required (for example in the EEA, UK and Switzerland) the App shows Google's consent form (Google User Messaging Platform) before ads load, and ads are requested only if you give the needed choices.</li>
        <li><strong>Tracking permission:</strong> the App asks for Apple's App Tracking Transparency permission. If you decline, you still see ads, but they are not personalized with your advertising identifier. You can change this in iOS Settings &gt; Privacy &amp; Security &gt; Tracking.</li>
        <li><strong>Ad personalization:</strong> you can also manage Google's ad settings at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</li>
        <li><strong>Remove ads:</strong> purchase Premium. Ad-related processing stops once ads are no longer shown.</li>
      </ul>
      <p>
        Google's use of data is described in
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use its services</a>
        and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
        Advertisers' ad content is provided by third parties; we do not control it.
      </p>

      <h2>7. Color palette download</h2>
      <p>
        The App downloads the Sanzo Wada color list from a public third-party
        source (sanzo-wada.dmbk.io) and keeps a copy on your device. That request
        contains no personal data, but the host will see your IP address as with
        any web request. A bundled copy is used if you are offline.
      </p>

      <h2>8. Purchases</h2>
      <p>
        Premium is offered through weekly and monthly subscriptions and a
        one-time lifetime purchase, processed by Apple using StoreKit. Apple
        handles payment, billing and receipts under its own privacy policy. The
        App reads your purchase status from the device to unlock Premium. We do
        not receive your name, card or Apple ID details.
      </p>

      <h2>9. Data categories (App Store privacy label)</h2>
      <table>
        <thead>
          <tr><th>Category</th><th>Collected by us?</th><th>Purpose</th><th>Tracking</th></tr>
        </thead>
        <tbody>
          <tr><td>Photos (cut-out garment image)</td><td>Only if you use "Enhance image"</td><td>App functionality</td><td>No</td></tr>
          <tr><td>Device ID (App Attest key identifier)</td><td>Only if you use "Enhance image"</td><td>App functionality, abuse prevention</td><td>No</td></tr>
          <tr><td>Purchase history (transaction identifier)</td><td>Only if you use "Enhance image"</td><td>App functionality (Premium check, quota)</td><td>No</td></tr>
          <tr><td>Advertising data and product interaction (ad identifier, ad interactions)</td><td>Collected by Google AdMob on the free plan</td><td>Third-party advertising</td><td>Yes, for personalized ads if you allow tracking</td></tr>
          <tr><td>Approximate location</td><td>Rounded location is sent to Apple WeatherKit only if you enable weather suggestions; not stored on our servers</td><td>App functionality</td><td>No</td></tr>
          <tr><td>Contact info (name, email), usage analytics, diagnostics</td><td>No (name and email from Sign in with Apple stay on your device)</td><td>-</td><td>No</td></tr>
        </tbody>
      </table>

      <h2>10. Sharing and service providers</h2>
      <p>We share data only with the providers needed to run the features above:</p>
      <ul>
        <li><strong>Google</strong> (AdMob advertising and consent form): <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
        <li><strong>Apple</strong> (App Store, StoreKit, Sign in with Apple, App Attest, WeatherKit): <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
        <li><strong>Cloudflare</strong> (Workers, Workers AI, storage for "Enhance image"): <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
        <li><strong>sanzo-wada.dmbk.io</strong> (public color list)</li>
      </ul>
      <p>
        We may also disclose information if the law requires it. Exports you
        create (image or PDF) leave the App only when you choose to share them.
      </p>

      <h2>11. Retention and deletion</h2>
      <p>
        On-device data stays until you delete it or uninstall the App. Server
        data created by "Enhance image" is limited to the cached enhanced image
        (about 90 days) and the technical records described in section 4 (from a
        few days up to about 400 days). You can ask us to delete server data
        related to you by email; since it is keyed to hashes and random
        identifiers, please include the approximate date of use so we can try to
        locate it.
      </p>

      <h2>12. Security</h2>
      <p>
        Data is encrypted in transit with HTTPS. Requests to our server are
        signed with Apple App Attest, and the App contains no API secrets. No
        method of transmission or storage is completely secure, so we cannot
        guarantee absolute security.
      </p>

      <h2>13. Children</h2>
      <p>
        The App is not directed to children under 13, and we do not knowingly
        collect personal information from them or knowingly show them
        personalized ads. If you believe a child has sent
        us data, contact us and we will delete it.
      </p>

      <h2>14. Your rights</h2>
      <p>
        Depending on where you live (for example under the EU/UK GDPR, the
        Turkish Personal Data Protection Law No. 6698 (KVKK), or the California
        CCPA), you may have the right to know what we hold about you, to request
        access, correction, deletion or restriction, to object to processing, and
        to withdraw consent at any time (for example by changing the Tracking permission in iOS Settings), and to complain to your data protection authority. For data held by Google, use Google's own tools. To use these rights with us, email
        us. We may need to verify your request. Our legal bases are performance of
        the service you request (GDPR Art. 6(1)(b)), our legitimate interest in
        preventing abuse (Art. 6(1)(f)) and, where applicable, your consent. If
        you are in the EU/UK, we may transfer data outside your region (for
        example through Cloudflare) under appropriate safeguards such as standard
        contractual clauses. California residents: we do not sell personal
        information for money; ad personalization through AdMob may count as
        "sharing" for cross-context advertising, which you can stop by declining
        tracking.
      </p>

      <h2>15. Changes</h2>
      <p>
        We may update this policy. The "Last Updated" date above shows the latest
        version. Material changes will also be reflected in the App or its App
        Store listing where required.
      </p>

      <h2>16. Contact</h2>
      <p>
        İbrahim Atmaca<br />
        <strong>Email:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
      </p>
`;

const turkishContent = `
      <p><strong>Son Güncelleme:</strong> 12 Kasım 2026<br />
      <strong>Geliştirici ve veri sorumlusu:</strong> İbrahim Atmaca (bireysel geliştirici, Türkiye)<br />
      <strong>İletişim:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a></p>

      <p>
        Wada Closet ("Uygulama", "biz"), kıyafetlerinizi Sanzo Wada'nın renk
        kombinasyonlarıyla eşleştiren bir dijital gardırop uygulamasıdır. Bu
        politika, Uygulamanın hangi verileri neden işlediğini ve elinizdeki
        seçenekleri açıklar. Kısaca: gardırobunuz cihazınızda kalır. İki konuda dış hizmetler
        devreye girer: isteğe bağlı "Görseli iyileştir" özelliği (4. bölüm) ve
        ücretsiz planda Google AdMob reklamları (6. bölüm). Premium reklamları kaldırır.
      </p>

      <h2>1. Özet</h2>
      <ul>
        <li>Kullanıcı hesabı veya kullanıcı veritabanı işletmiyoruz. Gardırobunuz cihazınızda saklanır.</li>
        <li>Verilerinizi satmayız. Ücretsiz plan, izin verirseniz reklamları kişiselleştirmek için reklam kimliği kullanabilen Google AdMob reklamları gösterir. Reddedebilirsiniz ve Premium reklamları kaldırır.</li>
        <li>Çektiğiniz veya seçtiğiniz fotoğraflar cihazınızda analiz edilir. Yalnızca bir parçada "Görseli iyileştir"i seçerseniz sunucuya gönderilir.</li>
        <li>Hava durumu önerileri, yalnızca izin verirseniz yaklaşık konumunuzu kullanır.</li>
        <li>Ödemeleri tamamen Apple yönetir. Ödeme bilgilerinizi görmeyiz.</li>
      </ul>

      <h2>2. Cihazınızda saklanan veriler</h2>
      <p>Aşağıdakiler Uygulama tarafından yerel olarak saklanır ve bize iletilmez:</p>
      <ul>
        <li><strong>Gardırop parçaları:</strong> eklediğiniz fotoğraf veya kesitler, bulunan baskın renk, eşleşen Wada rengi, kategori ve eklenme tarihi.</li>
        <li><strong>Stil profili:</strong> girmeyi seçerseniz sevdiğiniz renkler, ten tonu ve alt ton. Yalnızca cihazınızda kombin önerilerini sıralamak için kullanılır.</li>
        <li><strong>Giriş bilgileri:</strong> Apple ile giriş yaparsanız Apple'ın Uygulamayla paylaştığı ad ve e-posta, profilinizi göstermek için cihazınızda tutulur. Misafir olarak devam ederseniz hiçbir şey saklanmaz.</li>
        <li><strong>Planlayıcı verileri:</strong> kayıtlı kombinler, günlere planladığınız veya kaydettiğiniz kombinler, giyim istatistikleri ile seyahat ve bavul listeleri. Bugünün planı ve görselleri içeren küçük bir özet, cihazınızdaki bir App Group üzerinden Uygulamanın widget'ıyla paylaşılır.</li>
        <li><strong>Tercihler:</strong> görünüm modu, karşılama ilerlemesi, hava durumu ayarı ve benzeri ayarlar ile tam ekran reklamların ne sıklıkla gösterileceğini sınırlayan sayaçlar.</li>
        <li><strong>Hatırlatmalar:</strong> sabah ve akşam hatırlatmalarını açar ve bildirim izni verirseniz Uygulama cihazınızda yerel bildirimler planlar. Sunucu kullanmaz ve bize veri göndermez. Bunları Uygulamadan veya iOS Ayarları'ndan kapatabilirsiniz.</li>
        <li><strong>Hava durumu önbelleği:</strong> son hava durumu sonucu ve yuvarlanmış konum (yaklaşık 1 km hassasiyet, şehir adıyla).</li>
        <li><strong>Yedekler:</strong> yedek dosyası dışa aktarırsanız cihazınızda oluşturulur ve yalnızca sizin kaydettiğiniz veya paylaştığınız yere gider.</li>
      </ul>
      <p>
        Bir parçayı silmek, oturumu kapatmak, Uygulama içinde profilinizi silmek
        veya Uygulamayı kaldırmak bu verileri cihazınızdan siler. Bir kopyasını
        tutmadığımız için bu verileri sizin için geri getiremeyiz.
      </p>

      <h2>3. Kamera ve fotoğraf arşivi</h2>
      <p>
        Uygulama, kıyafetlerinizi çekmek için kamera erişimi, mevcut fotoğrafları
        seçebilmeniz için fotoğraf arşivi erişimi ister. Arka plan kaldırma, renk
        bulma, kategori tahmini ve "tek fotoğraftan tüm kombin" ayrıştırması
        cihazınızda, Apple'ın Core ML ve Vision çerçeveleriyle çalışır. İki izni
        de iOS Ayarları'ndan istediğiniz zaman geri alabilirsiniz; Uygulama
        çalışmaya devam eder ancak fotoğraf ekleyemezsiniz.
      </p>

      <h2>4. Görseli iyileştir (isteğe bağlı)</h2>
      <p>
        Bir gardırop parçasında "Görseli iyileştir"e dokunursanız Uygulama,
        yapay zeka modelinin daha temiz bir ürün görseli üretebilmesi için
        Cloudflare üzerinde işlettiğimiz bir sunucuya veri gönderir. Bu yalnızca
        siz başlattığınızda ve yalnızca o parça için olur. Gönderilen veriler:
      </p>
      <ul>
        <li>parçanın kesit görseli (orijinal fotoğrafınızın arka planı olmadan),</li>
        <li>görselin özeti (hash), parça kategorisi ve baskın rengi,</li>
        <li>planınızı doğrulamak ve kullanım hakkınızı saymak için kullanılan App Store işlem kimliğiniz (Premium'unuz varsa),</li>
        <li>Apple'ın App Attest hizmetinden cihaz bütünlüğü kanıtı. Bu kanıt, bu uygulama için cihazınızda üretilen rastgele bir anahtar kimliği içerir ve sizi kişisel olarak tanımlamaz.</li>
      </ul>
      <p>
        Görsel Cloudflare Workers AI ile işlenir. Gönderdiğiniz kesiti saklamayız;
        yalnızca iyileştirilmiş sonuç, aynı parça iki kez üretilmesin diye tutulur.
        Bu sonuç, görselin özeti, kategorisi ve renginden oluşan bir adla Cloudflare
        depolamamızda önbelleğe alınır ve yaklaşık 90 gün sonra otomatik silinir.
      </p>
      <p>
        Kötüye kullanımı ve maliyeti sınırlamak için sunucumuz bazı teknik kayıtlar da
        tutar: (a) cihazınızın App Attest anahtarının genel kısmı ve bir sayaç;
        anahtar kullanıldığı sürece saklanır, yaklaşık 180 gün kullanılmazsa silinir;
        (b) bu anahtara bağlı (ücretsiz plan, günlük), IP adresinize bağlı (ücretsiz
        plan, günlük, en çok birkaç gün) ve Premium satın alımınızdan türetilen bir
        hesap tanımlayıcısına bağlı (aylık, yaklaşık 40 güne kadar) kullanım sayaçları;
        (c) satın alımınızın geçerli olup olmadığına dair kısa süreli (yaklaşık bir
        saat) kayıt ve Apple bir satın alımın iade edildiğini veya iptal edildiğini
        bildirirse, iadenin geçerli kalması için yaklaşık 400 güne kadar saklanan
        o işlem kimliği. Satın alımı doğrulamak için sunucumuz işlem kimliğinizi Apple'ın
        App Store Server API'sine gönderir; Apple iade ve iptalleri sunucumuza
        bildirebilir. Kendi uygulama günlüklerimiz yalnızca hata türlerini kaydeder; cihaz
        anahtarınızı, IP adresinizi veya işlem kimliğinizi içermez. Cloudflare,
        kendi gizlilik politikası kapsamında altyapı günlüklerinde standart istek
        meta verilerini tutabilir. Görsellerinizi yapay
        zeka modeli eğitmek için kullanmaz, adınız veya e-postanızla ilişkilendirmez
        ve reklam için kullanmayız. Uygulama ilk iyileştirmeden önce bir bilgilendirme
        gösterir ve bu özelliği hiç kullanmayabilirsiniz.
      </p>
      <p>
        <strong>Lütfen başka kişilerin görsellerini veya yüz, belge ya da diğer
        hassas içerik barındıran görselleri iyileştirmeyin.</strong> Özellik
        kıyafetler içindir.
      </p>

      <h2>5. Hava durumu ve konum</h2>
      <p>
        Hava durumuna göre kombin önerilerini açarsanız Uygulama, kullandığınız
        sırada konum erişimi ister. Konumunuzu şehrinizi bulmak için bir kez okur,
        yaklaşık 1 km hassasiyete yuvarlar ve yerel hava durumunu almak için bu
        yuvarlanmış konumu Apple WeatherKit'e gönderir. Şehir adını bulmak için iOS,
        koordinatları Apple'ın coğrafi kodlama hizmetine gönderebilir. Arka planda sizi izlemez ve
        konum geçmişi tutmaz. Uygulama, kaydettiği yuvarlanmış konumla hava
        durumunu arka planda yenileyebilir. Konum iznini reddedebilir veya iOS
        Ayarları'ndan kapatabilirsiniz; Uygulamanın geri kalanı çalışmaya devam
        eder. Hava durumu verileri Apple Weather tarafından sağlanır; bkz.
        <a href="https://weatherkit.apple.com/legal-attribution.html" target="_blank" rel="noopener noreferrer">atıflar</a>.
      </p>

      <h2>6. Reklamlar (Google AdMob)</h2>
      <p>
        Ücretsiz plan, Google AdMob tarafından sağlanan reklamlar gösterir: banner
        ve yerel reklamlar, bir parçayı kaydedip sildikten sonra ara sıra tam ekran
        reklamlar ve oturum boyunca ek Wada Lab önerilerini açan isteğe bağlı
        ödüllü video reklamlar. <strong>Premium kullanıcılar reklam görmez.</strong>
      </p>
      <p>
        Reklam gösterilirken Google ve reklam ortakları cihazınızdan veri toplayıp
        kullanabilir: IP adresiniz, cihaz ve işletim sistemi bilgisi, izin verirseniz
        reklam kimliği (IDFA) ve reklamlarla etkileşiminiz. Bunlar reklamları
        sunmak, kişiselleştirmek, ölçmek, güvenliğini sağlamak ve sahteciliği
        önlemek içindir. Google'a fotoğraflarınızı, gardırop içeriğinizi, stil
        profilinizi, adınızı veya e-postanızı vermeyiz. Reklamlar gardırobunuzun
        içeriğine göre hazırlanmaz.
      </p>
      <ul>
        <li><strong>Onay:</strong> gerekli yerlerde (örneğin AEA, Birleşik Krallık ve İsviçre) Uygulama, reklamlar yüklenmeden önce Google'ın onay formunu (Google User Messaging Platform) gösterir; reklamlar yalnızca gerekli tercihleri yaptığınızda istenir.</li>
        <li><strong>İzleme izni:</strong> Uygulama Apple'ın Uygulama İzleme Şeffaflığı iznini ister. Reddederseniz yine reklam görürsünüz, ancak reklam kimliğinizle kişiselleştirilmez. Bunu iOS Ayarları &gt; Gizlilik ve Güvenlik &gt; İzleme bölümünden değiştirebilirsiniz.</li>
        <li><strong>Reklam kişiselleştirme:</strong> Google'ın reklam ayarlarını <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a> adresinden de yönetebilirsiniz.</li>
        <li><strong>Reklamları kaldırma:</strong> Premium satın alın. Reklam gösterilmediğinde reklamla ilgili işleme de durur.</li>
      </ul>
      <p>
        Google'ın veri kullanımı
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google'ın hizmetlerini kullanan sitelerden veya uygulamalardan elde edilen bilgileri nasıl kullandığı</a>
        sayfasında ve <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Gizlilik Politikası</a>'nda açıklanır.
        Reklam içeriği üçüncü taraf reklam verenlerden gelir; bunu biz kontrol etmeyiz.
      </p>

      <h2>7. Renk paleti indirme</h2>
      <p>
        Uygulama, Sanzo Wada renk listesini herkese açık bir üçüncü taraf
        kaynaktan (sanzo-wada.dmbk.io) indirir ve bir kopyasını cihazınızda tutur.
        Bu istek kişisel veri içermez, ancak her web isteğinde olduğu gibi
        sunucu IP adresinizi görür. Çevrimdışıyken Uygulamayla gelen kopya kullanılır.
      </p>

      <h2>8. Satın alımlar</h2>
      <p>
        Premium, haftalık ve aylık abonelikler ile tek seferlik ömür boyu satın
        alma olarak sunulur ve Apple tarafından StoreKit ile işlenir. Ödeme,
        faturalandırma ve makbuzları Apple kendi gizlilik politikası kapsamında
        yönetir. Uygulama, Premium'u açmak için satın alma durumunuzu cihazdan okur.
        Adınızı, kart veya Apple Kimliği bilgilerinizi almayız.
      </p>

      <h2>9. Veri kategorileri (App Store gizlilik etiketi)</h2>
      <table>
        <thead>
          <tr><th>Kategori</th><th>Bizim tarafımızdan toplanıyor mu?</th><th>Amaç</th><th>İzleme</th></tr>
        </thead>
        <tbody>
          <tr><td>Fotoğraflar (parça kesit görseli)</td><td>Yalnızca "Görseli iyileştir" kullanılırsa</td><td>Uygulama işlevselliği</td><td>Hayır</td></tr>
          <tr><td>Cihaz kimliği (App Attest anahtar kimliği)</td><td>Yalnızca "Görseli iyileştir" kullanılırsa</td><td>Uygulama işlevselliği, kötüye kullanımı önleme</td><td>Hayır</td></tr>
          <tr><td>Satın alma geçmişi (işlem kimliği)</td><td>Yalnızca "Görseli iyileştir" kullanılırsa</td><td>Uygulama işlevselliği (Premium kontrolü, hak sayımı)</td><td>Hayır</td></tr>
          <tr><td>Reklam verisi ve ürün etkileşimi (reklam kimliği, reklam etkileşimleri)</td><td>Ücretsiz planda Google AdMob tarafından toplanır</td><td>Üçüncü taraf reklamcılık</td><td>Evet, izin verirseniz kişiselleştirilmiş reklamlar için</td></tr>
          <tr><td>Yaklaşık konum</td><td>Yuvarlanmış konum yalnızca hava durumu önerilerini açarsanız Apple WeatherKit'e gönderilir; sunucularımızda saklanmaz</td><td>Uygulama işlevselliği</td><td>Hayır</td></tr>
          <tr><td>İletişim bilgisi (ad, e-posta), kullanım analitiği, tanılama</td><td>Hayır (Apple ile giriş ad ve e-postası cihazınızda kalır)</td><td>-</td><td>Hayır</td></tr>
        </tbody>
      </table>

      <h2>10. Paylaşım ve hizmet sağlayıcılar</h2>
      <p>Verileri yalnızca yukarıdaki özellikleri çalıştırmak için gereken sağlayıcılarla paylaşırız:</p>
      <ul>
        <li><strong>Google</strong> (AdMob reklamları ve onay formu): <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">gizlilik politikası</a></li>
        <li><strong>Apple</strong> (App Store, StoreKit, Apple ile giriş, App Attest, WeatherKit): <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">gizlilik politikası</a></li>
        <li><strong>Cloudflare</strong> ("Görseli iyileştir" için Workers, Workers AI, depolama): <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">gizlilik politikası</a></li>
        <li><strong>sanzo-wada.dmbk.io</strong> (herkese açık renk listesi)</li>
      </ul>
      <p>
        Yasaların gerektirdiği durumlarda bilgi açıklayabiliriz. Oluşturduğunuz
        dışa aktarımlar (görsel veya PDF) yalnızca siz paylaşmayı seçtiğinizde
        Uygulamadan çıkar.
      </p>

      <h2>11. Saklama ve silme</h2>
      <p>
        Cihazdaki veriler siz silene veya Uygulamayı kaldırana kadar kalır.
        "Görseli iyileştir" ile sunucuda oluşan veriler, önbelleğe alınmış iyileştirilmiş görsel
        (yaklaşık 90 gün) ve 4. bölümde anlatılan teknik kayıtlarla (birkaç günden
        yaklaşık 400 güne kadar) sınırlıdır. Size ait sunucu
        verilerinin silinmesini e-posta ile isteyebilirsiniz; veriler özet ve
        rastgele kimliklerle anahtarlandığı için bulabilmemiz adına yaklaşık
        kullanım tarihini belirtin.
      </p>

      <h2>12. Güvenlik</h2>
      <p>
        Veriler aktarım sırasında HTTPS ile şifrelenir. Sunucumuza giden istekler
        Apple App Attest ile imzalanır ve Uygulamada API gizli anahtarı bulunmaz.
        Hiçbir iletim veya saklama yöntemi tamamen güvenli değildir, bu nedenle
        mutlak güvenliği garanti edemeyiz.
      </p>

      <h2>13. Çocuklar</h2>
      <p>
        Uygulama 13 yaşın altındaki çocuklara yönelik değildir ve bu yaştaki
        çocuklardan bilerek kişisel bilgi toplamaz ve onlara bilerek kişiselleştirilmiş reklam göstermeyiz. Bir çocuğun bize veri
        gönderdiğini düşünüyorsanız bizimle iletişime geçin, sileriz.
      </p>

      <h2>14. Haklarınız</h2>
      <p>
        Bulunduğunuz yere göre (örneğin AB/Birleşik Krallık GDPR'ı, 6698 sayılı
        Kişisel Verilerin Korunması Kanunu (KVKK) veya California CCPA kapsamında)
        hakkınızda ne tuttuğumuzu öğrenme; erişim, düzeltme, silme veya kısıtlama
        talep etme; işlemeye itiraz etme, rızanızı istediğiniz zaman geri çekme (örneğin iOS
        Ayarları'ndan İzleme iznini değiştirerek) ve veri koruma otoritenize
        şikâyette bulunma haklarına sahip olabilirsiniz. KVKK madde 11 kapsamındaki
        başvurularınızı e-posta ile iletebilirsiniz. Talebinizi doğrulamamız
        gerekebilir. Hukuki dayanaklarımız, talep ettiğiniz hizmetin sunulması
        (sözleşmenin ifası), kötüye kullanımı önlemedeki meşru menfaatimiz ve
        gerektiğinde açık rızanızdır. AB/Birleşik Krallık'taysanız veriler
        (örneğin Cloudflare üzerinden) standart sözleşme maddeleri gibi uygun
        güvencelerle bölgenizin dışına aktarılabilir. Google'ın elindeki veriler için
        Google'ın kendi araçlarını kullanın. California sakinleri: kişisel bilgileri para
        karşılığında satmayız; AdMob ile reklam kişiselleştirme bağlamlar arası reklamcılık
        için "paylaşım" sayılabilir ve izlemeyi reddederek bunu durdurabilirsiniz.
      </p>

      <h2>15. Değişiklikler</h2>
      <p>
        Bu politikayı güncelleyebiliriz. En güncel sürüm yukarıdaki "Son Güncelleme"
        tarihiyle belirtilir. Önemli değişiklikler gerektiğinde Uygulamada veya
        App Store sayfasında da yansıtılır.
      </p>

      <h2>16. İletişim</h2>
      <p>
        İbrahim Atmaca<br />
        <strong>E-posta:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
      </p>
`;

const WadaClosetPrivacy: React.FC = () => (
  <KidTalesLegalLayout
    englishContent={englishContent}
    turkishContent={turkishContent}
    titleEn="Wada Closet Privacy Policy"
    titleTr="Wada Closet Gizlilik Politikası"
  />
);

export default WadaClosetPrivacy;
