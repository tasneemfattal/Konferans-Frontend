import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TemplateSelect.css";

const templateList = [
  {
    id: "modern",
    title: "Modern Tasarım",
    description:
      "Cam efektli hero alanı, timeline program akışı ve kart tabanlı duyurular.",
    previewPath: "/preview-modern",
    accent: "#f9a826",
    features: ["Cam hero", "Kurul kartları", "Program zaman çizelgesi"],
    status: "ready",
    thumbnail: "https://i.imgur.com/Pcnz7Lt.png",
  },
  {
    id: "classic",
    title: "Klasik Tasarım",
    description: "Daha resmi bir görünüm. Çok yakında.",
    previewPath: "#",
    accent: "#4b7bec",
    features: ["İkonik başlık", "Sütunlu içerik"],
    status: "soon",
    thumbnail: "https://i.imgur.com/vuAJhS2.png",
  },
  {
    id: "minimal",
    title: "Minimal Tasarım",
    description: "Sade ve beyaz boşluk odaklı layout. Çok yakında.",
    previewPath: "#",
    accent: "#00b894",
    features: ["Minimal grid"],
    status: "soon",
    thumbnail: "https://i.imgur.com/Nt8xziB.png",
  },
];

const readConference = () => {
  try {
    const raw = localStorage.getItem("newConference");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Konferans verileri okunamadı:", error);
    return null;
  }
};

export default function TemplateSelect() {
  const navigate = useNavigate();
  const [conference, setConference] = useState(null);

  useEffect(() => {
    setConference(readConference());
  }, []);

  const stats = useMemo(() => {
    if (!conference) return null;
    return [
      { label: "Program oturumu", value: conference.program?.length || 0 },
      {
        label: "Duyuru",
        value: conference.announcements?.length || 0,
      },
      {
        label: "Kurul üyesi",
        value:
          (conference.organizingCommittee?.length || 0) +
          (conference.scientificCommittee?.length || 0),
      },
      {
        label: "Sponsor logosu",
        value: conference.sponsorLogos?.length || 0,
      },
    ];
  }, [conference]);

  const handleTemplateSelect = (template) => {
    if (template.status !== "ready") return;
    if (!conference) {
      alert("Önce konferans bilgilerini kaydetmelisiniz.");
      navigate("/dashboard/create");
      return;
    }
    localStorage.setItem("selectedTemplate", template.id);
    navigate(template.previewPath);
  };

  const handleEditConference = () => {
    if (!conference) {
      navigate("/dashboard/create");
      return;
    }
    localStorage.setItem("isEditingConference", "true");
    navigate("/dashboard/create");
  };

  return (
    <div className="template-select">
      <div className="page-heading">
        <p>Şablon Adımı</p>
        <h1>Konferansınız için görünüm seçin</h1>
        <span>
          Verileriniz kaydedildi. Şimdi hangi tasarımın konferansınızı
          temsil edeceğini seçin.
        </span>
      </div>

      <div className="summary-card">
        {conference ? (
          <>
            <div>
              <p>Aktif konferans</p>
              <h3>{conference.name || "İsim belirtilmedi"}</h3>
              <span>
                {conference.date || "Tarih yok"} ·{" "}
                {conference.location || "Konum yok"}
              </span>
            </div>
            <div className="summary-stats">
              {stats?.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
            <button onClick={handleEditConference}>Düzenle</button>
          </>
        ) : (
          <>
            <div>
              <p>Henüz konferans kaydı yok</p>
              <h3>Şablon seçebilmek için formu doldurun</h3>
            </div>
            <button onClick={() => navigate("/dashboard/create")}>
              Konferans oluştur
            </button>
          </>
        )}
      </div>

      <div className="template-grid">
        {templateList.map((template) => (
          <article
            key={template.id}
            className={`template-card ${
              template.status === "soon" ? "is-disabled" : ""
            }`}
          >
            <div
              className="template-media"
              style={{ borderColor: template.accent }}
            >
              <img src={template.thumbnail} alt={template.title} />
            </div>
            <div className="template-body">
              <div className="template-tag">
                {template.status === "ready" ? "Kullanıma hazır" : "Çok yakında"}
              </div>
              <h3>{template.title}</h3>
              <p>{template.description}</p>
              <div className="template-feature-list">
                {template.features.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
            </div>
            <div className="template-actions">
              <button
                className="ghost"
                disabled={template.status !== "ready"}
                onClick={() => handleTemplateSelect(template)}
              >
                Önizle
              </button>
              <button
                className="primary"
                disabled={template.status !== "ready"}
                onClick={() => handleTemplateSelect(template)}
              >
                Bu şablonu kullan
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
