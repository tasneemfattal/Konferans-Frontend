import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 📄 استيراد الصفحة الرئيسية
import Home from "./pages/Home";
import Kurullar from "./pages/Kurullar";
import Cagrilar from "./pages/Cagrilar";
import Yazarlar from "./pages/Yazarlar";
import Tarihler from "./pages/Tarihler";
import Gecmis from "./pages/Gecmis";
import Duyurular from "./pages/Duyurular";
import Program from "./pages/Program";
import DuzenlemeKurulu from "./pages/DuzenlemeKurulu";
import BilimKurulu from "./pages/BilimKurulu";


// 🖼️ استيراد الصور من مجلد images
import asyuLogo from "./images/asyu_logo.png";
import ieeeLogo from "./images/ieee_logo.png";
import ieeesmcLogo from "./images/ieeesmc_logo.png";
import btuLogo from "./images/btu_logo.png";
import ytuLogo from "./images/ytu_logo.png";

function App() {
  return (
    <Router>
      <div>
        {/* 🔹 الشريط العلوي */}
        <nav className="border-bottom bg-white">
          <div className="container py-3 d-flex justify-content-between align-items-center flex-wrap">

            {/* يسار - شعار ASYU */}
            <div className="d-flex align-items-center">
              <img
                src={asyuLogo}
                alt="ASYU Logo"
                style={{ height: "70px", marginRight: "10px" }}
              />
            </div>

            {/* منتصف - العنوان */}
            <div className="d-flex justify-content-center align-items-center flex-column text-center flex-grow-1">
              <h3 className="fw-bold text-primary mb-1">
                ASYU <span className="text-warning">2025</span>
              </h3>
              <h6 className="text-muted mb-2">
                Akıllı Sistemlerde Yenilikler ve Uygulamaları Konferansı
              </h6>

              {/* شعارات المنتصف */}
              <div className="d-flex justify-content-center align-items-center gap-3">
                <img
                  src={ieeesmcLogo}
                  alt="IEEE SMC"
                  style={{ height: "40px" }}
                />
                <img
                  src={ieeeLogo}
                  alt="IEEE Türkiye"
                  style={{ height: "40px" }}
                />
              </div>
            </div>

            {/* يمين - شعارات الجامعات */}
            <div className="d-flex align-items-center gap-3">
              <img src={btuLogo} alt="BTÜ" style={{ height: "55px" }} />
              <img src={ytuLogo} alt="YTU" style={{ height: "55px" }} />
            </div>
          </div>

          {/* 🔹 قائمة التنقل */}
          <div className="border-top">
            <div className="container">
              <ul className="nav justify-content-center py-2">
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/">Ana Sayfa</Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-dark"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Kurullar
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/duzenlemekurulu">
                        Düzenleme Kurulu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/bilimkurulu">
                        Bilim Kurulu
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/cagrilar">Çağrılar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/yazarlar">Yazarlar İçin</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/tarihler">Önemli Tarihler</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/gecmis">Geçmiş</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/duyurular">Duyurular</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-primary" to="/program">Program</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* 🔹 نظام التوجيه (Routing) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kurullar" element={<Kurullar />} />
          <Route path="/cagrilar" element={<Cagrilar />} />
          <Route path="/yazarlar" element={<Yazarlar />} />
          <Route path="/tarihler" element={<Tarihler />} />
          <Route path="/gecmis" element={<Gecmis />} />
          <Route path="/duyurular" element={<Duyurular />} />
          <Route path="/program" element={<Program />} />
          <Route path="/duzenlemekurulu" element={<DuzenlemeKurulu />} />
          <Route path="/bilimkurulu" element={<BilimKurulu />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
