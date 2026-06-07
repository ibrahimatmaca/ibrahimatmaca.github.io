import React from 'react';
import KidTalesLegalLayout from './KidTalesLegalLayout';

const englishContent = `
      <h1>KidTales AI – Terms of Use</h1>
      <p><strong>Last Updated:</strong> June 7, 2026<br />
      <strong>Developer:</strong> İbrahim Atmaca</p>

      <p>
        These Terms of Use ("Terms") govern access to and use of KidTales AI
        ("we", "our", "the App"). By downloading, accessing, or using the App,
        you agree to these Terms to the extent permitted by applicable law.
      </p>

      <p>
        Nothing in these Terms is intended to exclude or limit any mandatory
        consumer, privacy, child-protection, or statutory rights that cannot be
        waived under the laws of your country or region.
      </p>

      <h2>1. Acceptance and Supervision</h2>
      <p>
        If you do not agree with these Terms, do not use the App. If the App is
        used by a child, the parent or legal guardian is responsible for
        reviewing these Terms, supervising use of the App, and deciding whether
        generated content is appropriate for the child.
      </p>

      <h2>2. Service Description</h2>
      <p>
        KidTales AI provides AI-assisted fictional story generation. Users may
        enter prompts such as fictional character names, objects, themes, or
        story ideas, and the App may generate fictional content based on those
        prompts.
      </p>
      <p>
        The App is provided for personal entertainment and creative use. It is
        not a childcare, educational, medical, therapeutic, psychological,
        safety, legal, or professional service.
      </p>

      <h2>3. Eligibility and Child Use</h2>
      <p>
        KidTales AI is intended to be child-friendly, but it is not a substitute
        for parent or guardian judgment. Children should use the App only with
        appropriate parent or guardian involvement. Parents and guardians are
        responsible for prompts entered into the App, device settings, purchase
        permissions, and the child's use of generated content.
      </p>

      <h2>4. User Responsibilities</h2>
      <p>You must not use the App to create, request, submit, or share content that:</p>
      <ul>
        <li>Includes personal, sensitive, confidential, or identifying information about a child or another person</li>
        <li>Is unlawful, harmful, abusive, discriminatory, hateful, violent, sexual, exploitative, or otherwise inappropriate for children</li>
        <li>Infringes intellectual property, privacy, publicity, or other rights</li>
        <li>Attempts to bypass safety features, misuse the App, overload systems, scrape data, or reverse engineer the App</li>
        <li>Violates applicable law, platform rules, or these Terms</li>
      </ul>
      <p>
        You are solely responsible for the prompts and materials you provide and
        for ensuring that your use of generated content is lawful and appropriate.
      </p>

      <h2>5. AI Content Disclaimer</h2>
      <p>
        AI-generated stories are automatically generated and may be inaccurate,
        incomplete, repetitive, unexpected, offensive, unsafe, unsuitable for a
        particular child, or inconsistent with the user's intent. We do not
        guarantee that generated content will be correct, safe, age-appropriate,
        educationally suitable, or free from errors.
      </p>
      <p>
        Parents and guardians should review all generated stories before a child
        reads, hears, saves, shares, or relies on them. The App does not provide
        advice of any kind and should not be used for emergency, health, safety,
        legal, educational, psychological, or professional decisions.
      </p>

      <h2>6. Availability and Changes</h2>
      <p>
        The App may be changed, limited, suspended, discontinued, or unavailable
        at any time due to maintenance, technical issues, provider limitations,
        safety concerns, platform rules, legal requirements, or business reasons.
        We do not guarantee uninterrupted, error-free, or permanent availability.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        The App, including its software, interface, design, branding, text,
        graphics, and related materials, is owned by İbrahim Atmaca or licensed
        to us and is protected by applicable laws.
      </p>
      <p>
        Subject to these Terms and applicable law, you may use stories generated
        for you for personal, non-commercial purposes. We do not guarantee that
        AI-generated content is unique, copyrightable, available for commercial
        use, or free from third-party rights.
      </p>

      <h2>8. In-App Purchases and Subscriptions</h2>
      <p>
        KidTales AI may offer premium features through in-app purchases or
        auto-renewable subscriptions using Apple's StoreKit framework. All
        payments, renewals, cancellations, refunds, billing disputes, and Apple
        ID account matters are handled by Apple under Apple's terms and policies.
      </p>
      <ul>
        <li>Payment is charged to the user's Apple ID account by Apple.</li>
        <li>Subscriptions may renew automatically unless cancelled through Apple before the renewal deadline.</li>
        <li>Users can manage or cancel subscriptions in their Apple ID account settings.</li>
        <li>Prices, features, trials, and availability may change where permitted by Apple rules and applicable law.</li>
        <li>We do not receive or store payment card details.</li>
      </ul>

      <h2>9. Apple Standard EULA</h2>
      <p>
        To the extent applicable, KidTales AI is licensed under
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">
          Apple's Standard End User License Agreement
        </a>.
        These Terms supplement the Apple Standard EULA only where permitted and
        do not replace any mandatory Apple or App Store terms.
      </p>

      <h2>10. Privacy</h2>
      <p>
        Use of the App is also described in the KidTales AI Privacy Policy,
        available at
        <a href="https://ibrahimatmaca.github.io/kidtales-privacy" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-privacy
        </a>.
      </p>

      <h2>11. Suspension or Restriction</h2>
      <p>
        We may suspend, restrict, remove, or limit access to the App or any
        feature if we reasonably believe that the App is being misused, these
        Terms are violated, safety systems are bypassed, legal or platform
        requirements apply, or technical/security reasons require it.
      </p>

      <h2>12. No Warranties</h2>
      <p>
        To the maximum extent permitted by applicable law, the App and all
        generated content are provided "as is" and "as available", without
        warranties of any kind, whether express, implied, statutory, or otherwise.
        We disclaim all warranties of merchantability, fitness for a particular
        purpose, accuracy, reliability, availability, safety, non-infringement,
        and suitability for children, except where such disclaimer is not allowed
        by law.
      </p>

      <h2>13. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, we will not be liable
        for indirect, incidental, special, consequential, exemplary, punitive, or
        lost-profit damages, or for loss of data, loss of content, device issues,
        service interruptions, provider failures, purchase disputes handled by
        Apple, or reliance on AI-generated content.
      </p>
      <p>
        Where liability cannot legally be excluded, it will be limited to the
        minimum amount permitted by applicable law. Nothing in these Terms limits
        liability that cannot be limited by law.
      </p>

      <h2>14. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the Republic of Turkey, except
        where mandatory laws of your country or region require otherwise. Any
        mandatory consumer or statutory protections that apply to you remain
        unaffected.
      </p>

      <h2>15. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Updated Terms will be
        posted on this page with the latest update date. Continued use of the App
        after an update means the updated Terms apply, unless local law requires
        a different notice or consent process.
      </p>
      <p>
        The latest version is available at
        <a href="https://ibrahimatmaca.github.io/kidtales-terms" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-terms
        </a>.
      </p>

      <h2>16. Contact</h2>
      <p>
        For questions about these Terms, contact:
        <br />
        <strong>
          Email:
          <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
        </strong>
      </p>
`;

const turkishContent = `
      <h1>KidTales AI – Kullanım Şartları</h1>
      <p><strong>Son Güncelleme:</strong> 7 Haziran 2026<br />
      <strong>Geliştirici:</strong> İbrahim Atmaca</p>

      <p>
        Bu Kullanım Şartları ("Şartlar"), KidTales AI ("biz", "uygulama")
        erişimini ve kullanımını düzenler. Uygulamayı indirerek, erişerek veya
        kullanarak, geçerli hukukun izin verdiği ölçüde bu Şartları kabul etmiş
        olursunuz.
      </p>

      <p>
        Bu Şartlardaki hiçbir hüküm, ülkenizde veya bölgenizde feragat edilmesi
        mümkün olmayan zorunlu tüketici, gizlilik, çocuk koruma veya yasal
        hakları hariç tutma ya da sınırlama amacı taşımaz.
      </p>

      <h2>1. Kabul ve Gözetim</h2>
      <p>
        Bu Şartları kabul etmiyorsanız uygulamayı kullanmayın. Uygulama bir
        çocuk tarafından kullanılıyorsa, ebeveyn veya yasal vasi bu Şartları
        incelemekten, kullanımı gözetmekten ve oluşturulan içeriğin çocuk için
        uygun olup olmadığına karar vermekten sorumludur.
      </p>

      <h2>2. Hizmet Açıklaması</h2>
      <p>
        KidTales AI, yapay zeka destekli kurgusal hikaye üretimi sunar.
        Kullanıcılar kurgusal karakter adları, nesneler, temalar veya hikaye
        fikirleri gibi komutlar girebilir ve uygulama bu komutlara dayalı
        kurgusal içerik oluşturabilir.
      </p>
      <p>
        Uygulama kişisel eğlence ve yaratıcı kullanım için sunulur. Bir çocuk
        bakımı, eğitim, tıbbi, terapötik, psikolojik, güvenlik, hukuki veya
        profesyonel hizmet değildir.
      </p>

      <h2>3. Uygunluk ve Çocuk Kullanımı</h2>
      <p>
        KidTales AI çocuk dostu olacak şekilde tasarlanmıştır; ancak ebeveyn
        veya vasi değerlendirmesinin yerine geçmez. Çocuklar uygulamayı yalnızca
        uygun ebeveyn veya vasi katılımıyla kullanmalıdır. Ebeveynler ve vasiler,
        uygulamaya girilen komutlardan, cihaz ayarlarından, satın alma izinlerinden
        ve çocuğun oluşturulan içeriği kullanımından sorumludur.
      </p>

      <h2>4. Kullanıcı Sorumlulukları</h2>
      <p>Uygulamayı aşağıdaki içerikleri oluşturmak, istemek, göndermek veya paylaşmak için kullanamazsınız:</p>
      <ul>
        <li>Bir çocuk veya başka bir kişi hakkında kişisel, hassas, gizli veya tanımlayıcı bilgi içeren içerikler</li>
        <li>Hukuka aykırı, zararlı, taciz edici, ayrımcı, nefret içeren, şiddet içeren, cinsel, sömürücü veya çocuklar için uygunsuz içerikler</li>
        <li>Fikri mülkiyet, gizlilik, kişilik veya diğer hakları ihlal eden içerikler</li>
        <li>Güvenlik özelliklerini aşmaya, uygulamayı kötüye kullanmaya, sistemleri aşırı yüklemeye, veri toplamaya veya tersine mühendislik yapmaya yönelik eylemler</li>
        <li>Geçerli hukuku, platform kurallarını veya bu Şartları ihlal eden kullanımlar</li>
      </ul>
      <p>
        Sağladığınız komut ve materyallerden ve oluşturulan içeriği hukuka uygun
        ve uygun şekilde kullanmaktan yalnızca siz sorumlusunuz.
      </p>

      <h2>5. Yapay Zeka İçeriği Hakkında Uyarı</h2>
      <p>
        Yapay zeka tarafından oluşturulan hikayeler otomatik olarak üretilir ve
        hatalı, eksik, tekrarlı, beklenmedik, rahatsız edici, güvensiz, belirli
        bir çocuk için uygunsuz veya kullanıcının amacından farklı olabilir.
        Oluşturulan içeriğin doğru, güvenli, yaşa uygun, eğitsel olarak uygun
        veya hatasız olduğunu garanti etmeyiz.
      </p>
      <p>
        Ebeveynler ve vasiler, bir çocuk okumadan, dinlemeden, kaydetmeden,
        paylaşmadan veya güvenmeden önce tüm oluşturulan hikayeleri gözden
        geçirmelidir. Uygulama herhangi bir tavsiye sağlamaz ve acil durum,
        sağlık, güvenlik, hukuk, eğitim, psikoloji veya profesyonel kararlar
        için kullanılmamalıdır.
      </p>

      <h2>6. Erişilebilirlik ve Değişiklikler</h2>
      <p>
        Uygulama; bakım, teknik sorunlar, sağlayıcı sınırlamaları, güvenlik
        endişeleri, platform kuralları, yasal gereklilikler veya ticari nedenlerle
        herhangi bir zamanda değiştirilebilir, sınırlandırılabilir, askıya
        alınabilir, sonlandırılabilir veya kullanılamayabilir. Kesintisiz,
        hatasız veya kalıcı erişilebilirlik garanti etmeyiz.
      </p>

      <h2>7. Fikri Mülkiyet</h2>
      <p>
        Uygulamanın yazılımı, arayüzü, tasarımı, markası, metinleri, grafikleri
        ve ilgili materyalleri İbrahim Atmaca'ya aittir veya tarafımıza
        lisanslanmıştır ve geçerli yasalarla korunur.
      </p>
      <p>
        Bu Şartlara ve geçerli hukuka tabi olarak, sizin için oluşturulan
        hikayeleri kişisel ve ticari olmayan amaçlarla kullanabilirsiniz. Yapay
        zeka tarafından oluşturulan içeriğin benzersiz, telif hakkına konu
        edilebilir, ticari kullanıma uygun veya üçüncü taraf haklarından arınmış
        olduğunu garanti etmeyiz.
      </p>

      <h2>8. Uygulama İçi Satın Almalar ve Abonelikler</h2>
      <p>
        KidTales AI, Apple StoreKit üzerinden uygulama içi satın alma veya
        otomatik yenilenen aboneliklerle premium özellikler sunabilir. Tüm
        ödemeler, yenilemeler, iptaller, iadeler, fatura uyuşmazlıkları ve Apple
        ID hesap konuları Apple'ın şartları ve politikaları kapsamında Apple
        tarafından yürütülür.
      </p>
      <ul>
        <li>Ödeme Apple tarafından kullanıcının Apple ID hesabına yansıtılır.</li>
        <li>Abonelikler, Apple üzerinden yenileme son tarihinden önce iptal edilmediği sürece otomatik yenilenebilir.</li>
        <li>Kullanıcılar abonelikleri Apple ID hesap ayarlarından yönetebilir veya iptal edebilir.</li>
        <li>Fiyatlar, özellikler, denemeler ve erişilebilirlik Apple kuralları ve geçerli hukuk kapsamında değişebilir.</li>
        <li>Ödeme kartı bilgilerini almayız veya saklamayız.</li>
      </ul>

      <h2>9. Apple Standart EULA</h2>
      <p>
        Uygulanabildiği ölçüde KidTales AI,
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">
          Apple Standart Son Kullanıcı Lisans Sözleşmesi
        </a>
        kapsamında lisanslanır. Bu Şartlar, yalnızca izin verilen ölçüde Apple
        Standart EULA'yı tamamlar ve zorunlu Apple veya App Store şartlarının
        yerine geçmez.
      </p>

      <h2>10. Gizlilik</h2>
      <p>
        Uygulamanın kullanımı KidTales AI Gizlilik Politikası'nda da açıklanır:
        <a href="https://ibrahimatmaca.github.io/kidtales-privacy" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-privacy
        </a>.
      </p>

      <h2>11. Askıya Alma veya Sınırlandırma</h2>
      <p>
        Uygulamanın kötüye kullanıldığına, bu Şartların ihlal edildiğine,
        güvenlik sistemlerinin aşılmaya çalışıldığına, yasal veya platform
        gerekliliklerinin doğduğuna ya da teknik/güvenlik nedenlerinin bunu
        gerektirdiğine makul olarak inanırsak uygulamaya veya herhangi bir
        özelliğe erişimi askıya alabilir, kısıtlayabilir, kaldırabilir veya
        sınırlandırabiliriz.
      </p>

      <h2>12. Garanti Verilmemesi</h2>
      <p>
        Geçerli hukukun izin verdiği azami ölçüde uygulama ve oluşturulan tüm
        içerikler, açık, zımni, yasal veya başka türlü hiçbir garanti olmaksızın
        "olduğu gibi" ve "mevcut olduğu şekilde" sunulur. Kanunen izin verilmeyen
        durumlar hariç olmak üzere satılabilirlik, belirli bir amaca uygunluk,
        doğruluk, güvenilirlik, erişilebilirlik, güvenlik, ihlal etmeme ve
        çocuklara uygunluk dahil tüm garantileri reddederiz.
      </p>

      <h2>13. Sorumluluğun Sınırlandırılması</h2>
      <p>
        Geçerli hukukun izin verdiği azami ölçüde; dolaylı, arızi, özel,
        sonuçsal, örnek niteliğinde, cezai veya kar kaybı zararlarından; veri
        kaybından, içerik kaybından, cihaz sorunlarından, hizmet kesintilerinden,
        sağlayıcı arızalarından, Apple tarafından yürütülen satın alma
        uyuşmazlıklarından veya yapay zeka içeriğine güvenilmesinden sorumlu
        olmayız.
      </p>
      <p>
        Sorumluluğun hukuken tamamen hariç tutulamadığı durumlarda sorumluluk,
        geçerli hukukun izin verdiği en düşük tutarla sınırlıdır. Bu Şartlardaki
        hiçbir hüküm, kanunen sınırlandırılamayacak sorumlulukları sınırlamaz.
      </p>

      <h2>14. Uygulanacak Hukuk</h2>
      <p>
        Ülkenizin veya bölgenizin zorunlu kuralları aksini gerektirmedikçe, bu
        Şartlar Türkiye Cumhuriyeti hukukuna tabidir. Size uygulanabilecek
        zorunlu tüketici veya yasal korumalar saklıdır.
      </p>

      <h2>15. Şartlardaki Değişiklikler</h2>
      <p>
        Bu Şartlar zaman zaman güncellenebilir. Güncel Şartlar, son güncelleme
        tarihiyle birlikte bu sayfada yayımlanır. Yerel hukuk farklı bir bildirim
        veya onay süreci gerektirmedikçe, güncellemeden sonra uygulamanın
        kullanılmaya devam edilmesi güncel Şartların geçerli olduğu anlamına gelir.
      </p>
      <p>
        En güncel sürüm
        <a href="https://ibrahimatmaca.github.io/kidtales-terms" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-terms
        </a>
        adresinde yayımlanır.
      </p>

      <h2>16. İletişim</h2>
      <p>
        Bu Şartlarla ilgili sorular için:
        <br />
        <strong>
          E-posta:
          <a href="mailto:ibrahim.atmaca61@hotmail.com">ibrahim.atmaca61@hotmail.com</a>
        </strong>
      </p>
`;

const KidTalesTerms: React.FC = () => (
  <KidTalesLegalLayout
    englishContent={englishContent}
    turkishContent={turkishContent}
    titleEn="KidTales AI Terms of Use"
    titleTr="KidTales AI Kullanım Şartları"
  />
);

export default KidTalesTerms;
