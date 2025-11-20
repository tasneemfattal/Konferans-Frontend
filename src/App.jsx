import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import CreateConference from "./pages/CreateConference.jsx";
import PreviousConferences from "./pages/PreviousConferences.jsx";
import Profile from "./pages/Profile.jsx";
import PreviewModern from "./pages/PreviewModern.jsx";
import TemplateModern from "./components/templates/TemplateModern.jsx";
import DashboardHome from "./pages/DashboardHome.jsx"; // 🏠 yeni ana sayfa eklendi
import TemplateSelect from "./pages/TemplateSelect.jsx";

export default function App() {
  console.log("App render"); // debug
  return (
    <Routes>
      {/* 🔹 Ana Sayfa (Landing Page) */}
      <Route path="/" element={<Home />} />

      {/* 🔹 Giriş / Kayıt sayfası */}
      <Route path="/auth" element={<Auth />} />

      {/* 🔹 Dashboard yapısı (sol menü + içerik) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="home" element={<DashboardHome />} /> {/* 🏠 Ana Sayfa */}
        <Route path="create" element={<CreateConference />} />
        <Route path="previous" element={<PreviousConferences />} />
        <Route path="profile" element={<Profile />} />

        {/* Varsayılan olarak ana sayfaya yönlendir */}
        <Route index element={<Navigate to="home" replace />} />
      </Route>

      {/* 🔹 Şablon önizleme sayfaları */}
      <Route path="/preview-modern" element={<PreviewModern />} />
      
      <Route path="/template-modern" element={<TemplateModern />} />

      {/* 🔹 Geçersiz rota yakalama - Ana sayfaya yönlendir */}
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/dashboard/create/template-select" element={<TemplateSelect />} />

    </Routes>

    
  );
}
