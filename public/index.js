// Firebase SDK'yı CDN'den alıyoruz (v10 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// 🔐 Firebase config – senin panelindeki değerlerle birebir aynı olmalı
const firebaseConfig = {
  apiKey: "AZaSyB5SFzupjc0Ki2-FZiTlnyCziaD_Dy1DL1",        // sende ne yazıyorsa
  authDomain: "goalshift-app.firebaseapp.com",
  projectId: "goalshift-app",
  storageBucket: "goalshift-app.appspot.com",
  messagingSenderId: "10190573722",
  appId: "1:10190573722:web:93ba014a4263ce1702cf23",
};

// 🔧 Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🧠 DOM elementlerini yakala
const loginButton = document.getElementById("google-login-btn");

// Kullanıcı login olduysa burada yakalayacağız (ileride panel vs. için lazım)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Giriş yapan:", user.email || user.uid);
    // İleride: burada "Bugünün tahmini" ekranına geçebiliriz
  } else {
    console.log("Henüz giriş yok");
  }
});

// 🔑 Google ile giriş fonksiyonu
async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Giriş başarılı:", user.email || user.uid);
    alert("Giriş başarılı: " + (user.email || user.displayName || "Kullanıcı"));
    // TODO: burada Firestore'a kayıt, panel, vs.
  } catch (error) {
    console.error("Giriş hatası:", error);
    alert("Giriş sırasında hata oluştu: " + (error.code || error.message));
  }
}

// Butona tıklanınca popup'ı aç
if (loginButton) {
  loginButton.addEventListener("click", handleGoogleLogin);
} else {
  console.error("google-login-btn ID'li buton bulunamadı!");
}
