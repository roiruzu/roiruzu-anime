"use client";

import { FormEvent, useState } from "react";

function SiteLogo() {
  return (
    <img
      src="/icon.png"
      alt="TSUKİ SUB"
      className="h-10 w-10 rounded-xl object-contain drop-shadow-[0_0_12px_rgba(220,38,38,0.65)]"
    />
  );
}

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Kayıt oluşturulamadı.");
        return;
      }

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 py-12 text-white">

      {/* ARKA PLAN GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.07] blur-[140px]" />

      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-red-900/[0.05] blur-[100px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-red-900/[0.05] blur-[120px]" />

      {/* ANA ALAN */}
      <div className="relative z-10 w-full max-w-md">

        {/* LOGO */}
        <div className="mb-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-3"
          >
            <SiteLogo />

            <div className="text-left">
              <div className="text-xl font-black tracking-[0.12em]">
                TSUKİ SUB
              </div>

              <div className="text-[9px] font-bold tracking-[0.35em] text-red-500">
                ANIME & MANGA
              </div>
            </div>
          </a>
        </div>

        {/* REGISTER CARD */}
        <div className="rounded-3xl border border-white/[0.08] bg-zinc-950/90 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">

          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              NOX SCANS
            </p>

            <h1 className="mt-2 text-3xl font-black">
              Hesap Oluştur
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Anime dünyasına katıl ve hesabını oluştur.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* USERNAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Kullanıcı Adı
              </label>

              <input
                type="text"
                placeholder="Kullanıcı adın"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                minLength={3}
                maxLength={20}
                autoComplete="username"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600/60 focus:bg-red-600/[0.03] focus:ring-2 focus:ring-red-600/10"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                E-posta
              </label>

              <input
                type="email"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600/60 focus:bg-red-600/[0.03] focus:ring-2 focus:ring-red-600/10"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Şifre
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600/60 focus:bg-red-600/[0.03] focus:ring-2 focus:ring-red-600/10"
              />

              <p className="mt-2 text-xs text-zinc-600">
                En az 6 karakter olmalı.
              </p>
            </div>

            {/* MESAJ */}
            {message && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
                {message}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-red-600 text-sm font-bold shadow-lg shadow-red-950/30 transition hover:bg-red-500 hover:shadow-red-900/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
            </button>
          </form>

          {/* LOGIN */}
          <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">

            <p className="text-sm text-zinc-500">
              Zaten hesabın var mı?
            </p>

            <a
              href="/login"
              className="mt-2 inline-block text-sm font-bold text-red-500 transition hover:text-red-400"
            >
              Giriş Yap →
            </a>
          </div>
        </div>

        {/* BACK */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-zinc-600 transition hover:text-zinc-300"
          >
            ← Ana sayfaya dön
          </a>
        </div>

      </div>
    </main>
  );
}