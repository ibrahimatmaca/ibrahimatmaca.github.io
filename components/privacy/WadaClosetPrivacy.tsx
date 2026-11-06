import React from 'react';
import KidTalesLegalLayout from './KidTalesLegalLayout';

const englishContent = `
      <p><strong>Last Updated:</strong> November 6, 2026<br />
      <strong>Developer and data controller:</strong> İbrahim Atmaca (individual developer, Türkiye)<br />
      <strong>Contact:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a></p>

      <p>
        Wada Closet ("the App", "we", "our") is a digital wardrobe app that matches
        your clothes to the color combinations of Sanzo Wada. This policy explains
        what data the App processes, why, and what choices you have. The short
        version: the App has no ads, no analytics and no tracking, and almost
        everything stays on your device. The one exception is the optional
        Premium feature "Enhance image", described in section 4.
      </p>

      <h2>1. Summary</h2>
      <ul>
        <li>We do not run user accounts or a user database. Your closet is stored on your device.</li>
        <li>We do not sell your data, share it for advertising, or track you across other apps and websites.</li>
        <li>Photos you take or pick are analyzed on your device. They are sent to a server only if you choose "Enhance image" on an item.</li>
        <li>Payments are handled entirely by Apple. We never see your payment details.</li>
      </ul>

      <h2>2. Data stored on your device</h2>
      <p>The following is saved locally by the App and is not transmitted to us:</p>
      <ul>
        <li><strong>Closet items:</strong> the photos or cut-outs you add, their detected dominant color, matched Wada color, category and the date added.</li>
        <li><strong>Style profile:</strong> favorite colors, skin tone and undertone, if you choose to enter them. They are used only on your device to rank outfit suggestions.</li>
        <li><strong>Sign-in details:</strong> if you use Sign in with Apple, the name and email address Apple shares with the App are kept on your device to show your profile. If you continue as a guest, nothing is stored.</li>
        <li><strong>Preferences:</strong> appearance mode, onboarding progress and similar settings.</li>
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

      <h2>4. Enhance image (Premium, optional)</h2>
      <p>
        If you tap "Enhance image" on a closet item, the App sends data to a
        server we operate on Cloudflare so that an AI model can produce a cleaner
        product-style picture. This happens only when you start it, and only for
        that item. The data sent is:
      </p>
      <ul>
        <li>the cut-out image of the garment (without your original photo background),</li>
        <li>a hash (fingerprint) of that image, the garment category and its dominant color,</li>
        <li>your App Store transaction identifier, used to check that you have Premium and to count your monthly quota,</li>
        <li>a device-integrity proof from Apple's App Attest service, which contains a random key identifier created for this app on your device. It does not identify you personally.</li>
      </ul>
      <p>
        The image is processed by Cloudflare Workers AI. To avoid paying for the
        same result twice, the enhanced result may be cached on our Cloudflare
        storage, keyed by the image hash. Your IP address is visible to Cloudflare
        as part of any internet request. We do not use your images to train AI
        models, do not link them to your name or email address, and do not use
        them for advertising. The App shows a notice before your first
        enhancement, and you can avoid the feature entirely.
      </p>
      <p>
        <strong>Please do not enhance images of other people or images containing
        faces, documents or other sensitive content.</strong> The feature is meant
        for garments.
      </p>

      <h2>5. Color palette download</h2>
      <p>
        The App downloads the Sanzo Wada color list from a public third-party
        source (sanzo-wada.dmbk.io) and keeps a copy on your device. That request
        contains no personal data, but the host will see your IP address as with
        any web request. A bundled copy is used if you are offline.
      </p>

      <h2>6. Purchases</h2>
      <p>
        Premium is offered through weekly and monthly subscriptions and a
        one-time lifetime purchase, processed by Apple using StoreKit. Apple
        handles payment, billing and receipts under its own privacy policy. The
        App reads your purchase status from the device to unlock Premium. We do
        not receive your name, card or Apple ID details.
      </p>

      <h2>7. Data categories (App Store privacy label)</h2>
      <table>
        <thead>
          <tr><th>Category</th><th>Collected by us?</th><th>Purpose</th><th>Tracking</th></tr>
        </thead>
        <tbody>
          <tr><td>Photos (cut-out garment image)</td><td>Only if you use "Enhance image"</td><td>App functionality</td><td>No</td></tr>
          <tr><td>Device ID (App Attest key identifier)</td><td>Only if you use "Enhance image"</td><td>App functionality, abuse prevention</td><td>No</td></tr>
          <tr><td>Purchase history (transaction identifier)</td><td>Only if you use "Enhance image"</td><td>App functionality (Premium check, quota)</td><td>No</td></tr>
          <tr><td>Contact info, location, usage data, diagnostics, advertising data</td><td>No</td><td>-</td><td>No</td></tr>
        </tbody>
      </table>

      <h2>8. Sharing and service providers</h2>
      <p>We share data only with the providers needed to run the features above:</p>
      <ul>
        <li><strong>Apple</strong> (App Store, StoreKit, Sign in with Apple, App Attest): <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
        <li><strong>Cloudflare</strong> (Workers, Workers AI, storage for "Enhance image"): <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">privacy policy</a></li>
        <li><strong>sanzo-wada.dmbk.io</strong> (public color list)</li>
      </ul>
      <p>
        We may also disclose information if the law requires it. Exports you
        create (image or PDF) leave the App only when you choose to share them.
      </p>

      <h2>9. Retention and deletion</h2>
      <p>
        On-device data stays until you delete it or uninstall the App. Server
        data created by "Enhance image" is limited to the cached result and the
        quota counters described above. You can ask us to delete server data
        related to you by email; since it is keyed to hashes and random
        identifiers, please include the approximate date of use so we can try to
        locate it.
      </p>

      <h2>10. Security</h2>
      <p>
        Data is encrypted in transit with HTTPS. Requests to our server are
        signed with Apple App Attest, and the App contains no API secrets. No
        method of transmission or storage is completely secure, so we cannot
        guarantee absolute security.
      </p>

      <h2>11. Children</h2>
      <p>
        The App is not directed to children under 13, and we do not knowingly
        collect personal information from them. If you believe a child has sent
        us data, contact us and we will delete it.
      </p>

      <h2>12. Your rights</h2>
      <p>
        Depending on where you live (for example under the EU/UK GDPR, the
        Turkish Personal Data Protection Law No. 6698 (KVKK), or the California
        CCPA), you may have the right to know what we hold about you, to request
        access, correction, deletion or restriction, to object to processing, and
        to complain to your data protection authority. To use these rights, email
        us. We may need to verify your request. Our legal bases are performance of
        the service you request (GDPR Art. 6(1)(b)), our legitimate interest in
        preventing abuse (Art. 6(1)(f)) and, where applicable, your consent. If
        you are in the EU/UK, we may transfer data outside your region (for
        example through Cloudflare) under appropriate safeguards such as standard
        contractual clauses.
      </p>

      <h2>13. Changes</h2>
      <p>
        We may update this policy. The "Last Updated" date above shows the latest
        version. Material changes will also be reflected in the App or its App
        Store listing where required.
      </p>

      <h2>14. Contact</h2>
      <p>
        İbrahim Atmaca<br />
        <strong>Email:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
      </p>
`;

const turkishContent = `
      <p><strong>Son Güncelleme:</strong> 6 Kasım 2026<br />
      <strong>Geliştirici ve veri sorumlusu:</strong> İbrahim Atmaca (bireysel geliştirici, Türkiye)<br />
      <strong>İletişim:</strong> <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a></p>

      <p>
        Wada Closet ("Uygulama", "biz"), kıyafetlerinizi Sanzo Wada'nın renk
        kombinasyonlarıyla eşleştiren bir dijital gardırop uygulamasıdır. Bu
        politika, Uygulamanın hangi verileri neden işlediğini ve elinizdeki
        seçenekleri açıklar. Kısaca: Uygulamada reklam, analitik ve izleme yoktur
        ve neredeyse her şey cihazınızda kalır. Tek istisna, 4. bölümde anlatılan
        isteğe bağlı Premium özellik "Görseli iyileştir"dir.
      </p>

      <h2>1. Özet</h2>
      <ul>
        <li>Kullanıcı hesabı veya kullanıcı veritabanı işletmiyoruz. Gardırobunuz cihazınızda saklanır.</li>
        <li>Verilerinizi satmaz, reklam için paylaşmaz ve diğer uygulama ve sitelerde sizi izlemeyiz.</li>
        <li>Çektiğiniz veya seçtiğiniz fotoğraflar cihazınızda analiz edilir. Yalnızca bir parçada "Görseli iyileştir"i seçerseniz sunucuya gönderilir.</li>
        <li>Ödemeleri tamamen Apple yönetir. Ödeme bilgilerinizi görmeyiz.</li>
      </ul>

      <h2>2. Cihazınızda saklanan veriler</h2>
      <p>Aşağıdakiler Uygulama tarafından yerel olarak saklanır ve bize iletilmez:</p>
      <ul>
        <li><strong>Gardırop parçaları:</strong> eklediğiniz fotoğraf veya kesitler, bulunan baskın renk, eşleşen Wada rengi, kategori ve eklenme tarihi.</li>
        <li><strong>Stil profili:</strong> girmeyi seçerseniz sevdiğiniz renkler, ten tonu ve alt ton. Yalnızca cihazınızda kombin önerilerini sıralamak için kullanılır.</li>
        <li><strong>Giriş bilgileri:</strong> Apple ile giriş yaparsanız Apple'ın Uygulamayla paylaştığı ad ve e-posta, profilinizi göstermek için cihazınızda tutulur. Misafir olarak devam ederseniz hiçbir şey saklanmaz.</li>
        <li><strong>Tercihler:</strong> görünüm modu, karşılama ilerlemesi ve benzeri ayarlar.</li>
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

      <h2>4. Görseli iyileştir (Premium, isteğe bağlı)</h2>
      <p>
        Bir gardırop parçasında "Görseli iyileştir"e dokunursanız Uygulama,
        yapay zeka modelinin daha temiz bir ürün görseli üretebilmesi için
        Cloudflare üzerinde işlettiğimiz bir sunucuya veri gönderir. Bu yalnızca
        siz başlattığınızda ve yalnızca o parça için olur. Gönderilen veriler:
      </p>
      <ul>
        <li>parçanın kesit görseli (orijinal fotoğrafınızın arka planı olmadan),</li>
        <li>görselin özeti (hash), parça kategorisi ve baskın rengi,</li>
        <li>Premium'a sahip olduğunuzu doğrulamak ve aylık hakkınızı saymak için kullanılan App Store işlem kimliğiniz,</li>
        <li>Apple'ın App Attest hizmetinden cihaz bütünlüğü kanıtı. Bu kanıt, bu uygulama için cihazınızda üretilen rastgele bir anahtar kimliği içerir ve sizi kişisel olarak tanımlamaz.</li>
      </ul>
      <p>
        Görsel Cloudflare Workers AI ile işlenir. Aynı sonucun iki kez
        üretilmemesi için iyileştirilmiş sonuç, görselin özetiyle anahtarlanarak
        Cloudflare depolamamızda önbelleğe alınabilir. Her internet isteğinde
        olduğu gibi IP adresiniz Cloudflare tarafından görülür. Görsellerinizi yapay
        zeka modeli eğitmek için kullanmaz, adınız veya e-postanızla ilişkilendirmez
        ve reklam için kullanmayız. Uygulama ilk iyileştirmeden önce bir bilgilendirme
        gösterir ve bu özelliği hiç kullanmayabilirsiniz.
      </p>
      <p>
        <strong>Lütfen başka kişilerin görsellerini veya yüz, belge ya da diğer
        hassas içerik barındıran görselleri iyileştirmeyin.</strong> Özellik
        kıyafetler içindir.
      </p>

      <h2>5. Renk paleti indirme</h2>
      <p>
        Uygulama, Sanzo Wada renk listesini herkese açık bir üçüncü taraf
        kaynaktan (sanzo-wada.dmbk.io) indirir ve bir kopyasını cihazınızda tutur.
        Bu istek kişisel veri içermez, ancak her web isteğinde olduğu gibi
        sunucu IP adresinizi görür. Çevrimdışıyken Uygulamayla gelen kopya kullanılır.
      </p>

      <h2>6. Satın alımlar</h2>
      <p>
        Premium, haftalık ve aylık abonelikler ile tek seferlik ömür boyu satın
        alma olarak sunulur ve Apple tarafından StoreKit ile işlenir. Ödeme,
        faturalandırma ve makbuzları Apple kendi gizlilik politikası kapsamında
        yönetir. Uygulama, Premium'u açmak için satın alma durumunuzu cihazdan okur.
        Adınızı, kart veya Apple Kimliği bilgilerinizi almayız.
      </p>

      <h2>7. Veri kategorileri (App Store gizlilik etiketi)</h2>
      <table>
        <thead>
          <tr><th>Kategori</th><th>Bizim tarafımızdan toplanıyor mu?</th><th>Amaç</th><th>İzleme</th></tr>
        </thead>
        <tbody>
          <tr><td>Fotoğraflar (parça kesit görseli)</td><td>Yalnızca "Görseli iyileştir" kullanılırsa</td><td>Uygulama işlevselliği</td><td>Hayır</td></tr>
          <tr><td>Cihaz kimliği (App Attest anahtar kimliği)</td><td>Yalnızca "Görseli iyileştir" kullanılırsa</td><td>Uygulama işlevselliği, kötüye kullanımı önleme</td><td>Hayır</td></tr>
          <tr><td>Satın alma geçmişi (işlem kimliği)</td><td>Yalnızca "Görseli iyileştir" kullanılırsa</td><td>Uygulama işlevselliği (Premium kontrolü, hak sayımı)</td><td>Hayır</td></tr>
          <tr><td>İletişim bilgisi, konum, kullanım verisi, tanılama, reklam verisi</td><td>Hayır</td><td>-</td><td>Hayır</td></tr>
        </tbody>
      </table>

      <h2>8. Paylaşım ve hizmet sağlayıcılar</h2>
      <p>Verileri yalnızca yukarıdaki özellikleri çalıştırmak için gereken sağlayıcılarla paylaşırız:</p>
      <ul>
        <li><strong>Apple</strong> (App Store, StoreKit, Apple ile giriş, App Attest): <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">gizlilik politikası</a></li>
        <li><strong>Cloudflare</strong> ("Görseli iyileştir" için Workers, Workers AI, depolama): <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">gizlilik politikası</a></li>
        <li><strong>sanzo-wada.dmbk.io</strong> (herkese açık renk listesi)</li>
      </ul>
      <p>
        Yasaların gerektirdiği durumlarda bilgi açıklayabiliriz. Oluşturduğunuz
        dışa aktarımlar (görsel veya PDF) yalnızca siz paylaşmayı seçtiğinizde
        Uygulamadan çıkar.
      </p>

      <h2>9. Saklama ve silme</h2>
      <p>
        Cihazdaki veriler siz silene veya Uygulamayı kaldırana kadar kalır.
        "Görseli iyileştir" ile sunucuda oluşan veriler, önbelleğe alınmış sonuç
        ve yukarıda anlatılan hak sayaçlarıyla sınırlıdır. Size ait sunucu
        verilerinin silinmesini e-posta ile isteyebilirsiniz; veriler özet ve
        rastgele kimliklerle anahtarlandığı için bulabilmemiz adına yaklaşık
        kullanım tarihini belirtin.
      </p>

      <h2>10. Güvenlik</h2>
      <p>
        Veriler aktarım sırasında HTTPS ile şifrelenir. Sunucumuza giden istekler
        Apple App Attest ile imzalanır ve Uygulamada API gizli anahtarı bulunmaz.
        Hiçbir iletim veya saklama yöntemi tamamen güvenli değildir, bu nedenle
        mutlak güvenliği garanti edemeyiz.
      </p>

      <h2>11. Çocuklar</h2>
      <p>
        Uygulama 13 yaşın altındaki çocuklara yönelik değildir ve bu yaştaki
        çocuklardan bilerek kişisel bilgi toplamayız. Bir çocuğun bize veri
        gönderdiğini düşünüyorsanız bizimle iletişime geçin, sileriz.
      </p>

      <h2>12. Haklarınız</h2>
      <p>
        Bulunduğunuz yere göre (örneğin AB/Birleşik Krallık GDPR'ı, 6698 sayılı
        Kişisel Verilerin Korunması Kanunu (KVKK) veya California CCPA kapsamında)
        hakkınızda ne tuttuğumuzu öğrenme; erişim, düzeltme, silme veya kısıtlama
        talep etme; işlemeye itiraz etme ve veri koruma otoritenize şikâyette
        bulunma haklarına sahip olabilirsiniz. KVKK madde 11 kapsamındaki
        başvurularınızı e-posta ile iletebilirsiniz. Talebinizi doğrulamamız
        gerekebilir. Hukuki dayanaklarımız, talep ettiğiniz hizmetin sunulması
        (sözleşmenin ifası), kötüye kullanımı önlemedeki meşru menfaatimiz ve
        gerektiğinde açık rızanızdır. AB/Birleşik Krallık'taysanız veriler
        (örneğin Cloudflare üzerinden) standart sözleşme maddeleri gibi uygun
        güvencelerle bölgenizin dışına aktarılabilir.
      </p>

      <h2>13. Değişiklikler</h2>
      <p>
        Bu politikayı güncelleyebiliriz. En güncel sürüm yukarıdaki "Son Güncelleme"
        tarihiyle belirtilir. Önemli değişiklikler gerektiğinde Uygulamada veya
        App Store sayfasında da yansıtılır.
      </p>

      <h2>14. İletişim</h2>
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
