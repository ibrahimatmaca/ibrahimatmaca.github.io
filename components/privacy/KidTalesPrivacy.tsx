import React from 'react';
import KidTalesLegalLayout from './KidTalesLegalLayout';

const englishContent = `
      <h1>KidTales AI – Privacy Policy</h1>
      <p><strong>Last Updated:</strong> June 7, 2026<br />
      <strong>Developer:</strong> İbrahim Atmaca</p>

      <p>
        This Privacy Policy explains, in general terms, how KidTales AI ("we",
        "our", "the App") may collect, use, process, and protect information.
        The App is designed with a privacy-by-default approach and is intended
        to request only the information reasonably necessary to operate the App.
      </p>

      <p>
        This Policy is not intended to limit any non-waivable privacy, consumer,
        or child-protection rights that may apply under the laws of your country
        or region. Where local law gives you additional mandatory rights, those
        rights remain unaffected.
      </p>

      <h2>1. Information We May Process</h2>

      <h3>1.1 Technical and Diagnostic Data</h3>
      <p>
        The App may process limited technical information needed to provide,
        secure, maintain, and improve the App. Depending on device settings,
        operating system behavior, and service provider configuration, this may
        include:
      </p>
      <ul>
        <li>Device type, operating system version, and app version</li>
        <li>Crash reports, diagnostics, performance data, and error logs</li>
        <li>General, non-sensitive app interaction data used for reliability</li>
      </ul>
      <p>
        We do not intentionally request a child's name, email address, phone
        number, precise location, advertising identifier, photos, contacts, or
        similar direct identifiers for the core story-generation experience.
      </p>

      <h3>1.2 Story Prompts and User-Provided Text</h3>
      <p>
        Users may enter story prompts, such as fictional character names,
        themes, objects, or ideas. Users should not submit personal, sensitive,
        confidential, or identifying information about a child or any other
        person.
      </p>
      <p>
        Prompt text may be processed to generate the requested story and to
        operate safety, abuse-prevention, and technical reliability features.
        We do not intend to use prompt text to identify a child.
      </p>

      <h3>1.3 Account Registration</h3>
      <p>
        The App is intended to operate without user account registration. If a
        future version introduces accounts or additional data features, this
        Policy may be updated before or when those features become available.
      </p>

      <h2>2. How Information Is Used</h2>
      <p>Information may be used only as reasonably necessary to:</p>
      <ul>
        <li>Generate AI-assisted fictional stories requested by the user</li>
        <li>Operate, maintain, secure, and troubleshoot the App</li>
        <li>Prevent misuse, unsafe prompts, abuse, fraud, or technical harm</li>
        <li>Comply with applicable legal, platform, or safety obligations</li>
      </ul>

      <h2>3. AI Processing</h2>
      <p>
        Story prompts may be transmitted to AI service infrastructure for the
        limited purpose of producing the requested story and related safety or
        reliability checks. Processing may occur through third-party service
        providers acting under their own technical, security, and legal terms.
      </p>
      <p>
        We aim to minimize prompt data and avoid storing story prompts longer
        than reasonably necessary for the App's operation, security, debugging,
        legal compliance, or provider-side processing requirements. We do not
        sell children's personal information.
      </p>

      <h2>4. Children's Privacy</h2>
      <p>
        KidTales AI is intended to be child-friendly, but it should be used by
        children only with appropriate parent or guardian involvement. Parents
        and guardians are responsible for supervising prompts entered into the
        App and reviewing generated stories before sharing them with children.
      </p>
      <ul>
        <li>No behavioral advertising is intended</li>
        <li>No targeted marketing to children is intended</li>
        <li>No sale of children's personal information is intended</li>
        <li>No public sharing of generated stories is provided by default</li>
      </ul>

      <h2>5. Third-Party Services</h2>
      <p>
        The App may use third-party providers for limited technical purposes,
        such as AI processing, crash reporting, diagnostics, security, hosting,
        purchase verification, or platform services. These providers may process
        data according to their own terms, privacy policies, technical logs, and
        applicable legal requirements.
      </p>
      <p>
        We choose service providers with privacy and security in mind, but we do
        not control every technical process performed by third-party platforms,
        app stores, operating systems, or AI infrastructure providers.
      </p>

      <h2>6. In-App Purchases and Subscriptions</h2>
      <p>
        KidTales AI may offer in-app purchases or subscriptions through Apple's
        StoreKit framework. Payments, refunds, renewals, subscription status,
        billing information, and Apple ID account information are handled by
        Apple under Apple's own terms and privacy policies.
      </p>
      <ul>
        <li>We do not receive or store payment card details.</li>
        <li>
          The App may locally store or verify purchase entitlement status to
          unlock paid features.
        </li>
        <li>
          Purchase restoration and subscription management are handled through
          Apple systems.
        </li>
      </ul>
      <p>
        For more information, please review
        <a href="https://www.apple.com/privacy/" target="_blank" rel="noopener noreferrer">
          Apple's Privacy Policy
        </a>
        and
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">
          Apple's Standard End User License Agreement
        </a>.
      </p>

      <h2>7. Retention</h2>
      <p>
        We aim to keep prompt data only for as long as reasonably necessary to
        provide the requested story, maintain security, resolve technical
        issues, comply with legal obligations, or satisfy service provider
        processing requirements. Diagnostic and crash information may be retained
        for a limited period in aggregated, pseudonymous, or technical form.
      </p>
      <p>
        Retention periods may vary depending on device settings, app store
        systems, legal obligations, and third-party provider configurations.
      </p>

      <h2>8. Parent, Guardian, and User Requests</h2>
      <p>
        Parents, guardians, and users may contact us to ask questions or request
        access, correction, or deletion of information, where such rights apply
        by law and where we can reasonably identify the relevant data.
      </p>
      <p>
        Because the App is intended to operate without accounts, we may not be
        able to locate or verify data that is not linked to an identifiable user
        or device. We may request reasonable information to verify and process a
        request, where permitted by law.
      </p>
      <p>
        Contact:
        <strong>
          <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
        </strong>
      </p>

      <h2>9. Security</h2>
      <p>
        We use reasonable technical and organizational measures intended to
        protect information processed through the App. However, no app, network,
        storage system, or online transmission can be guaranteed to be completely
        secure.
      </p>

      <h2>10. International Processing</h2>
      <p>
        Service providers, app stores, and technical infrastructure may process
        information in countries other than the user's country of residence.
        Where required by applicable law, relevant safeguards or lawful transfer
        mechanisms may apply.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The updated version
        will be posted on this page with the latest update date. Continued use
        of the App after an update means the updated Policy applies, unless
        local law requires a different notice or consent process.
      </p>
      <p>
        The latest version is available at
        <a href="https://ibrahimatmaca.github.io/kidtales-privacy" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-privacy
        </a>.
      </p>

      <h2>12. Contact</h2>
      <p>
        For privacy questions or requests, contact:
        <br />
        <strong>
          Email:
          <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
        </strong>
      </p>
`;

const turkishContent = `
      <h1>KidTales AI – Gizlilik Politikası</h1>
      <p><strong>Son Güncelleme:</strong> 7 Haziran 2026<br />
      <strong>Geliştirici:</strong> İbrahim Atmaca</p>

      <p>
        Bu Gizlilik Politikası, KidTales AI ("biz", "uygulama") tarafından
        bilgilerin genel olarak nasıl toplanabileceğini, kullanılabileceğini,
        işlenebileceğini ve korunabileceğini açıklar. Uygulama, varsayılan
        olarak gizlilik yaklaşımıyla tasarlanmıştır ve yalnızca uygulamanın
        çalışması için makul ölçüde gerekli bilgileri istemeyi amaçlar.
      </p>

      <p>
        Bu Politika, ülkenizde veya bölgenizde geçerli olabilecek feragat
        edilemez gizlilik, tüketici veya çocuk koruma haklarını sınırlama amacı
        taşımaz. Yerel hukuk size ek zorunlu haklar tanıyorsa, bu haklar saklıdır.
      </p>

      <h2>1. İşlenebilecek Bilgiler</h2>

      <h3>1.1 Teknik ve Tanısal Veriler</h3>
      <p>
        Uygulama; hizmeti sunmak, güvenliğini sağlamak, bakımını yapmak ve
        iyileştirmek için sınırlı teknik bilgileri işleyebilir. Cihaz ayarlarına,
        işletim sistemi davranışına ve hizmet sağlayıcı yapılandırmasına bağlı
        olarak bunlar şunları içerebilir:
      </p>
      <ul>
        <li>Cihaz tipi, işletim sistemi sürümü ve uygulama sürümü</li>
        <li>Çökme raporları, tanısal veriler, performans verileri ve hata günlükleri</li>
        <li>Güvenilirlik için kullanılan genel ve hassas olmayan uygulama etkileşim verileri</li>
      </ul>
      <p>
        Temel hikaye üretimi deneyimi için çocuğun adı, e-posta adresi, telefon
        numarası, hassas konumu, reklam kimliği, fotoğrafları, kişileri veya
        benzeri doğrudan tanımlayıcıları bilinçli olarak talep etmeyiz.
      </p>

      <h3>1.2 Hikaye Komutları ve Kullanıcı Metinleri</h3>
      <p>
        Kullanıcılar kurgusal karakter adları, temalar, nesneler veya fikirler
        gibi hikaye komutları girebilir. Kullanıcılar, bir çocuk veya başka bir
        kişi hakkında kişisel, hassas, gizli veya tanımlayıcı bilgi göndermemelidir.
      </p>
      <p>
        Komut metni, istenen hikayeyi üretmek ve güvenlik, kötüye kullanım
        önleme ve teknik güvenilirlik özelliklerini işletmek için işlenebilir.
        Komut metnini bir çocuğu tanımlamak amacıyla kullanmayı amaçlamıyoruz.
      </p>

      <h3>1.3 Hesap Kaydı</h3>
      <p>
        Uygulamanın kullanıcı hesabı olmadan çalışması amaçlanır. Gelecekteki
        bir sürümde hesap veya ek veri özellikleri sunulursa, bu Politika ilgili
        özellikler kullanıma sunulmadan önce veya sunulduğunda güncellenebilir.
      </p>

      <h2>2. Bilgilerin Kullanım Amaçları</h2>
      <p>Bilgiler yalnızca makul ölçüde gerekli olduğu durumlarda şu amaçlarla kullanılabilir:</p>
      <ul>
        <li>Kullanıcı tarafından istenen yapay zeka destekli kurgusal hikayeleri üretmek</li>
        <li>Uygulamayı işletmek, bakımını yapmak, güvenliğini sağlamak ve sorun gidermek</li>
        <li>Kötüye kullanımı, güvensiz komutları, suistimali, dolandırıcılığı veya teknik zararı önlemek</li>
        <li>Geçerli yasal, platform veya güvenlik yükümlülüklerine uymak</li>
      </ul>

      <h2>3. Yapay Zeka İşlemesi</h2>
      <p>
        Hikaye komutları, istenen hikayeyi üretmek ve ilgili güvenlik veya
        güvenilirlik kontrollerini yapmak amacıyla yapay zeka hizmet altyapısına
        iletilebilir. İşleme, kendi teknik, güvenlik ve yasal şartlarına tabi
        üçüncü taraf hizmet sağlayıcılar üzerinden gerçekleşebilir.
      </p>
      <p>
        Komut verisini en aza indirmeyi ve uygulamanın çalışması, güvenliği,
        hata ayıklaması, yasal uyum veya hizmet sağlayıcı tarafındaki işleme
        gereklilikleri için makul ölçüde gerekli olandan daha uzun süre
        saklamamayı amaçlarız. Çocukların kişisel bilgilerini satmayız.
      </p>

      <h2>4. Çocukların Gizliliği</h2>
      <p>
        KidTales AI çocuk dostu olacak şekilde tasarlanmıştır; ancak çocuklar
        tarafından yalnızca uygun ebeveyn veya vasi katılımıyla kullanılmalıdır.
        Ebeveynler ve vasiler, uygulamaya girilen komutları denetlemekten ve
        oluşturulan hikayeleri çocuklarla paylaşmadan önce gözden geçirmekten
        sorumludur.
      </p>
      <ul>
        <li>Davranışsal reklam amaçlanmaz</li>
        <li>Çocuklara yönelik hedefli pazarlama amaçlanmaz</li>
        <li>Çocukların kişisel bilgilerinin satışı amaçlanmaz</li>
        <li>Oluşturulan hikayelerin varsayılan olarak herkese açık paylaşımı sağlanmaz</li>
      </ul>

      <h2>5. Üçüncü Taraf Hizmetleri</h2>
      <p>
        Uygulama; yapay zeka işlemesi, çökme raporlama, tanısal kayıtlar,
        güvenlik, barındırma, satın alma doğrulama veya platform hizmetleri gibi
        sınırlı teknik amaçlarla üçüncü taraf sağlayıcıları kullanabilir. Bu
        sağlayıcılar verileri kendi şartları, gizlilik politikaları, teknik
        günlükleri ve geçerli yasal gereklilikleri kapsamında işleyebilir.
      </p>
      <p>
        Hizmet sağlayıcıları gizlilik ve güvenlik dikkate alınarak seçeriz;
        ancak üçüncü taraf platformlar, uygulama mağazaları, işletim sistemleri
        veya yapay zeka altyapı sağlayıcıları tarafından yürütülen tüm teknik
        süreçleri kontrol etmeyiz.
      </p>

      <h2>6. Uygulama İçi Satın Almalar ve Abonelikler</h2>
      <p>
        KidTales AI, Apple StoreKit üzerinden uygulama içi satın alma veya
        abonelik sunabilir. Ödemeler, iadeler, yenilemeler, abonelik durumu,
        fatura bilgileri ve Apple ID hesap bilgileri Apple'ın kendi şartları ve
        gizlilik politikaları kapsamında Apple tarafından yürütülür.
      </p>
      <ul>
        <li>Ödeme kartı bilgilerini almayız veya saklamayız.</li>
        <li>
          Uygulama, ücretli özelliklerin kilidini açmak için satın alma hak
          durumunu yerel olarak saklayabilir veya doğrulayabilir.
        </li>
        <li>
          Satın alma geri yükleme ve abonelik yönetimi Apple sistemleri
          üzerinden yürütülür.
        </li>
      </ul>
      <p>
        Daha fazla bilgi için
        <a href="https://www.apple.com/privacy/" target="_blank" rel="noopener noreferrer">
          Apple Gizlilik Politikası
        </a>
        ve
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">
          Apple Standart Son Kullanıcı Lisans Sözleşmesi
        </a>
        incelenebilir.
      </p>

      <h2>7. Saklama Süresi</h2>
      <p>
        Komut verilerini yalnızca istenen hikayeyi sağlamak, güvenliği sürdürmek,
        teknik sorunları çözmek, yasal yükümlülüklere uymak veya hizmet
        sağlayıcı işleme gerekliliklerini karşılamak için makul ölçüde gerekli
        olduğu sürece tutmayı amaçlarız. Tanısal ve çökme bilgileri sınırlı bir
        süre boyunca toplulaştırılmış, takma adlı veya teknik biçimde tutulabilir.
      </p>
      <p>
        Saklama süreleri cihaz ayarlarına, uygulama mağazası sistemlerine, yasal
        yükümlülüklere ve üçüncü taraf sağlayıcı yapılandırmalarına göre değişebilir.
      </p>

      <h2>8. Ebeveyn, Vasi ve Kullanıcı Talepleri</h2>
      <p>
        Ebeveynler, vasiler ve kullanıcılar; hukuken uygulanabilir olduğu ve
        ilgili veriyi makul şekilde belirleyebildiğimiz durumlarda bilgiye erişim,
        düzeltme veya silme talepleri için bizimle iletişime geçebilir.
      </p>
      <p>
        Uygulamanın hesap olmadan çalışması amaçlandığından, belirli bir
        kullanıcıya veya cihaza bağlı olmayan verileri bulmamız veya doğrulamamız
        mümkün olmayabilir. Hukuken izin verilen durumlarda talebi doğrulamak ve
        işlemek için makul bilgiler isteyebiliriz.
      </p>
      <p>
        İletişim:
        <strong>
          <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
        </strong>
      </p>

      <h2>9. Güvenlik</h2>
      <p>
        Uygulama üzerinden işlenen bilgileri korumayı amaçlayan makul teknik ve
        idari önlemler kullanırız. Ancak hiçbir uygulama, ağ, depolama sistemi
        veya çevrimiçi aktarımın tamamen güvenli olduğu garanti edilemez.
      </p>

      <h2>10. Uluslararası İşleme</h2>
      <p>
        Hizmet sağlayıcılar, uygulama mağazaları ve teknik altyapı, bilgileri
        kullanıcının ikamet ettiği ülke dışındaki ülkelerde işleyebilir. Geçerli
        hukuk tarafından gerekli kılındığı durumlarda ilgili güvence veya hukuka
        uygun aktarım mekanizmaları uygulanabilir.
      </p>

      <h2>11. Bu Politikadaki Değişiklikler</h2>
      <p>
        Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncel sürüm, son
        güncelleme tarihiyle birlikte bu sayfada yayımlanır. Yerel hukuk farklı
        bir bildirim veya onay süreci gerektirmedikçe, güncellemeden sonra
        uygulamanın kullanılmaya devam edilmesi güncel Politika'nın geçerli
        olduğu anlamına gelir.
      </p>
      <p>
        En güncel sürüm
        <a href="https://ibrahimatmaca.github.io/kidtales-privacy" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-privacy
        </a>
        adresinde yayımlanır.
      </p>

      <h2>12. İletişim</h2>
      <p>
        Gizlilikle ilgili soru veya talepler için:
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
