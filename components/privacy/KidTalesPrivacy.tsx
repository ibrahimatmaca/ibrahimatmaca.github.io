import React from 'react';
import KidTalesLegalLayout from './KidTalesLegalLayout';

const englishContent = `
      <h1>KidTales AI – Privacy Policy</h1>
      <p><strong>Last Updated:</strong> June 7, 2026<br />
      <strong>Developer:</strong> İbrahim Atmaca</p>

      <p>
        This Privacy Policy explains how KidTales AI ("we", "our", "the App")
        collects, uses, stores, and protects information. KidTales AI is
        designed for children and complies with applicable privacy laws,
        including:
      </p>

      <ul>
        <li>COPPA (Children's Online Privacy Protection Act – USA)</li>
        <li>GDPR (General Data Protection Regulation – EU)</li>
        <li>KVKK (Turkish Personal Data Protection Law No. 6698)</li>
        <li>Apple App Store Privacy Requirements</li>
      </ul>

      <p>
        We prioritize the safety of children and collect the minimum data
        necessary to operate the App and provide AI-generated stories.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>1.1 Automatically Collected Technical Data</h3>
      <p>
        This data is non-personal and collected only to maintain functionality
        and security:
      </p>
      <ul>
        <li>Device model, operating system version</li>
        <li>Anonymous usage analytics</li>
        <li>Crash logs and system performance data</li>
        <li>Non-identifiable app interaction data</li>
      </ul>
      <p>
        No identifiers such as name, email, phone number, location, IP address,
        or advertising ID are collected for children.
      </p>

      <h3>1.2 User-Provided Story Inputs</h3>
      <p>
        To generate personalized AI stories, users may input text such as
        character names, objects, or story themes. These inputs:
      </p>
      <ul>
        <li>Are processed only to generate the requested story</li>
        <li>Are not linked to any personal identity</li>
        <li>Are deleted immediately after story generation</li>
      </ul>

      <h3>1.3 No Account Registration</h3>
      <p>
        The App does not require login, registration, parental account creation,
        or identity verification. All use is anonymous.
      </p>

      <h2>2. How We Use Information</h2>
      <p>Collected information is used for the following purposes:</p>
      <ul>
        <li>To generate AI-powered stories based on user inputs</li>
        <li>To improve app performance, stability, and security</li>
        <li>To diagnose technical issues and prevent crashes</li>
      </ul>

      <h2>3. AI Processing & Data Handling</h2>
      <p>
        User inputs may be temporarily transmitted to AI servers for processing.
        This processing is strictly limited to producing story output and
        operates under the following principles:
      </p>
      <ul>
        <li>No personal data is stored or profiled</li>
        <li>No training of AI models using user data</li>
        <li>Data is deleted immediately after processing</li>
        <li>Data is not shared with any commercial entity</li>
      </ul>

      <h2>4. Children's Privacy and COPPA Compliance</h2>
      <p>
        The App is child-friendly and complies with COPPA. We do not knowingly
        collect personal information from children under 13.
      </p>
      <ul>
        <li>No personal identifiers collected</li>
        <li>No behavioral tracking</li>
        <li>No advertising or targeted marketing</li>
        <li>No third-party profiling</li>
      </ul>

      <h2>5. Third-Party Services</h2>
      <p>
        We may use trusted third-party tools exclusively for technical purposes:
      </p>
      <ul>
        <li>
          <strong>Crash Reporting:</strong> Crashlytics or similar services
          (anonymous only)
        </li>
        <li>
          <strong>AI Model Processing:</strong> Secure cloud infrastructure for
          story generation
        </li>
      </ul>
      <p>These services cannot use data for their own purposes.</p>

      <h2>6. In-App Purchases and Subscriptions</h2>
      <p>
        KidTales AI may offer in-app purchases or subscriptions through Apple's
        StoreKit framework. When a purchase or subscription is made:
      </p>
      <ul>
        <li>
          <strong>Payment Processing:</strong> All payment transactions are
          processed entirely by Apple. We do not receive or store payment card
          details, billing addresses, or Apple ID credentials.
        </li>
        <li>
          <strong>Purchase Data:</strong> Apple manages purchase history,
          subscription status, receipts, renewals, cancellations, and refunds
          according to Apple's privacy policy and terms.
        </li>
        <li>
          <strong>Local Purchase Status:</strong> The App may store whether
          premium features are unlocked locally on the device to provide access
          to purchased features.
        </li>
        <li>
          <strong>Restore Purchases:</strong> Restore requests are verified
          through Apple. We do not receive personal payment information during
          this process.
        </li>
      </ul>
      <p>
        For more information, please review
        <a href="https://www.apple.com/privacy/" target="_blank" rel="noopener noreferrer">
          Apple's Privacy Policy
        </a>
        and Apple's
        <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">
          Standard End User License Agreement
        </a>.
        KidTales AI also provides its own Terms of Use at
        <a href="https://ibrahimatmaca.github.io/kidtales-terms" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-terms
        </a>.
      </p>

      <h2>7. Data Storage & Retention</h2>
      <ul>
        <li>Story inputs are deleted immediately after AI processing</li>
        <li>
          Technical logs are stored anonymously for performance improvement
        </li>
        <li>No long-term storage of any user-generated content</li>
      </ul>

      <h2>8. Parental Rights (COPPA, GDPR, KVKK)</h2>
      <p>Parents and guardians may request at any time:</p>
      <ul>
        <li>Access to collected information</li>
        <li>Deletion of all related data</li>
        <li>Explanation of data practices</li>
      </ul>

      <p>
        To submit a request, please contact:
        <strong
          ><a href="mailto:ibrahim.atmaca61@hotmail.com"
            >ibrahim.atmaca61@hotmail.com</a
          ></strong
        >
      </p>

      <h2>9. Data Security</h2>
      <p>
        We implement industry-standard security measures, including encryption,
        access controls, and secure data processing environments.
      </p>

      <h2>10. International Data Transfer</h2>
      <p>
        If data is processed outside the user's country, we ensure full
        compliance with GDPR and applicable international laws through secure
        and approved mechanisms.
      </p>

      <h2>11. Policy Updates</h2>
      <p>
        We may update this Privacy Policy periodically. All changes will be
        published on this page and become effective immediately upon posting.
      </p>
      <p>
        The latest version of this Privacy Policy is available at
        <a href="https://ibrahimatmaca.github.io/kidtales-privacy" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-privacy
        </a>.
      </p>

      <h2>12. Contact Information</h2>
      <p>
        For privacy concerns, deletion requests, or questions, please contact
        us:
        <br />
        <strong
          >Email:
          <a href="mailto:ibrahim.atmaca61@hotmail.com"
            >ibrahim.atmaca61@hotmail.com</a
          ></strong
        >
      </p>
`;

const turkishContent = `
      <h1>KidTales AI – Gizlilik Politikası</h1>
      <p><strong>Son Güncelleme:</strong> 7 Haziran 2026<br />
      <strong>Geliştirici:</strong> İbrahim Atmaca</p>

      <p>
        Bu Gizlilik Politikası, KidTales AI ("biz", "uygulama") tarafından hangi
        bilgilerin toplandığını, nasıl kullanıldığını, hangi hukuki dayanaklarla
        işlendiğini ve çocukların gizliliğinin nasıl korunduğunu açıklar.
        Uygulama aşağıdaki düzenlemelere uygundur:
      </p>

      <ul>
        <li>COPPA (Çocukların Çevrimiçi Gizliliğini Koruma Yasası – ABD)</li>
        <li>GDPR (Avrupa Birliği Genel Veri Koruma Tüzüğü)</li>
        <li>KVKK (Türkiye 6698 sayılı Kişisel Verilerin Korunması Kanunu)</li>
        <li>Apple App Store Gizlilik Gereksinimleri</li>
      </ul>

      <p>
        Çocukların güvenliğini önceliklendiriyoruz ve uygulamayı işletmek ile
        yapay zekâ destekli hikâyeler sunmak için gereken minimum veriyi
        topluyoruz.
      </p>

      <h2>1. Toplanan Bilgiler</h2>

      <h3>1.1 Otomatik Toplanan Teknik Veriler</h3>
      <p>
        Bu veriler kimlik belirleyici değildir ve yalnızca uygulamanın düzgün
        çalışması için kullanılır:
      </p>
      <ul>
        <li>Cihaz modeli ve işletim sistemi sürümü</li>
        <li>Anonim kullanım analizleri</li>
        <li>Çökme raporları ve performans istatistikleri</li>
        <li>Kullanıcı davranışı içermeyen teknik loglar</li>
      </ul>

      <h3>1.2 Kullanıcı Tarafından Girilen Hikâye Verileri</h3>
      <p>
        Hikâye üretmek amacıyla kullanıcıdan girilen karakter isimleri, temalar
        veya metin girdileri alınır. Bu girdiler:
      </p>
      <ul>
        <li>Sadece yapay zeka işlemesi için kullanılır</li>
        <li>Kişisel kimlik bilgisi değildir</li>
        <li>İşlem tamamlanınca kalıcı olarak saklanmaz</li>
      </ul>

      <h3>1.3 Hesap Oluşturma Zorunluluğu Yoktur</h3>
      <p>
        Uygulama anonim olarak çalışır; kullanıcı hesabı, şifre veya ebeveyn
        doğrulaması talep edilmez.
      </p>

      <h2>2. Verilerin Kullanım Amaçları</h2>
      <ul>
        <li>Yapay zekâ ile kişiselleştirilmiş hikâye üretmek</li>
        <li>Uygulama performansını ve güvenliğini sağlamak</li>
        <li>Teknik hataları gidermek</li>
      </ul>

      <h2>3. Yapay Zekâ İşlemesi</h2>
      <p>
        Girdi verileri, hikâyeyi üretmek amacıyla yapay zekâ sunucularında
        geçici olarak işlenebilir. Bu işlemler şu ilkelere bağlıdır:
      </p>
      <ul>
        <li>Kişisel veri niteliği taşımayan girdiler işlenir</li>
        <li>Veriler model eğitimi için kullanılmaz</li>
        <li>Üçüncü taraflarla paylaşılmaz</li>
        <li>İşlem tamamlandıktan sonra silinir</li>
      </ul>

      <h2>4. Çocukların Gizliliği (COPPA Uyumu)</h2>
      <ul>
        <li>Kişisel tanımlayıcı veri toplamaz</li>
        <li>Reklam takibi yapılmaz</li>
        <li>Konum, fotoğraf veya iletişim bilgisi talep edilmez</li>
        <li>Hedefli reklam veya profilleme yapılmaz</li>
      </ul>

      <h2>5. Üçüncü Taraf Hizmetleri</h2>
      <p>
        Sadece teknik gereklilikler için üçüncü taraflardan destek alınabilir:
      </p>
      <ul>
        <li>
          <strong>Çökme ve Analiz Hizmetleri:</strong> Crashlytics veya eşdeğeri
          (anonim)
        </li>
        <li>
          <strong>Yapay Zekâ Süreç Hizmeti:</strong> Hikâye üretimi için güvenli
          sunucular
        </li>
      </ul>
      <p>Bu hizmetler verileri kendi amaçları için kullanamaz.</p>

      <h2>6. Uygulama İçi Satın Almalar ve Abonelikler</h2>
      <p>
        KidTales AI, Apple StoreKit üzerinden uygulama içi satın alma veya
        abonelik sunabilir. Bir satın alma veya abonelik yapıldığında:
      </p>
      <ul>
        <li>
          <strong>Ödeme İşleme:</strong> Tüm ödeme işlemleri tamamen Apple
          tarafından gerçekleştirilir. Kart bilgileri, fatura adresi veya Apple
          ID bilgileri tarafımızdan alınmaz ya da saklanmaz.
        </li>
        <li>
          <strong>Satın Alma Verileri:</strong> Satın alma geçmişi, abonelik
          durumu, makbuzlar, yenilemeler, iptaller ve iadeler Apple'ın gizlilik
          politikası ve şartlarına göre Apple tarafından yönetilir.
        </li>
        <li>
          <strong>Yerel Satın Alma Durumu:</strong> Premium özelliklere erişim
          sağlamak için satın alma durumu cihazda yerel olarak tutulabilir.
        </li>
        <li>
          <strong>Satın Almaları Geri Yükleme:</strong> Geri yükleme işlemleri
          Apple üzerinden doğrulanır. Bu süreçte kişisel ödeme bilgisi almayız.
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
        incelenebilir. KidTales AI Kullanım Şartları ayrıca
        <a href="https://ibrahimatmaca.github.io/kidtales-terms" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-terms
        </a>
        adresinde yer alır.
      </p>

      <h2>7. Veri Saklama ve Silme</h2>
      <ul>
        <li>Hikâye girdileri işlem bitince tamamen silinir</li>
        <li>Performans logları anonim olarak saklanabilir</li>
        <li>Kişisel veri saklanmaz</li>
      </ul>

      <h2>8. Ebeveyn Hakları (KVKK, GDPR, COPPA)</h2>
      <p>Ebeveynler aşağıdaki haklara sahiptir:</p>
      <ul>
        <li>Toplanan verilerin silinmesini talep edebilir</li>
        <li>İşlenen verilere erişim talep edebilir</li>
        <li>Veri işleme süreçleri hakkında bilgi talep edebilir</li>
      </ul>

      <p>
        Talepler için:
        <strong
          ><a href="mailto:ibrahim.atmaca61@hotmail.com"
            >ibrahim.atmaca61@hotmail.com</a
          ></strong
        >
      </p>

      <h2>9. Veri Güvenliği</h2>
      <p>
        Veriler, endüstri standartlarına uygun güvenlik önlemleri (şifreleme,
        erişim kontrolü, güvenli sunucu ortamı) ile korunmaktadır.
      </p>

      <h2>10. Uluslararası Veri Aktarımı</h2>
      <p>
        Veri Türkiye dışına aktarılırsa, GDPR ve KVKK kapsamında gerekli
        güvenlik tedbirleri sağlanır.
      </p>

      <h2>11. Politika Güncellemeleri</h2>
      <p>
        Bu politika zaman zaman güncellenebilir. Güncellenmiş versiyon bu
        sayfada yayımlandığında yürürlüğe girer.
      </p>
      <p>
        Bu Gizlilik Politikası'nın en güncel sürümü
        <a href="https://ibrahimatmaca.github.io/kidtales-privacy" target="_blank" rel="noopener noreferrer">
          https://ibrahimatmaca.github.io/kidtales-privacy
        </a>
        adresinde yayımlanır.
      </p>

      <h2>12. İletişim</h2>
      <p>
        Gizlilikle ilgili sorularınız veya talepleriniz için:
        <br />
        <strong
          >E-posta:
          <a href="mailto:ibrahim.atmaca61@hotmail.com"
            >ibrahim.atmaca61@hotmail.com</a
          ></strong
        >
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
