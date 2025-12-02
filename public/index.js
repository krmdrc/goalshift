// Firebase SDK'yı CDN'den modüler şekilde yüklüyoruz
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// 🔐 Senin proje ayarların (Firebase ekranındaki ile aynı)
const firebaseConfig = {
  apiKey: "AIzaSyB55Fzupjc0Ki2-FZiLTnyCziaD_Dy1DLI",
  authDomain: "goalshift-app.firebaseapp.com",
  projectId: "goalshift-app",
  storageBucket: "goalshift-app.firebasestorage.app",
  messagingSenderId: "10190573722",
  appId: "1:10190573722:web:93ba014a2463ce1702cf23",
};

// ❗ Burada SADECE 1 kere initialize ediyoruz
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Butonu bul
const googleBtn = document.getElementById("googleSignInBtn");

if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      googleBtn.disabled = true;
      googleBtn.style.opacity = "0.7";
      googleBtn.textContent = "Giriş yapılıyor...";

      const result = await signInWithPopup(auth, provider);

      console.log("Giriş başarılı:", result.user.email);

      // Şimdilik sadece küçük bir mesaj gösterelim
      alert("Giriş başarılı: " + (result.user.email || "Google hesabı"));

      googleBtn.disabled = false;
      googleBtn.style.opacity = "1";
      googleBtn.textContent = "Google ile giriş yap";
    } catch (error) {
      console.error("Google ile giriş hatası:", error);
      alert("Giriş sırasında bir hata oluştu. Konsolu kontrol et (F12).");

      googleBtn.disabled = false;
      googleBtn.style.opacity = "1";
      googleBtn.textContent = "Google ile giriş yap";
    }
  });
} else {
  console.error("googleSignInBtn butonu bulunamadı!");
}
