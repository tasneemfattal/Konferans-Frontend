import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateConference.css";

export default function CreateConference() {
  const navigate = useNavigate();

  // 🔹 Tüm konferans bilgileri
  const [conference, setConference] = useState({
    name: "",
    date: "",
    description: "",
    subtitle: "",
    coverImage: "",
    logo: "",
    location: "",
    topics: "",
    sponsors: "",
    program: [],
    scientificCommittee: [],
    organizingCommittee: [],
    importantDates: [],
    announcements: [],
    sponsorLogos: [],          
    financialSponsors: [],  
    hostUniversities: [],   
  });
  const [hostUniversity, setHostUniversity] = useState("");


  // 🔹 Alan state’leri
  const [session, setSession] = useState({
    date: "",
    time: "",
    speaker: "",
    topic: "",
  });
  const [scientificMember, setScientificMember] = useState("");
  const [organizingMember, setOrganizingMember] = useState("");
  const [dateItem, setDateItem] = useState({ title: "", date: "" });
  const [announcement, setAnnouncement] = useState({ title: "", text: "" });

  

  //  finansal sponsor için ayrı state
  const [finSponsor, setFinSponsor] = useState({
    name: "",
    logo: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const shouldPrefill =
      localStorage.getItem("isEditingConference") === "true";
    const stored = localStorage.getItem("newConference");
    if (!shouldPrefill || !stored) return;
    try {
      const parsed = JSON.parse(stored);
      setConference((prev) => ({
        ...prev,
        ...parsed,
        program: parsed.program ?? [],
        scientificCommittee: parsed.scientificCommittee ?? [],
        organizingCommittee: parsed.organizingCommittee ?? [],
        importantDates: parsed.importantDates ?? [],
        announcements: parsed.announcements ?? [],
        sponsorLogos: parsed.sponsorLogos ?? [],
        hostUniversities: parsed.hostUniversities ?? [],
        financialSponsors: parsed.financialSponsors ?? [],
      }));
    } catch (error) {
      console.warn("Kaydedilmiş konferans yüklenemedi:", error);
    } finally {
      localStorage.removeItem("isEditingConference");
    }
  }, []);

  // 🔔 Hata mesajını 3 saniye sonra otomatik kaldır
React.useEffect(() => {
  if (error) {
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }
}, [error]);



  // 🔹 Genel değişiklik
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConference({ ...conference, [name]: value });
  };

  // 🔹 Tekil dosya yükleme (logo, coverImage)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files[0]) return;
    const reader = new FileReader();
    reader.onload = () =>
      setConference({ ...conference, [name]: reader.result });
    reader.readAsDataURL(files[0]);
  };

  


  //  Sponsor logosu ekleme (birden fazla)
  const handleSponsorLogoAdd = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setConference((prev) => ({
        ...prev,
        sponsorLogos: [...prev.sponsorLogos, reader.result],
      }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Finansal sponsor logo yükleme
  const handleFinSponsorLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFinSponsor((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Finansal sponsor ekle
  const addFinancialSponsor = () => {
    if (!finSponsor.name || !finSponsor.logo) {
      setError("⚠️ Finansal sponsor adı ve logosu zorunludur!");
      return;
    }
    setConference((prev) => ({
      ...prev,
      financialSponsors: [...prev.financialSponsors, finSponsor],
    }));
    setFinSponsor({ name: "", logo: "" });
    setError("");
  };

  // 🔹 Liste elemanı silme (genel)
  const removeItem = (type, index) => {
    const updatedList = conference[type].filter((_, i) => i !== index);
    setConference({ ...conference, [type]: updatedList });
  };

  // 🔹 Program ekleme
  const addSession = () => {
    if (
      session.date &&
      session.time &&
      session.speaker &&
      session.topic
    ) {
      setConference({
        ...conference,
        program: [...conference.program, session],
      });
      setSession({ date: "", time: "", speaker: "", topic: "" });
      setError("");
    } else setError("⚠️ Program alanlarını doldur!");
  };

  // 🔹 Kurul üyesi ekleme
  const addMember = (type, value, clearInput) => {
    if (value.trim() === "") return setError("⚠️ Lütfen isim girin!");
    setConference({
      ...conference,
      [type]: [...conference[type], value],
    });
    clearInput("");
    setError("");
  };

  // 🔹 Tarih ekleme
  const addDate = () => {
    if (dateItem.title && dateItem.date) {
      setConference({
        ...conference,
        importantDates: [...conference.importantDates, dateItem],
      });
      setDateItem({ title: "", date: "" });
      setError("");
    } else setError("⚠️ Tarih bilgilerini doldurun!");
  };

  // 🔹 Duyuru ekleme
  const addAnnouncement = () => {
    if (announcement.title && announcement.text) {
      setConference({
        ...conference,
        announcements: [...conference.announcements, announcement],
      });
      setAnnouncement({ title: "", text: "" });
      setError("");
    } else setError("⚠️ Duyuru bilgilerini doldurun!");
  };

 // 🔹 Form kontrolü
const validateForm = () => {
  let missingSections = [];

  // 🔹 Genel Bilgiler
  if (
    !conference.name ||
    !conference.date ||
    !conference.description ||
    !conference.logo ||
    !conference.coverImage ||
    !conference.location
  ) {
    missingSections.push("Genel Bilgiler");
  }

  // 🔹 Ev Sahibi Üniversiteler
  if (conference.hostUniversities.length === 0) {
    missingSections.push("Ev Sahibi Üniversiteler");
  }

  // 🔹 Sponsor Logoları
  if (conference.sponsorLogos.length === 0) {
    missingSections.push("Sponsor Logoları");
  }

  // 🔹 Finansal Sponsorlar
  if (conference.financialSponsors.length === 0) {
    missingSections.push("Finansal Sponsorlar");
  }

  // 🔹 Kurullar
  if (
    conference.scientificCommittee.length === 0 ||
    conference.organizingCommittee.length === 0
  ) {
    missingSections.push("Kurullar");
  }

  // 🔹 Önemli Tarihler
  if (conference.importantDates.length === 0) {
    missingSections.push("Önemli Tarihler");
  }

  // 🔹 Duyurular
  if (conference.announcements.length === 0) {
    missingSections.push("Duyurular");
  }

  // 🔹 Program
  if (conference.program.length === 0) {
    missingSections.push("Program");
  }

  // 🔹 Eksik varsa hata mesajı oluştur
  if (missingSections.length > 0) {
    const message = "⚠️ Eksik alanlar var: " + missingSections.join(", ") + ".";
    setError(message);

    // Sayfayı yukarı kaydır (isteğe bağlı)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    return false;
  }

  // 🔹 Her şey tamamsa
  setError("");
  return true;
};



  // 🔹 Kaydet
 const handleSave = () => {
  if (!validateForm()) return;

  // 🔹 Kaydet
  localStorage.setItem("newConference", JSON.stringify(conference));

  // 🔹 Başarı mesajı göster
  setSuccess("🎉 Konferans başarıyla kaydedildi! Şimdi template seçme sayfasına yönlendiriliyorsunuz...");

  // 🔹 1.5 saniye sonra yönlendir
  setTimeout(() => {
    navigate("/dashboard/create/template-select");
  }, 1500);
};


  return (
    <div className="create-conference">
      <h2>📝 Konferans Oluştur</h2>
      <p className="subtitle">Tüm alanları doldurmanız gerekmektedir.</p>

      {error && <div className="error-box">{error}</div>}
      {success && <div className="success-box">{success}</div>}


      {/* 🔹 Genel Bilgiler */}
      <div className="form-section">
        <h3>📘 Genel Bilgiler</h3>

        <label>
          Konferans Adı <span className="required">*</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Örn: Akıllı Sistemlerde Yenilikler ve Uygulamalar Konferansı"
          value={conference.name}
          onChange={handleChange}
        />

        <label>
          Tarih <span className="required">*</span>
        </label>
        <input
          name="date"
          type="text"
          placeholder="Örn: 10–12 Eylül 2025"
          value={conference.date}
          onChange={handleChange}
        />

        <label>
          Açıklama <span className="required">*</span>
        </label>
        <textarea
          name="description"
          placeholder="Konferans hakkında kısa bir açıklama yazın..."
          value={conference.description}
          onChange={handleChange}
        ></textarea>

        <label>
          Kısa Alt Başlık <span className="required">*</span>
        </label>
        <input
          name="subtitle"
          type="text"
          placeholder="Örn: Akıllı Sistemlerde Yenilikler ve Uygulamaları Konferansı"
          value={conference.subtitle}
          onChange={handleChange}
        />

        <label>
          Konum <span className="required">*</span>{" "}
          <small className="hint">
            (Yer ismi veya Google Maps bağlantısı yazabilirsiniz)
          </small>
        </label>
        <input
          name="location"
          type="text"
          placeholder="Örn: Bursa Teknik Üniversitesi / https://maps.google.com/..."
          value={conference.location}
          onChange={handleChange}
        />

        <label>
          Logo <span className="required">*</span>
        </label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleFileChange}
        />

        <label>
          Kapak Fotoğrafı <span className="required">*</span>
        </label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

       {/*  🔹 Ev Sahibi Üniversiteler */}
      <div className="form-section">
         <label>
        Ev Sahibi Üniversiteler <span className="required">*</span>
       </label>
       
        <p className="small-hint">
          Konferansa ev sahipliği yapan üniversitelerin logolarını buradan ekleyin (örnek: BTÜ, YTÜ).
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () =>
              setConference((prev) => ({
                ...prev,
                hostUniversities: [...prev.hostUniversities, reader.result],
              }));
            reader.readAsDataURL(file);
          }}
        />

        <div className="host-logos-preview">
          {conference.hostUniversities.map((logo, i) => (
            <div key={i} className="host-logo-box">
              <img src={logo} alt={`host-${i}`} />
              <button
                className="remove-btn"
                onClick={() => removeItem("hostUniversities", i)}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Sponsor Logoları (üstteki bölüm gibi) */}
      <div className="form-section">
         <label>
        Sponsor Logoları <span className="required">*</span>
       </label>
        <h3></h3>
        <p className="small-hint">
          Buraya sadece logo yükleyebilirsiniz. Sağ üstte görünen logolar gibi.
        </p>
        <input type="file" accept="image/*" onChange={handleSponsorLogoAdd} />

        <div className="sponsor-logos-preview">
          {conference.sponsorLogos.map((logo, i) => (
            <div key={i} className="sponsor-logo-box">
              <img src={logo} alt={`sponsor-${i}`} />
              <button
                className="remove-btn"
                onClick={() => removeItem("sponsorLogos", i)}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Finansal Sponsorlar */}
      <div className="form-section">
            <label>
        Finansal Sponsorlar<span className="required">*</span>
       </label>
        <h3></h3>
        <div className="inline-input">
          <input
            type="text"
            placeholder="Sponsor adı (örn: Kurukahveci ...)"
            value={finSponsor.name}
            onChange={(e) =>
              setFinSponsor((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input type="file" accept="image/*" onChange={handleFinSponsorLogo} />
          <button onClick={addFinancialSponsor}>Ekle</button>
        </div>

        <ul className="financial-list">
          {conference.financialSponsors.map((fs, i) => (
            <li key={i} className="financial-item">
              <div className="fin-left">
                {fs.logo && <img src={fs.logo} alt={fs.name} />}
                <span>{fs.name}</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeItem("financialSponsors", i)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Kurullar */}
      <div className="form-section">
        <h3>👥 Kurullar</h3>

        <label>
          Bilim Kurulu <span className="required">*</span>
        </label>
        <div className="inline-input">
          <input
            type="text"
            placeholder="Üye adı"
            value={scientificMember}
            onChange={(e) => setScientificMember(e.target.value)}
          />
          <button
            onClick={() =>
              addMember(
                "scientificCommittee",
                scientificMember,
                setScientificMember
              )
            }
          >
            Ekle
          </button>
        </div>
        <ul>
          {conference.scientificCommittee.map((m, i) => (
            <li key={i}>
              - {m}
              <button
                className="remove-btn"
                onClick={() => removeItem("scientificCommittee", i)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>

        <label>
          Düzenleme Kurulu <span className="required">*</span>
        </label>
        <div className="inline-input">
          <input
            type="text"
            placeholder="Üye adı"
            value={organizingMember}
            onChange={(e) => setOrganizingMember(e.target.value)}
          />
          <button
            onClick={() =>
              addMember(
                "organizingCommittee",
                organizingMember,
                setOrganizingMember
              )
            }
          >
            Ekle
          </button>
        </div>
        <ul>
          {conference.organizingCommittee.map((m, i) => (
            <li key={i}>
              - {m}
              <button
                className="remove-btn"
                onClick={() => removeItem("organizingCommittee", i)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Önemli Tarihler */}
      <div className="form-section">
        <label>
          📅 Önemli Tarihler <span className="required">*</span>
        </label>
        <div className="inline-input">
          <input
            type="text"
            placeholder="Etkinlik"
            value={dateItem.title}
            onChange={(e) =>
              setDateItem({ ...dateItem, title: e.target.value })
            }
          />
          <input
            type="date"
            value={dateItem.date}
            onChange={(e) =>
              setDateItem({ ...dateItem, date: e.target.value })
            }
          />
          <button onClick={addDate}>Ekle</button>
        </div>
        <ul>
          {conference.importantDates.map((d, i) => (
            <li key={i}>
              📌 {d.title} – {d.date}
              <button
                className="remove-btn"
                onClick={() => removeItem("importantDates", i)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Duyurular */}
      <div className="form-section">
        <label>📢 Duyurular <span className="required">*</span></label>
        <input
          type="text"
          placeholder="Başlık"
          value={announcement.title}
          onChange={(e) =>
            setAnnouncement({ ...announcement, title: e.target.value })
          }
        />
        <textarea
          placeholder="Açıklama"
          value={announcement.text}
          onChange={(e) =>
            setAnnouncement({ ...announcement, text: e.target.value })
          }
        ></textarea>
        <button onClick={addAnnouncement}>Ekle</button>
        <ul>
          {conference.announcements.map((a, i) => (
            <li key={i}>
              📢 {a.title} – {a.text}
              <button
                className="remove-btn"
                onClick={() => removeItem("announcements", i)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Program */}
      <div className="form-section">
        <label>
          🕒 Konferans Programı <span className="required">*</span>
        </label>
        <div className="program-form">
          <input
            type="date"
            value={session.date}
            onChange={(e) =>
              setSession({ ...session, date: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Saat"
            value={session.time}
            onChange={(e) =>
              setSession({ ...session, time: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Konuşmacı"
            value={session.speaker}
            onChange={(e) =>
              setSession({ ...session, speaker: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Konu Başlığı"
            value={session.topic}
            onChange={(e) =>
              setSession({ ...session, topic: e.target.value })
            }
          />
          <button onClick={addSession}>Ekle</button>
        </div>
        <ul className="program-list">
          {conference.program.map((s, i) => (
            <li key={i}>
              {s.date} | {s.time} – {s.speaker}: {s.topic}
              <button
                className="remove-btn"
                onClick={() => removeItem("program", i)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>

           <button className="save-btn" onClick={handleSave}>
        💾 Kaydet ve Template Seç
      </button>

      {/* 🔹 Sabit hata kutusu */}
      {/*error && <div className="error-fixed">{error}</div>*/}
      {error && <div className={`error-fixed ${!error ? "fade-out" : ""}`}>{error}</div>}


    </div>
  );
}


