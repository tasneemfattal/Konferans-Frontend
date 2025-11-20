import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    setUser(current);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      {/* Sol Menü */}
      <aside className="sidebar">
        <h3 className="sidebar-title">Admin Paneli</h3>

        {/* 👇 Kullanıcı adı göster */}
        {user && (
          <div className="user-box">
            <p> {user.name}</p>
            <small>{user.email}</small>
          </div>
        )}

    <ul className="menu">
  <li onClick={() => navigate("/dashboard/home")}>🏠 Ana Sayfa</li>
  <li onClick={() => navigate("/dashboard/previous")}>📅 Önceki Konferanslar</li>
  <li onClick={() => navigate("/dashboard/create")}>➕ Konferans Oluştur</li>
  <li onClick={() => navigate("/dashboard/profile")}>👤 Profilim</li>
  <li onClick={logout}>🚪 Çıkış Yap</li>
</ul>


      </aside>

      {/* Sağ İçerik Alanı */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

