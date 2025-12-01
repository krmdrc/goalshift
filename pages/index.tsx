// pages/index.tsx
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      setUserEmail(result.user.email ?? null);
    } catch (err: any) {
      console.error(err);
      setError(err.code || err.message || "Bir hata oluştu");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020617",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          padding: "24px 28px",
          borderRadius: "16px",
          border: "1px solid #1f2937",
          background:
            "radial-gradient(circle at top, rgba(56,189,248,0.13), transparent 60%) #020617",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 20px 45px rgba(15,23,42,0.7)",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>
          GoalShift
        </h1>
        <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "20px" }}>
          Google ile giriş yap, yakında günlük tek maçlık istatistik paneline
          buradan ulaşacaksın.
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "999px",
            border: "1px solid #4b5563",
            background:
              "linear-gradient(to right, #22c55e, #22d3ee, #6366f1)",
            color: "#020617",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Google ile giriş yap
        </button>

        {userEmail && (
          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "#a5b4fc",
              wordBreak: "break-all",
            }}
          >
            Giriş yaptın: {userEmail}
          </p>
        )}

        {error && (
          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "#fca5a5",
              wordBreak: "break-all",
            }}
          >
            Hata: {error}
          </p>
        )}
      </div>
    </main>
  );
}
