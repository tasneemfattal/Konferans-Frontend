import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  // 🔹 Kullanıcı listesi varsa al, yoksa boş array başlat
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLogin) {
    // 🔸 GİRİŞ KISMI
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      alert(`Hoş geldin, ${foundUser.name}! 🎉`);
      navigate("/dashboard");
    } else {
      alert("E-posta veya şifre hatalı!");
    }
  } else {
    // 🔸 KAYIT KISMI
    if (name && email && password) {
      // aynı email varsa uyar
      const alreadyExists = users.some((u) => u.email === email);
      if (alreadyExists) {
        alert("Bu e-posta ile zaten kayıtlı bir kullanıcı var!");
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser); // listeye ekle
      localStorage.setItem("users", JSON.stringify(users)); // users listesi kaydet
      localStorage.setItem("currentUser", JSON.stringify(newUser)); // aktif kullanıcı
      alert(`${name} kaydın tamamlandı 🎉`);
      setIsLogin(true); // giriş sayfasına geç
    } else {
      alert("Lütfen tüm alanları doldurun!");
    }
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <h2>{isLogin ? "Hoş geldin!" : "Yeni hesap oluştur"}</h2>
          <p>
            {isLogin
              ? "Lütfen hesabına giriş yaparak devam et."
              : "Yeni bir hesap oluştur ve konferansını yönet."}
          </p>
        </div>

        <div className="auth-right">
          <h3>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h3>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Ad Soyad"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              {isLogin ? "GİRİŞ YAP" : "HESAP OLUŞTUR"}
            </button>
          </form>

          <p className="switch-text">
            {isLogin ? (
              <>
                Hesabın yok mu?{" "}
                <span onClick={() => setIsLogin(false)}>Kayıt ol</span>
              </>
            ) : (
              <>
                Zaten hesabın var mı?{" "}
                <span onClick={() => setIsLogin(true)}>Giriş yap</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
