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
  apiKey: "AIzaSyB55Fzupjc0Ki2-FZiTlnyCziaD_Dy1DlI",
  authDomain: "goalshift-app.firebaseapp.com",
  projectId: "goalshift-app",
  appId: "1:10190573722:web:93ba014a4263ce1702cf23",
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
