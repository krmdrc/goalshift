// pages/index.tsx
import Head from "next/head";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      console.log("[Goalshift] Google sign-in starting...");

      const result = await signInWithPopup(auth, googleProvider);

      console.log("[Goalshift] Signed in user:", result.user);
      // Sonraki adımda: /dashboard gibi bir yere yönlendirebiliriz.
      // Şimdilik sadece console'da dursun.
    } catch (err: any) {
      console.error("[Goalshift] Google sign-in error:", err);
      setError(err?.message || "Bir hata oluştu, lütfen tekrar dene.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Goalshift</title>
      </Head>

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at top, #111827, #020617)",
          color: "white",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            padding: "32px 28px",
            borderRadius: 24,
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(148, 163, 184, 0.3)",
            boxShadow:
              "0 20px 40px rgba(15, 23, 42, 0.8), 0 0 0 1px rgba(15, 23, 42, 0.9)",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(34, 197, 94, 0.12)",
                color: "#4ade80",
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "999px",
                  background: "#22c55e",
                  marginRight: 6,
                }}
              />
              Günlük tek maç · İstatistiğe dayalı tahmin
            </div>

            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 0.04,
                marginBottom: 8,
              }}
            >
              GOALSHİFT
            </h1>

            <p
              style={{
                fontSize: 14,
                color: "#9ca3af",
                lineHeight: 1.6,
              }}
            >
              Önce Google ile giriş yap, sonra bugünün tek tahminini burada
              göreceksin. Şimdilik sadece giriş altyapısını kuruyoruz.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 999,
              border: "none",
              outline: "none",
              cursor: loading ? "default" : "pointer",
              background: loading ? "rgba(148,163,184,0.3)" : "#22c55e",
              color: "#020617",
              fontWeight: 600,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.15s ease, transform 0.1s ease",
            }}
          >
            {loading ? "Giriş yapılıyor..." : "Google ile giriş yap"}
          </button>

          {error && (
            <p
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#fca5a5",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
