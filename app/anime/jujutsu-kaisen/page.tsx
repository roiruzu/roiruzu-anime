"use client";

import { useEffect, useRef, useState } from "react";

export default function JujutsuKaisenPage() {
  const glowRef = useRef<HTMLDivElement>(null);

  const [isInList, setIsInList] = useState(false);

  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nox-watchlist");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setIsInList(parsed.includes("jujutsu-kaisen"));
        }
      }
    } catch {
      setIsInList(false);
    }
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user ?? null);
      } catch (error) {
        console.error("USER FETCH ERROR:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    getUser();
  }, []);

  async function logout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("LOGOUT FAILED");
        return;
      }

      setUser(null);
      setShowUserMenu(false);

      window.location.href = "/";
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  }

  function toggleWatchlist() {
    try {
      const saved = localStorage.getItem("nox-watchlist");

      let list: string[] = [];

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          list = parsed;
        }
      }

      if (list.includes("jujutsu-kaisen")) {
        list = list.filter((id) => id !== "jujutsu-kaisen");
        setIsInList(false);
      } else {
        list.push("jujutsu-kaisen");
        setIsInList(true);
      }

      localStorage.setItem(
        "nox-watchlist",
        JSON.stringify(list)
      );
    } catch {
      console.error("Liste kaydedilemedi.");
    }
  }

  useEffect(() => {
    let mouseX = -500;
    let mouseY = -500;
    let frame = 0;

    function move(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    function update() {
      if (glowRef.current) {
        glowRef.current.style.left = `${mouseX}px`;
        glowRef.current.style.top = `${mouseY}px`;
      }

      frame = requestAnimationFrame(update);
    }

    window.addEventListener("mousemove", move);
    frame = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      <div
        ref={glowRef}
        className="mouse-glow pointer-events-none fixed z-0"
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-red-700/[0.07] blur-[150px]" />
      </div>

      {/* GİRİŞ */}
      <div className="fixed right-6 top-6 z-50">

        {loadingUser ? (
          <div className="h-10 w-24 animate-pulse rounded-xl bg-white/10" />
        ) : user ? (
          <div className="relative">

            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-500"
            >
              {user.username}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-14 w-44 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">

                <a
                  href="/profile"
                  className="block px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  👤 Profil
                </a>

                <button
                  type="button"
                  onClick={logout}
                  className="block w-full px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-500/10"
                >
                  🚪 Çıkış Yap
                </button>

              </div>
            )}

          </div>
        ) : (
          <a
            href="/login"
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-500"
          >
            Giriş Yap
          </a>
        )}

      </div>

      <section className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14">

          <div className="mb-10 flex gap-2 text-sm">

            <a
              href="/"
              className="text-zinc-500 hover:text-red-500"
            >
              Ana Sayfa
            </a>

            <span className="text-zinc-700">/</span>

            <span className="text-zinc-300">
              Jujutsu Kaisen
            </span>

          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[310px_1fr]">

            <div className="relative mx-auto w-full max-w-[310px]">

              <div className="pointer-events-none absolute -inset-5 rounded-[35px] bg-red-600/[0.08] blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">

                <img
                  src="/images/jujutsu-kaisen.jpg"
                  alt="Jujutsu Kaisen"
                  className="aspect-[3/4] w-full object-cover"
                />

                <div className="absolute left-5 top-5 rounded-lg border border-red-500/30 bg-red-600/90 px-3 py-1.5 text-xs font-black">
                  HD
                </div>

              </div>
            </div>

            <div>

              <div className="flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-red-500" />

                <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                  Anime
                </span>

              </div>

              <h1 className="mt-5 text-6xl font-black leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
                Jujutsu
                <br />
                <span className="text-red-600">
                  Kaisen
                </span>
              </h1>

              <p className="mt-5 text-lg text-zinc-500">
                呪術廻戦
              </p>

              <div className="mt-7 flex flex-wrap gap-2">

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  ⭐ 8.6
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  Aksiyon
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  Fantastik
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  Shounen
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  47 Bölüm
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  2020
                </span>

              </div>

              <p className="mt-8 max-w-2xl text-[15px] leading-8 text-zinc-400">
                Yuji Itadori, lanetli bir nesneyi yuttuktan sonra
                Jujutsu dünyasının içine girer. Satoru Gojo'nun
                rehberliğinde lanetlerle savaşmayı öğrenirken kendi
                içindeki tehlikeli güçle de mücadele eder.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <a
                  href="#episodes"
                  className="rounded-xl bg-red-600 px-7 py-4 text-sm font-black transition hover:bg-red-500"
                >
                  ▶ Bölümleri Gör
                </a>

                <button
                  type="button"
                  onClick={toggleWatchlist}
                  className={`rounded-xl border px-7 py-4 text-sm font-bold ${
                    isInList
                      ? "border-red-500/40 bg-red-600/10 text-red-400"
                      : "border-white/10 bg-white/[0.03] text-zinc-300"
                  }`}
                >
                  {isInList ? "✓ Listemde" : "+ Listeme Ekle"}
                </button>

              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8">

          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
            Hikaye
          </div>

          <h2 className="mt-3 text-3xl font-black">
            Jujutsu Kaisen Hakkında
          </h2>

          <p className="mt-6 max-w-3xl text-sm leading-8 text-zinc-400">
            Yuji Itadori, lanetli ruhlarla dolu doğaüstü bir dünyanın
            içine girer. Jujutsu büyücüleriyle birlikte lanetlere karşı
            savaşırken Sukuna'nın gücünü kontrol altında tutmaya çalışır.
          </p>

        </div>
      </section>

      <section
        id="episodes"
        className="mx-auto max-w-7xl px-6 pb-24"
      >

        <div className="mb-8">

          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
            İzle
          </div>

          <h2 className="mt-2 text-3xl font-black">
            Jujutsu Kaisen Bölümleri
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">

          {Array.from({ length: 47 }, (_, i) => i + 1).map(
            (episode) => (
              <a
                key={episode}
                href={
                  episode === 1
                    ? "/anime/jujutsu-kaisen/episode-1"
                    : "#"
                }
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-red-500/40"
              >

                <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-600 group-hover:text-red-500">
                  Bölüm
                </div>

                <div className="mt-2 text-2xl font-black">
                  {String(episode).padStart(2, "0")}
                </div>

                <div className="mt-3 text-[10px] text-zinc-600 group-hover:text-zinc-300">
                  İzle →
                </div>

              </a>
            )
          )}

        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-10 text-center">

        <div className="text-sm font-black tracking-[0.15em]">
          NOX SCANS
        </div>

        <div className="mt-2 text-xs text-zinc-600">
          © 2026 NOX SCANS — Anime & Manga
        </div>

      </footer>

    </main>
  );
}