import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// BURAYA KENDİ FIREBASE CONFIG'İNİ KOY
// const firebaseConfig = { ... } şeklinde
const firebaseConfig = {
  // ÖRNEK (bunu kendi projendekilerle değiştir):
  apiKey: "SENİN_API_KEY",
  authDomain: "SENIN_PROJEN.firebaseapp.com",
  projectId: "SENIN_PROJEN",
  appId: "SENIN_APP_ID",
};

const app = initializeApp(firebaseConfig); // <-- SADECE BURADA TANIMLI
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const button = document.getElementById("googleSignIn");
const statusEl = document.getElementById("status");

button.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Giriş başarılı", user);
    statusEl.textContent = `Hoş geldin, ${user.displayName || user.email}`;
  } catch (err) {
    console.error("Giriş hatası:", err);
    statusEl.textContent = "Giriş başarısız: " + err.message;
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    statusEl.textContent = `Zaten giriş yaptın: ${user.email}`;
  } else {
    statusEl.textContent = "Henüz giriş yapmadın.";
  }
});
