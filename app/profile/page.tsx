"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("PROFILE ERROR:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-red-600" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <header className="border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <a href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9">
              <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]" />
              <div className="absolute left-2 top-0 h-8 w-8 rounded-full bg-[#050505]" />
            </div>

            <div>
              <div className="text-xl font-black tracking-[0.12em]">
                NOX SCANS
              </div>

              <div className="text-[9px] font-bold tracking-[0.35em] text-red-500">
                ANIME & MANGA
              </div>
            </div>
          </a>

          <a
            href="/"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-zinc-300 transition hover:border-red-500/30 hover:text-white"
          >
            ← Ana Sayfa
          </a>

        </div>
      </header>

      {/* PROFILE */}
      <section className="mx-auto max-w-5xl px-6 py-20">

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            Hesabım
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Profil
          </h1>

          <p className="mt-3 text-zinc-500">
            Hesap bilgilerini buradan görüntüleyebilirsin.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">

          {/* AVATAR */}
          <div className="rounded-3xl border border-white/[0.07] bg-zinc-950 p-8">

            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-red-600/40 bg-red-600/10 text-5xl font-black text-red-500 shadow-[0_0_40px_rgba(220,38,38,0.15)]">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-6 text-center text-xl font-black">
              {user.username}
            </h2>

            <p className="mt-1 text-center text-sm text-zinc-500">
              NOX SCANS Üyesi
            </p>

          </div>

          {/* ACCOUNT INFO */}
          <div className="rounded-3xl border border-white/[0.07] bg-zinc-950 p-8">

            <h2 className="text-xl font-black">
              Hesap Bilgileri
            </h2>

            <div className="mt-6 space-y-4">

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Kullanıcı Adı
                </div>

                <div className="mt-2 font-semibold">
                  {user.username}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  E-Posta
                </div>

                <div className="mt-2 font-semibold">
                  {user.email}
                </div>
              </div>

            </div>

            <div className="mt-8 border-t border-white/[0.06] pt-6">

              <button
                onClick={logout}
                className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold transition hover:bg-red-500"
              >
                🚪 Çıkış Yap
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10 text-center text-sm text-zinc-600">
        © 2026 NOX SCANS
      </footer>

    </main>
  );
}