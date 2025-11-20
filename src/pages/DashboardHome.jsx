import React, { useEffect, useState } from "react";

export default function DashboardHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    setUser(current);
  }, []);

  return (
    <div className="dashboard-home">
      <h2>🏠 Ana Sayfa</h2>
      {user && (
        <p>
          Hoş geldin, <strong>{user.name}</strong> 🎉
        </p>
      )}
      <p>
        Buradan konferanslarını yönetebilir, yeni konferans oluşturabilir veya profil bilgilerini düzenleyebilirsin.
      </p>
    </div>
  );
}
