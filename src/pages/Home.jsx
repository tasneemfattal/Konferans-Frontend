import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  // Eğer kullanıcı zaten giriş yaptıysa dashboard'a yönlendir
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLoginClick = () => {
    navigate("/auth");
  };

  return (
    <div className="home-container">
      {/* Üst Navigasyon */}
      <nav className="home-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <h2>Konferans Yönetim Sistemi</h2>
          </div>
          <button className="nav-login-btn" onClick={handleLoginClick}>
            Giriş Yap
          </button>
        </div>
      </nav>

      {/* Hero Bölümü */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Profesyonel Konferans Sayfaları Oluşturun</h1>
          <p className="hero-subtitle">
            Modern ve kullanıcı dostu arayüzlerle konferansınızı dijital dünyaya taşıyın
          </p>
          <button className="hero-cta-btn" onClick={handleLoginClick}>
            Hemen Başla
          </button>
        </div>
      </section>

      {/* Biz Kimiz Bölümü */}
      <section className="about-section">
        <div className="section-container">
          <h2 className="section-title">Biz Kimiz?</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Konferans Yönetim Sistemi olarak, akademik ve profesyonel konferanslarınızı 
                dijital ortamda en iyi şekilde temsil etmenize yardımcı oluyoruz. Modern web 
                teknolojileri kullanarak, konferans bilgilerinizi etkileyici ve kullanıcı dostu 
                sayfalara dönüştürüyoruz.
              </p>
              <p>
                Ekip olarak, akademik dünyanın ihtiyaçlarını anlayan ve bu ihtiyaçlara çözüm 
                üreten bir yaklaşımla çalışıyoruz. Amacımız, konferans organizatörlerinin işlerini 
                kolaylaştırmak ve katılımcılar için unutulmaz bir deneyim yaratmak.
              </p>
            </div>
            <div className="about-features">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Kullanıcı Odaklı</h3>
                <p>Kullanıcı deneyimini ön planda tutuyoruz</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Hızlı ve Kolay</h3>
                <p>Birkaç dakikada profesyonel sayfa oluşturun</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Modern Tasarım</h3>
                <p>Güncel ve şık tasarımlarla dikkat çekin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amacımız Bölümü */}
      <section className="mission-section">
        <div className="section-container">
          <h2 className="section-title">Amacımız</h2>
          <div className="mission-content">
            <p className="mission-text">
              Konferans organizatörlerinin, etkinliklerini dijital ortamda profesyonel bir şekilde 
              tanıtabilmeleri ve yönetebilmeleri için kapsamlı bir çözüm sunuyoruz. Sistemimizle:
            </p>
            <div className="mission-list">
              <div className="mission-item">
                <span className="mission-icon">✓</span>
                <div>
                  <h3>Kolay Konferans Oluşturma</h3>
                  <p>Detaylı formlar ve şablonlar ile konferansınızı kolayca oluşturabilirsiniz</p>
                </div>
              </div>
              <div className="mission-item">
                <span className="mission-icon">✓</span>
                <div>
                  <h3>Profesyonel Görünüm</h3>
                  <p>Modern ve etkileyici tasarımlarla konferansınızı en iyi şekilde sunun</p>
                </div>
              </div>
              <div className="mission-item">
                <span className="mission-icon">✓</span>
                <div>
                  <h3>Kapsamlı Yönetim</h3>
                  <p>Tüm konferans bilgilerinizi tek bir yerden yönetin ve düzenleyin</p>
                </div>
              </div>
              <div className="mission-item">
                <span className="mission-icon">✓</span>
                <div>
                  <h3>Hızlı Paylaşım</h3>
                  <p>Oluşturduğunuz sayfayı kolayca paylaşın ve erişilebilir kılın</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Konferans Oluşturma Hakkında Bölümü */}
      <section className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-title">Konferans Oluşturma Nasıl Çalışır?</h2>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Hesap Oluşturun</h3>
              <p>
                Hızlı ve kolay bir şekilde hesabınızı oluşturun. Sadece birkaç bilgi yeterli!
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Konferans Bilgilerini Girin</h3>
              <p>
                Konferansınızın adı, tarihi, konumu, açıklaması ve diğer tüm önemli bilgileri 
                adım adım doldurun.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Detayları Ekleyin</h3>
              <p>
                Program, kurullar, sponsorlar, duyurular ve diğer detayları ekleyerek 
                konferansınızı zenginleştirin.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Şablon Seçin ve Yayınlayın</h3>
              <p>
                Size uygun şablonu seçin, önizleyin ve konferans sayfanızı yayınlayın. 
                Artık hazırsınız!
              </p>
            </div>
          </div>
          <div className="cta-section">
            <button className="cta-button" onClick={handleLoginClick}>
              Konferans Oluşturmaya Başla
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <p>&copy; 2025 Konferans Yönetim Sistemi. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

