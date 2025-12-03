// Firebase SDK'ları - CDN üzerinden
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// ⚠️ BURAYI KENDİ PROJENİN AYARLARIYLA DOLDUR
// Firebase console → Project settings → General → Your apps → SDK config
const firebaseConfig = {
  apiKey: "AIzaSyB55Fzupjc0Ki2-FZiTlnyCziaD_Dy1DlI",
  authDomain: "goalshift-app.firebaseapp.com",
  projectId: "goalshift-app",
  storageBucket: "goalshift-app.firebasestorage.app",
  messagingSenderId: "10190573722",
  appId: "1:10190573722:web:93ba014a4263ce1702cf23",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elemanları
const loggedOutEl = document.getElementById("logged-out");
const loggedInEl = document.getElementById("logged-in");
const googleLoginBtn = document.getElementById("googleLogin");
const errorEl = document.getElementById("error");

const welcomeTextEl = document.getElementById("welcomeText");
const userEmailEl = document.getElementById("userEmail");

const adminPanelEl = document.getElementById("adminPanel");
const logoutRowEl = document.getElementById("logoutRow");

const pickInputEl = document.getElementById("pickInput");
const savePickBtn = document.getElementById("savePick");
const currentPickTextEl = document.getElementById("currentPickText");
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtn2 = document.getElementById("logoutBtn2");

// Admin e-postası (sen)
const ADMIN_EMAIL = "keremdarici@gmail.com";

// Firestore'da doküman referansı
const pickDocRef = doc(db, "config", "dailyPick");

// UI yardımcıları
function showLoggedOut() {
  loggedOutEl.style.display = "block";
  loggedInEl.style.display = "none";
  errorEl.textContent = "";
}

function showLoggedIn(user) {
  loggedOutEl.style.display = "none";
  loggedInEl.style.display = "block";

  welcomeTextEl.textContent = `Hoş geldin, ${user.displayName || "Kullanıcı"}`;
  userEmailEl.textContent = user.email || "";

  const isAdmin = user.email === ADMIN_EMAIL;

  if (isAdmin) {
    adminPanelEl.style.display = "block";
    logoutRowEl.style.display = "none";
  } else {
    adminPanelEl.style.display = "none";
    logoutRowEl.style.display = "block";
  }

  // Firestore'dan bugünkü seçimi dinle
  onSnapshot(pickDocRef, (snap) => {
    if (!snap.exists()) {
      currentPickTextEl.textContent = "Henüz bir seçim girilmedi.";
      return;
    }
    const data = snap.data();
    currentPickTextEl.textContent = data.text || "Henüz bir seçim girilmedi.";
  });
}

// Google ile giriş
googleLoginBtn?.addEventListener("click", async () => {
  errorEl.textContent = "";
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error(err);
    errorEl.textContent =
      "Giriş başarısız: " + (err.message || "Bilinmeyen hata");
  }
});

// Çıkış
function attachLogoutHandlers() {
  const doLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  logoutBtn?.addEventListener("click", doLogout);
  logoutBtn2?.addEventListener("click", doLogout);
}

// Admin için seçim kaydet
savePickBtn?.addEventListener("click", async () => {
  const text = (pickInputEl.value || "").trim();
  if (!text) return;

  try {
    await setDoc(pickDocRef, {
      text,
      updatedAt: serverTimestamp(),
    });
    pickInputEl.value = "";
  } catch (err) {
    console.error("Seçim kaydedilemedi:", err);
    alert("Seçim kaydedilemedi, lütfen tekrar dene.");
  }
});

// Auth durumu değişince tetiklenir
onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedIn(user);
    attachLogoutHandlers();
  } else {
    showLoggedOut();
  }
});
