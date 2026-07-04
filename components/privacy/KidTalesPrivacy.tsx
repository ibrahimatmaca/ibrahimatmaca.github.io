import React from 'react';
import KidTalesLegalLayout from './KidTalesLegalLayout';

const englishContent = `
      <h1>KidTales AI – Privacy Policy</h1>
      <p><strong>Last Updated:</strong> July 4, 2026<br />
      <strong>Developer:</strong> İbrahim Atmaca</p>

      <p>
        KidTales AI ("we", "our", "the app") helps parents and guardians create
        personalized stories for children. This policy explains what data we
        process, how we use it, and which third parties may receive it. By using
        the app, you agree to the practices described in this policy.
      </p>

      <h2>Children's Privacy (Kids Category)</h2>
      <p>
        This app is intended to be used by parents and guardians together with
        their children, and is not directed to children for independent use. We
        require a parental gate before external links and in-app purchases, and
        explicit parental consent before any child-related input is shared with
        AI services. We do not knowingly collect personal information directly
        from children without verifiable parental involvement.
      </p>

      <h2>Third-Party AI Services</h2>
      <p>
        We use the following services <strong>only after a parent or guardian
        grants in-app permission</strong> via "Parent Permission for AI Story
        Creation":
      </p>
      <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Data sent</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Google Gemini</strong> (Google LLC)</td>
            <td>Child's name, age, gender, selected theme, language, and story/image prompts</td>
            <td>Generate personalized story text and image prompts</td>
          </tr>
          <tr>
            <td><strong>PiAPI / Qwen Image</strong></td>
            <td>Image prompts derived from the story and child profile</td>
            <td>Generate child-friendly illustrations</td>
          </tr>
        </tbody>
      </table>
      <p>
        Permission is requested before the first AI story. Parents can revoke
        permission in <strong>Profile → AI Data Sharing</strong>.
      </p>

      <h2>Other Third Parties</h2>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Data</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Firebase Authentication</strong> (Google)</td>
            <td>Email, display name, user ID when signing in with Google or Apple</td>
            <td>Account sign-in only</td>
          </tr>
          <tr>
            <td><strong>RevenueCat</strong> / <strong>Apple App Store</strong></td>
            <td>Purchase history, anonymous app user ID</td>
            <td>Subscriptions and in-app purchases</td>
          </tr>
        </tbody>
      </table>

      <h2>What We Do NOT Do</h2>
      <ul>
        <li>We do not use third-party advertising SDKs</li>
        <li>We do not use third-party analytics or usage-tracking services</li>
        <li>We do not use third-party crash or error reporting services</li>
        <li>We do not use remote push notification delivery services</li>
        <li>We do not engage in behavioral advertising or cross-app tracking</li>
        <li>We do not collect the advertising identifier (IDFA) or request App Tracking Transparency (ATT) authorization</li>
      </ul>

      <h2>Local Notifications</h2>
      <p>
        Bedtime reminders use <strong>on-device local notifications</strong> only.
        No personal data is sent to us or to third parties for the purpose of
        delivering these reminders.
      </p>

      <h2>Data Storage and Retention</h2>
      <p>
        Stories and profile preferences are stored locally on your device and are
        removed when you delete them or uninstall the app. AI providers process
        requests only to generate the requested content and retain data according
        to their own policies; refer to
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google's Privacy Policy
        </a>
        and PiAPI's terms for their respective retention practices. We keep
        account and purchase-related data only for as long as necessary to
        provide the service or as required by applicable law.
      </p>

      <h2>Your Rights and Choices</h2>
      <p>
        Depending on your location, you or your child's parent/guardian may have
        the right to access, correct, or request deletion of personal data. You
        can delete stories and profile data within the app at any time, revoke AI
        data-sharing permission in <strong>Profile → AI Data Sharing</strong>, and
        request account deletion by contacting us at the email below. We will
        respond to verified requests as required by applicable law.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        reflected by updating the "Last Updated" date above. Your continued use
        of the app after an update constitutes acceptance of the revised policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: contact the developer via App Store Connect
        support channels or the email below.
        <br />
        <strong>
          Email:
          <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
        </strong>
      </p>
`;

const turkishContent = `
      <h1>KidTales AI – Gizlilik Politikası</h1>
      <p><strong>Son Güncelleme:</strong> 4 Temmuz 2026<br />
      <strong>Geliştirici:</strong> İbrahim Atmaca</p>

      <p>
        KidTales AI ("biz", "uygulamamız", "uygulama"), ebeveynlerin ve
        vasilerin çocukları için kişiselleştirilmiş hikayeler oluşturmasına
        yardımcı olur. Bu politika hangi verileri işlediğimizi, bunları nasıl
        kullandığımızı ve hangi üçüncü tarafların alabileceğini açıklar.
        Uygulamayı kullanarak bu politikada açıklanan uygulamaları kabul etmiş
        olursunuz.
      </p>

      <h2>Çocukların Gizliliği (Kids Category)</h2>
      <p>
        Bu uygulama, ebeveynler ve vasiler tarafından çocuklarıyla birlikte
        kullanılmak üzere tasarlanmıştır ve çocukların bağımsız kullanımına
        yönelik değildir. Harici bağlantılar ve uygulama içi satın almalardan
        önce ebeveyn kapısı; yapay zeka hizmetleriyle çocukla ilgili girdilerin
        paylaşılmasından önce ise açık ebeveyn onayı gerektiririz. Doğrulanabilir
        ebeveyn katılımı olmadan çocuklardan bilerek doğrudan kişisel bilgi
        toplamayız.
      </p>

      <h2>Üçüncü Taraf Yapay Zeka Hizmetleri</h2>
      <p>
        Aşağıdaki hizmetleri yalnızca bir ebeveyn veya vasi
        <strong>"Yapay Zeka Hikaye Oluşturma için Ebeveyn İzni"</strong> ile
        uygulama içi izin verdiğinde kullanırız:
      </p>
      <table>
        <thead>
          <tr>
            <th>Alıcı</th>
            <th>Gönderilen veri</th>
            <th>Amaç</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Google Gemini</strong> (Google LLC)</td>
            <td>Çocuğun adı, yaşı, cinsiyeti, seçilen tema, dil ve hikaye/görsel komutları</td>
            <td>Kişiselleştirilmiş hikaye metni ve görsel komutları üretmek</td>
          </tr>
          <tr>
            <td><strong>PiAPI / Qwen Image</strong></td>
            <td>Hikaye ve çocuk profilinden türetilen görsel komutları</td>
            <td>Çocuk dostu illüstrasyonlar üretmek</td>
          </tr>
        </tbody>
      </table>
      <p>
        İzin, ilk yapay zeka hikayesinden önce istenir. Ebeveynler izni
        <strong>Profil → Yapay Zeka Veri Paylaşımı</strong> bölümünden geri
        alabilir.
      </p>

      <h2>Diğer Üçüncü Taraflar</h2>
      <table>
        <thead>
          <tr>
            <th>Hizmet</th>
            <th>Veri</th>
            <th>Amaç</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Firebase Authentication</strong> (Google)</td>
            <td>Google veya Apple ile oturum açıldığında e-posta, görünen ad, kullanıcı kimliği</td>
            <td>Yalnızca hesap oturumu</td>
          </tr>
          <tr>
            <td><strong>RevenueCat</strong> / <strong>Apple App Store</strong></td>
            <td>Satın alma geçmişi, anonim uygulama kullanıcı kimliği</td>
            <td>Abonelikler ve uygulama içi satın almalar</td>
          </tr>
        </tbody>
      </table>

      <h2>Yapmadığımız Şeyler</h2>
      <ul>
        <li>Üçüncü taraf reklam SDK'ları kullanmıyoruz</li>
        <li>Üçüncü taraf analitik veya kullanım izleme hizmetleri kullanmıyoruz</li>
        <li>Üçüncü taraf çökme veya hata raporlama hizmetleri kullanmıyoruz</li>
        <li>Uzaktan push bildirim iletim hizmetleri kullanmıyoruz</li>
        <li>Davranışsal reklam veya uygulamalar arası izleme yapmıyoruz</li>
        <li>Reklam tanımlayıcısı (IDFA) toplamıyoruz ve App Tracking Transparency (ATT) izni istemiyoruz</li>
      </ul>

      <h2>Yerel Bildirimler</h2>
      <p>
        Yatmadan önce hatırlatıcılar yalnızca <strong>cihaz üzerinde yerel bildirimler</strong>
        ile çalışır. Bu hatırlatıcıların iletimi amacıyla bize veya üçüncü
        taraflara kişisel veri gönderilmez.
      </p>

      <h2>Veri Depolama ve Saklama</h2>
      <p>
        Hikayeler ve profil tercihleri cihazınızda yerel olarak saklanır ve siz
        bunları sildiğinizde veya uygulamayı kaldırdığınızda kaldırılır. Yapay
        zeka sağlayıcıları istekleri yalnızca istenen içeriği üretmek için işler
        ve verileri kendi politikalarına göre saklar; Google için
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google Gizlilik Politikası
        </a>
        ve PiAPI koşulları incelenebilir. Hesap ve satın almayla ilgili verileri
        yalnızca hizmeti sağlamak için gerekli olduğu sürece veya yürürlükteki
        mevzuatın gerektirdiği kadar saklarız.
      </p>

      <h2>Haklarınız ve Tercihleriniz</h2>
      <p>
        Bulunduğunuz yere bağlı olarak siz veya çocuğun ebeveyni/vasisi; kişisel
        verilere erişim, düzeltme veya silinmesini talep etme hakkına sahip
        olabilirsiniz. Hikayeleri ve profil verilerini uygulama içinden istediğiniz
        zaman silebilir, yapay zeka veri paylaşımı iznini
        <strong>Profil → Yapay Zeka Veri Paylaşımı</strong> bölümünden geri
        alabilir ve hesabınızın silinmesini aşağıdaki e-posta üzerinden talep
        edebilirsiniz. Doğrulanmış talepleri yürürlükteki mevzuatın gerektirdiği
        şekilde yanıtlarız.
      </p>

      <h2>Bu Politikadaki Değişiklikler</h2>
      <p>
        Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikler,
        yukarıdaki "Son Güncelleme" tarihi güncellenerek yansıtılır. Bir
        güncellemenin ardından uygulamayı kullanmaya devam etmeniz, güncellenmiş
        politikayı kabul ettiğiniz anlamına gelir.
      </p>

      <h2>İletişim</h2>
      <p>
        Bu politika hakkında sorularınız için geliştiriciyle App Store Connect
        destek kanalları veya aşağıdaki e-posta üzerinden iletişime geçebilirsiniz.
        <br />
        <strong>
          E-posta:
          <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
        </strong>
      </p>
`;

const KidTalesPrivacy: React.FC = () => (
  <KidTalesLegalLayout
    englishContent={englishContent}
    turkishContent={turkishContent}
    titleEn="KidTales AI Privacy Policy"
    titleTr="KidTales AI Gizlilik Politikası"
  />
);

export default KidTalesPrivacy;
