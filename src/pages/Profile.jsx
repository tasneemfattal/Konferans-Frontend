import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    setUser(current);
  }, []);

  const handleSave = () => {
    if (!user) return;

    if (!newPassword.trim()) {
      alert("Lütfen yeni bir şifre girin!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, password: newPassword } : u
    );

    const updatedUser = { ...user, password: newPassword };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setNewPassword("");
    alert("Şifreniz başarıyla güncellendi ✅");
  };

  return (
    <div className="profile-page">
      <h2>👤 Profil Bilgileri</h2>
      {user ? (
        <div className="profile-form">
          <label>Ad Soyad</label>
          <input type="text" value={user.name} disabled />

          <label>E-posta</label>
          <input type="text" value={user.email} disabled />

          <label>Yeni Şifre</label>
          <input
            type="password"
            placeholder="Yeni şifre gir"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button onClick={handleSave}>Kaydet</button>
        </div>
      ) : (
        <p>Kullanıcı bilgileri yükleniyor...</p>
      )}
    </div>
  );
}
