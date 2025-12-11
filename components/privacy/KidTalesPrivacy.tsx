import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Background from '../Background';

const englishContent = `
      <h1>KidTales AI – Privacy Policy</h1>
      <p>Last Updated: 2025</p>

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

      <h2>6. Data Storage & Retention</h2>
      <ul>
        <li>Story inputs are deleted immediately after AI processing</li>
        <li>
          Technical logs are stored anonymously for performance improvement
        </li>
        <li>No long-term storage of any user-generated content</li>
      </ul>

      <h2>7. Parental Rights (COPPA, GDPR, KVKK)</h2>
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

      <h2>8. Data Security</h2>
      <p>
        We implement industry-standard security measures, including encryption,
        access controls, and secure data processing environments.
      </p>

      <h2>9. International Data Transfer</h2>
      <p>
        If data is processed outside the user's country, we ensure full
        compliance with GDPR and applicable international laws through secure
        and approved mechanisms.
      </p>

      <h2>10. Policy Updates</h2>
      <p>
        We may update this Privacy Policy periodically. All changes will be
        published on this page and become effective immediately upon posting.
      </p>

      <h2>11. Contact Information</h2>
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
      <p>Son Güncelleme: 2025</p>

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

      <h2>6. Veri Saklama ve Silme</h2>
      <ul>
        <li>Hikâye girdileri işlem bitince tamamen silinir</li>
        <li>Performans logları anonim olarak saklanabilir</li>
        <li>Kişisel veri saklanmaz</li>
      </ul>

      <h2>7. Ebeveyn Hakları (KVKK, GDPR, COPPA)</h2>
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

      <h2>8. Veri Güvenliği</h2>
      <p>
        Veriler, endüstri standartlarına uygun güvenlik önlemleri (şifreleme,
        erişim kontrolü, güvenli sunucu ortamı) ile korunmaktadır.
      </p>

      <h2>9. Uluslararası Veri Aktarımı</h2>
      <p>
        Veri Türkiye dışına aktarılırsa, GDPR ve KVKK kapsamında gerekli
        güvenlik tedbirleri sağlanır.
      </p>

      <h2>10. Politika Güncellemeleri</h2>
      <p>
        Bu politika zaman zaman güncellenebilir. Güncellenmiş versiyon bu
        sayfada yayımlandığında yürürlüğe girer.
      </p>

      <h2>11. İletişim</h2>
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

const KidTalesPrivacy: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [language, setLanguage] = useState<'en' | 'tr'>('en');

  const content = language === 'en' ? englishContent : turkishContent;
  const title = language === 'en' ? 'KidTales AI Privacy Policy' : 'KidTales AI Gizlilik Politikası';

  return (
    <div className="font-sans antialiased text-slate-200 selection:bg-brand-500/30 selection:text-brand-200 min-h-screen">
      <Background />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/50 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold font-mono tracking-tighter text-white cursor-pointer"
          >
            IBRAHIM<span className="text-brand-400">DEV</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <Link 
              to="/#projects" 
              className="hover:text-white transition-colors"
            >
              Work
            </Link>
            <Link 
              to="/#about" 
              className="hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              to="/#contact" 
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-20">
        <section className="py-24 relative min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl w-full">
            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
              <div className="w-20 h-1 bg-brand-500 mx-auto"></div>
            </div>

            {/* Language Switcher */}
            <div className="mb-8 flex justify-center">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center gap-3">
                <strong className="text-gray-300">Language / Dil:</strong>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    language === 'en'
                      ? 'bg-brand-500 text-white border-brand-500'
                      : 'bg-transparent text-brand-400 border-brand-400 hover:bg-brand-500/20'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    language === 'tr'
                      ? 'bg-brand-500 text-white border-brand-500'
                      : 'bg-transparent text-brand-400 border-brand-400 hover:bg-brand-500/20'
                  }`}
                >
                  Türkçe
                </button>
              </div>
            </div>

            {/* HTML Content Container */}
            <div 
              className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 max-w-none
                [&_h1]:hidden
                [&_h2]:text-white [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:leading-tight [&_h2]:border-b [&_h2]:border-slate-700 [&_h2]:pb-3 [&_h2]:first:mt-0
                [&_h3]:text-white [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-tight
                [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base [&_p]:md:text-lg
                [&_ul]:text-gray-300 [&_ul]:mb-8 [&_ul]:space-y-3 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:ml-4 [&_ul]:md:ml-6
                [&_li]:text-gray-300 [&_li]:mb-2 [&_li]:leading-relaxed [&_li]:text-base [&_li]:md:text-lg
                [&_strong]:text-white [&_strong]:font-semibold
                [&_em]:text-gray-400 [&_em]:italic
                [&_a]:text-brand-400 [&_a]:no-underline [&_a]:hover:text-brand-300 [&_a]:transition-colors"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm border-t border-slate-900 bg-slate-950">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} İbrahim Atmaca. Built with React, Tailwind & Gemini AI.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default KidTalesPrivacy;

