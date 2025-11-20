import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./TemplateModern.css";

const FALLBACK_CONFERENCE = {
  name: "ASYU 2025 - Akıllı Sistemlerde Yenilikler ve Uygulamaları",
  date: "10 – 12 Eylül 2025",
  description:
    "Akıllı sistemler ekosistemindeki en güncel araştırmaların, atölyelerin ve yenilikçi çözümlerin paylaşıldığı prestijli konferansımıza davetlisiniz.",
  location: "Bursa Teknik Üniversitesi",
  logo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Asyu_logo.svg/512px-Asyu_logo.svg.png",
  coverImage: "https://i.imgur.com/pG6PvPr.jpeg",
  hostUniversities: [
    "https://i.imgur.com/lYo5d5s.png",
    "https://i.imgur.com/0YcbFZG.png",
  ],
  sponsorLogos: [
    "/templates/sponsor1.png.png",
    "/templates/sponsor2.png.png",
  ],
  financialSponsors: [
    {
      name: "TechNova",
      logo: "https://i.imgur.com/FTkT5f1.png",
    },
  ],
  scientificCommittee: [
    "Prof. Dr. Elif Güneş",
    "Prof. Dr. Cem Aksoy",
    "Doç. Dr. Melike Aydın",
  ],
  organizingCommittee: [
    "Prof. Dr. Ahmet Yılmaz",
    "Dr. Öğr. Üyesi Ayşe Demir",
    "Arş. Gör. Mehmet Karaca",
  ],
  importantDates: [
    { title: "Bildiri Gönderimi Sonu", date: "20 Mayıs 2025" },
    { title: "Kabul Bildirimi", date: "30 Haziran 2025" },
    { title: "Erken Kayıt", date: "15 Temmuz 2025" },
    { title: "Konferans", date: "10 – 12 Eylül 2025" },
  ],
  announcements: [
    {
      title: "Bildiriler IEEE Xplore'da",
      text: "Tüm kabul edilen bildiriler IEEE Xplore'da yayımlanacaktır.",
    },
    {
      title: "Yüz Yüze & Hibrit",
      text: "Konferansımız yüz yüze, yurtdışı katılımcılar için hibrit şekilde gerçekleşecektir.",
    },
  ],
  program: [
    {
      date: "10 Eylül 2025",
      time: "09:30 – 10:15",
      speaker: "Açılış",
      topic: "Protokol Konuşmaları",
    },
    {
      date: "10 Eylül 2025",
      time: "10:30 – 12:30",
      speaker: "Oturum 1",
      topic: "Akıllı Sistemlerde Algoritmalar",
    },
    {
      date: "11 Eylül 2025",
      time: "13:30 – 15:30",
      speaker: "Oturum 2",
      topic: "Yapay Zeka & Sağlık",
    },
  ],
};

const safeParseConference = (raw) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    console.warn("Konferans verisi çözümlenemedi:", error);
    return null;
  }
};

const getMapEmbedUrl = (location) => {
  if (!location) return null;
  if (/^https?:\/\//i.test(location)) return location;
  return `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;
};

const readPreviousById = (id) => {
  if (!id) return null;
  try {
    const raw = localStorage.getItem("previousConferences");
    if (!raw) return null;
    const list = JSON.parse(raw);
    return list.find((item) => item.id === id) || null;
  } catch (error) {
    console.warn("Önceki konferans bulunamadı:", error);
    return null;
  }
};

const withFallback = (data) => {
  if (!data) return FALLBACK_CONFERENCE;
  return {
    ...FALLBACK_CONFERENCE,
    ...data,
  };
};

const chunkArray = (arr, size) =>
  arr.reduce((acc, curr, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(curr);
    return acc;
  }, []);

export default function TemplateModern({ data, isPreview = false }) {
  const location = useLocation();
  const routeConference = useMemo(() => {
    if (!location) return null;
    const params = new URLSearchParams(location.search);
    const confId = params.get("id");
    if (!confId) return null;
    return readPreviousById(confId);
  }, [location]);

  const conference = useMemo(() => {
    if (data) return withFallback(data);
    if (routeConference) return withFallback(routeConference);
    const stored = safeParseConference(localStorage.getItem("newConference"));
    return withFallback(stored);
  }, [data, routeConference]);

  const heroImage =
    conference.coverImage || FALLBACK_CONFERENCE.coverImage || "";
  const hostLogos =
    conference.hostUniversities?.length > 0
      ? conference.hostUniversities
      : FALLBACK_CONFERENCE.hostUniversities;
  const sponsorLogos =
    conference.sponsorLogos?.length > 0
      ? conference.sponsorLogos
      : FALLBACK_CONFERENCE.sponsorLogos;
  const financialSponsors =
    conference.financialSponsors?.length > 0
      ? conference.financialSponsors
      : FALLBACK_CONFERENCE.financialSponsors;
  const committees = {
    organizing: conference.organizingCommittee ?? [],
    scientific: conference.scientificCommittee ?? [],
  };

  const importantDates = conference.importantDates ?? [];
  const announcements = conference.announcements ?? [];
  const program = conference.program ?? [];
  const mapEmbedUrl = useMemo(
    () => getMapEmbedUrl(conference.location),
    [conference.location]
  );

  const topics =
    typeof conference.topics === "string"
      ? conference.topics
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
  const importantDateColumns = chunkArray(
    importantDates.length ? importantDates : FALLBACK_CONFERENCE.importantDates,
    2
  );

  return (
    <div className={`modern-page ${isPreview ? "modern-page--preview" : ""}`}>
      <header className="site-header">
        <div className="brand">
          <img
            src={
              conference.logo ||
              "https://upload.wikimedia.org/wikipedia/commons/f/fb/Asyu_logo.svg"
            }
            alt="Konferans logosu"
          />
          <div className="brand-text">
            <h1>{conference.name || "Konferans Adı"}</h1>
            <p>{conference.subtitle || "Kısa açıklama burada yer alacak"}</p>
          </div>
        </div>
        <div className="partner-logos">
          {hostLogos.slice(0, 2).map((logo, index) => (
            <img key={`partner-${index}`} src={logo} alt={`partner-${index}`} />
          ))}
        </div>
      </header>

      <nav className="primary-nav" aria-label="Ana menü">
        <ul>
          {[
            { href: "#welcome", label: "Hoş Geldiniz" },
            { href: "#committees", label: "Kurullar" },
            { href: "#dates", label: "Önemli Tarihler" },
            { href: "#announcements", label: "Duyurular" },
            { href: "#program", label: "Program" },
            { href: "#sponsors", label: "Sponsorlar" },
            { href: "#location", label: "Konum" },
          ].map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {sponsorLogos?.length > 0 && (
        <div className="hero-sponsor-strip">
          {sponsorLogos.map((logo, index) => (
            <div key={`hero-sponsor-${index}`}>
              <img src={logo} alt={`sponsor-${index}`} />
            </div>
          ))}
        </div>
      )}

      <header
        className="modern-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(17,62,104,.84), rgba(13,30,54,.88)), url('${heroImage}')`,
        }}
      >
        <div className="hero-content">
          <div className="hero-chip">Modern Tasarım</div>
          <h1>{conference.name}</h1>

          <div className="hero-meta">
            <div>
              <span>Tarih</span>
              <strong>{conference.date}</strong>
            </div>
            <div>
              <span>Konum</span>
              <strong>{conference.location}</strong>
            </div>
          </div>
        </div>
      </header>

      <section className="info-badges">
        {[
          { label: "Sponsor", value: sponsorLogos.length },
          { label: "Program Oturumu", value: program.length },
          { label: "Kurul Üyesi", value: committees.organizing.length },
          { label: "Duyuru", value: announcements.length },
        ].map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="section-card host-section">
        <div className="section-head">
          <div>
            <p>Ev Sahibi Kurumlar</p>
            <h2>Üniversite Ortaklarımız</h2>
          </div>
        </div>
        <div className="logo-row">
          {hostLogos.map((logo, index) => (
            <div key={`${logo}-${index}`} className="logo-pill">
              <img src={logo} alt={`host-${index}`} />
            </div>
          ))}
        </div>
      </section>

      {!!topics.length && (
        <section className="section-card topics-section">
          <div className="section-head">
            <div>
              <p>Konferans Temaları</p>
              <h2>Öne Çıkan Başlıklar</h2>
            </div>
          </div>
          <div className="chip-grid">
            {topics.map((topic) => (
              <span key={topic} className="topic-chip">
                {topic}
              </span>
            ))}
          </div>
        </section>
      )}

      <section id="dates" className="section-card dates-section">
        <div className="section-head">
          <div>
            <p>Takvim</p>
            <h2>Önemli Tarihler</h2>
          </div>
        </div>
        <div className="date-columns">
          {importantDateColumns.map((column, columnIndex) => (
            <div key={`date-col-${columnIndex}`} className="date-column">
              {column.map((item, index) => (
                <article key={`${item.title}-${index}`} className="date-card">
                  <span>{item.title}</span>
                  <strong>{item.date}</strong>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="committees" className="section-card committees-section">
        <div className="section-head">
          <div>
            <p>Takım</p>
            <h2>Kurul Üyeleri</h2>
          </div>
        </div>
        <div className="committee-columns">
          <div className="committee-column">
            <h3>Düzenleme Kurulu</h3>
            <ul>
              {(committees.organizing.length
                ? committees.organizing
                : ["Henüz eklenmedi"]
              ).map((member, index) => (
                <li key={`org-${index}`}>{member}</li>
              ))}
            </ul>
          </div>
          <div className="committee-column">
            <h3>Bilim Kurulu</h3>
            <ul>
              {(committees.scientific.length
                ? committees.scientific
                : ["Henüz eklenmedi"]
              ).map((member, index) => (
                <li key={`sci-${index}`}>{member}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="announcements" className="section-card announcements-section">
        <div className="section-head">
          <div>
            <p>Güncel</p>
            <h2>Duyurular</h2>
          </div>
        </div>
        <div className="announcement-list">
          {(announcements.length
            ? announcements
            : FALLBACK_CONFERENCE.announcements
          ).map((announcement, index) => (
            <article key={`${announcement.title}-${index}`}>
              <h4>{announcement.title}</h4>
              <p>{announcement.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="program" className="section-card program-section">
        <div className="section-head">
          <div>
            <p>Plan</p>
            <h2>Konferans Programı</h2>
          </div>
        </div>
        <div className="program-table">
          <div className="program-header">
            <span>Tarih</span>
            <span>Saat</span>
            <span>Konu</span>
            <span>Konuşmacı</span>
          </div>
          {(program.length ? program : FALLBACK_CONFERENCE.program).map(
            (session, index) => (
              <div key={`${session.topic}-${index}`} className="program-row">
                <span>{session.date}</span>
                <span>{session.time}</span>
                <span>{session.topic}</span>
                <span>{session.speaker}</span>
              </div>
            )
          )}
        </div>
      </section>

      <section id="sponsors" className="section-card sponsors-section">
        <div className="section-head">
          <div>
            <p>Destekçiler</p>
            <h2>Sponsorlarımız</h2>
          </div>
        </div>
        <div className="financial-grid">
          {financialSponsors.map((sponsor, index) => (
            <article key={`${sponsor.name}-${index}`}>
              {sponsor.logo && <img src={sponsor.logo} alt={sponsor.name} />}
              <p>{sponsor.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="location" className="section-card location-section">
        <div className="section-head">
          <div>
            <p>Konum</p>
            <h2>Ev Sahibi Şehir</h2>
          </div>
        </div>
        <div className="location-card">
          <div>
            <h3>{conference.location}</h3>
            <p>
              Tüm teknik oturumlar, sponsor stantları ve ödül töreni aynı kampüste
              gerçekleştirilecektir.
            </p>
            {conference.location && (
              <a
                href={
                  /^https?:\/\//i.test(conference.location)
                    ? conference.location
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        conference.location
                      )}`
                }
                target="_blank"
                rel="noreferrer"
                className="location-link"
              >
                Google Maps'te aç
              </a>
            )}
          </div>
          {mapEmbedUrl && (
            <div className="map-frame">
              <iframe
                title="Konferans konumu"
                src={mapEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

