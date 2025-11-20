import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PreviousConferences.css";

const readPreviousConferences = () => {
  try {
    const raw = localStorage.getItem("previousConferences");
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Önceki konferanslar okunamadı:", error);
    return [];
  }
};

export default function PreviousConferences() {
  const navigate = useNavigate();
  const location = useLocation();
  const [conferences, setConferences] = useState(() =>
    readPreviousConferences()
  );

  useEffect(() => {
    setConferences(readPreviousConferences());
  }, []);

  const successMessage = useMemo(() => {
    if (!location.state?.success) return null;
    const message = location.state.conferenceName
      ? `${location.state.conferenceName} başarıyla oluşturuldu.`
      : "Konferans başarıyla oluşturuldu.";
    return message;
  }, [location.state]);

  useEffect(() => {
    if (!location.state?.success) return;
    const timer = setTimeout(() => {
      navigate(location.pathname, { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [location, navigate]);

  const handleCreateNew = () => {
    localStorage.removeItem("newConference");
    localStorage.removeItem("isEditingConference");
    navigate("/dashboard/create");
  };

  const handleViewTemplate = (conf) => {
    navigate(`/template-modern?id=${conf.id}`);
  };

  return (
    <div className="previous-page">
      <div className="previous-header">
        <div>
          <p>Arşiv</p>
          <h1>Önceki Konferanslar</h1>
          <span>
            Tamamlanan konferanslarınızı buradan görüntüleyebilir veya yeniden
            düzenleyebilirsiniz.
          </span>
        </div>
        <button onClick={handleCreateNew}>Yeni konferans oluştur</button>
      </div>

      {successMessage && <div className="success-banner">{successMessage}</div>}

      {conferences.length === 0 ? (
        <div className="empty-state">
          <h3>Henüz bir konferans yayınlamadınız</h3>
          <p>Bir konferans oluşturduğunuzda, şablonla kaydettiğinizde burada listelenecek.</p>
          <button onClick={handleCreateNew}>Hemen oluştur</button>
        </div>
      ) : (
        <div className="previous-grid">
          {conferences.map((conf) => (
            <article key={conf.id} className="previous-card">
              <div className="previous-meta">
                <span className="template-chip">
                  {conf.template?.toUpperCase() || "TASARIM"}
                </span>
                <h3>{conf.name}</h3>
                <p>{conf.description}</p>
              </div>

              <ul className="previous-info">
                <li>
                  <strong>Tarih</strong>
                  <span>{conf.date}</span>
                </li>
                <li>
                  <strong>Konum</strong>
                  <span>{conf.location}</span>
                </li>
                <li>
                  <strong>Oturum</strong>
                  <span>{conf.program?.length || 0}</span>
                </li>
                <li>
                  <strong>Oluşturma</strong>
                  <span>
                    {conf.createdAt
                      ? new Date(conf.createdAt).toLocaleDateString("tr-TR")
                      : "-"}
                  </span>
                </li>
              </ul>

              <div className="previous-actions">
                <button
                  className="ghost"
                  onClick={() => {
                    localStorage.setItem("newConference", JSON.stringify(conf));
                    localStorage.setItem("isEditingConference", "true");
                    navigate("/dashboard/create");
                  }}
                >
                  Düzenle
                </button>
                <button
                  className="primary"
                  onClick={() => handleViewTemplate(conf)}
                >
                  Şablonu görüntüle
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
