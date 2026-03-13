"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Incorrect username or password");
    }
  }

  return (
    <div className="fixed inset-0 bg-[#1A1A1A] flex items-center justify-center z-[9999]">
      <div className="bg-white p-12 rounded-lg w-full max-w-[420px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderBottom: "24px solid #2E7D1F",
            }}
          />
          <div className="font-montserrat text-[1.8rem] font-extrabold">
            <span className="text-[#1A1A1A]">Ardhi</span>
            <span className="text-[#F5921E]">Soko</span>
          </div>
        </div>
        <div className="text-[0.72rem] text-[#666] mb-6 tracking-widest uppercase">
          Admin Dashboard
        </div>

        <h2 className="font-montserrat text-[0.92rem] font-bold mb-5">
          Sign in to continue
        </h2>

        <form onSubmit={handleLogin} className="text-left">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border-[1.5px] border-[#E0E0E0] rounded font-opensans text-[0.93rem] outline-none mb-3 focus:border-[#F5921E] transition-colors"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-[1.5px] border-[#E0E0E0] rounded font-opensans text-[0.93rem] outline-none mb-3 focus:border-[#F5921E] transition-colors"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5921E] hover:bg-[#D97A10] text-white py-3 rounded font-montserrat text-[0.86rem] font-bold tracking-wider uppercase cursor-pointer transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Login →"}
          </button>
        </form>

        {error && (
          <p className="text-[#E53935] text-[0.78rem] mt-3">{error}</p>
        )}
        <p className="mt-3 text-[0.68rem] text-[#666]">
          Default: admin / ardhisoko2025
        </p>
      </div>
    </div>
  );
}
