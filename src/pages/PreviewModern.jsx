import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TemplateModern from "../components/templates/TemplateModern.jsx";
import "../components/templates/TemplateModern.css";

const parseConference = () => {
  try {
    const raw = localStorage.getItem("newConference");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Konferans verisi okunamadı:", error);
    return null;
  }
};

const readPreviousConferences = () => {
  try {
    const raw = localStorage.getItem("previousConferences");
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Önceki konferanslar okunamadı:", error);
    return [];
  }
};

export default function PreviewModern() {
  const navigate = useNavigate();
  const conference = useMemo(() => parseConference(), []);
  const hasData = Boolean(conference && Object.keys(conference).length);

  const handleUseTemplate = () => {
    if (!hasData) {
      alert("Lütfen önce konferans bilgilerini doldurup kaydedin.");
      navigate("/dashboard/create");
      return;
    }

    const finalizedConference = {
      ...conference,
      template: "modern",
      id:
        conference.id ||
        (typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString()),
      createdAt: new Date().toISOString(),
    };

    const previousList = readPreviousConferences().filter(
      (item) => item.id !== finalizedConference.id
    );
    localStorage.setItem(
      "previousConferences",
      JSON.stringify([finalizedConference, ...previousList])
    );

    localStorage.removeItem("newConference");
    localStorage.removeItem("selectedTemplate");
    localStorage.removeItem("isEditingConference");

    navigate("/dashboard/previous", {
      state: { success: true, conferenceName: finalizedConference.name },
      replace: true,
    });
  };

  return (
    <div>
      <div className="preview-toolbar">
        <div>
          <h3>Modern Tasarım Önizlemesi</h3>
          <p>
            Aşağıdaki sayfa, kaydettiğiniz konferans bilgileriyle nasıl
            görüneceğini gösterir.
          </p>
        </div>
        <div className="toolbar-actions">
          <button
            className="ghost"
            onClick={() => navigate("/dashboard/create/template-select")}
          >
            Şablon listesine dön
          </button>
          <button className="primary" onClick={handleUseTemplate}>
            Konferansımı bu şablonla oluştur
          </button>
        </div>
      </div>

      <TemplateModern data={conference ?? undefined} isPreview />
    </div>
  );
}

