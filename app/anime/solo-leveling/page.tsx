"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SoloLevelingPage() {
  const glowRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isInList, setIsInList] = useState(false);

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
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nox-watchlist");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setIsInList(parsed.includes("solo-leveling"));
        }
      }
    } catch {
      setIsInList(false);
    }
  }, []);

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

  async function logout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) return;

      setUser(null);
      setShowUserMenu(false);
      window.location.href = "/";
    } catch {}
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

      if (list.includes("solo-leveling")) {
        list = list.filter((id) => id !== "solo-leveling");
        setIsInList(false);
      } else {
        list.push("solo-leveling");
        setIsInList(true);
      }

      localStorage.setItem("nox-watchlist", JSON.stringify(list));
      window.dispatchEvent(new Event("nox-watchlist-updated"));
    } catch {}
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      <div ref={glowRef} className="mouse-glow pointer-events-none fixed z-0" />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-red-700/[0.07] blur-[150px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <a href="/" className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="NOX SCANS"
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-xl object-contain"
            />

            <div>
              <div className="text-xl font-black tracking-[0.12em]">
                NOX SCANS
              </div>
              <div className="text-[9px] font-bold tracking-[0.35em] text-red-500">
                ANIME & MANGA
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="/" className="text-zinc-400 hover:text-red-500">
              Ana Sayfa
            </a>
            <a href="/#popular" className="text-white hover:text-red-500">
              Animeler
            </a>
            <a href="/#popular" className="text-zinc-400 hover:text-red-500">
              Popüler
            </a>
            <a href="/#genres" className="text-zinc-400 hover:text-red-500">
              Türler
            </a>
          </nav>

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] sm:flex"
            >
              🔍
            </button>

            {loadingUser ? (
              <div className="h-10 w-24 animate-pulse rounded-xl bg-white/10" />
            ) : user ? (
              <div className="relative">

                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold hover:bg-red-500"
                >
                  {user.username}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-14 w-44 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">

                    <a
                      href="/profile"
                      className="block px-4 py-3 text-sm text-zinc-300 hover:bg-white/5"
                    >
                      👤 Profil
                    </a>

                    <button
                      type="button"
                      onClick={logout}
                      className="block w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-500/10"
                    >
                      🚪 Çıkış Yap
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <a
                href="/login"
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold hover:bg-red-500"
              >
                Giriş Yap
              </a>
            )}

          </div>
        </div>
      </header>

      <section className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14">

          <div className="mb-10 flex gap-2 text-sm">
            <a href="/" className="text-zinc-500 hover:text-red-500">
              Ana Sayfa
            </a>

            <span className="text-zinc-700">/</span>

            <span className="text-zinc-300">
              Solo Leveling
            </span>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[310px_1fr]">

            <div className="relative mx-auto w-full max-w-[310px]">

              <div className="pointer-events-none absolute -inset-5 rounded-[35px] bg-red-600/[0.08] blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">

                <img
                  src="/images/solo-leveling.jpg"
                  alt="Solo Leveling"
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
                Solo
                <br />
                <span className="text-red-600">
                  Leveling
                </span>
              </h1>

              <p className="mt-5 text-lg text-zinc-500">
                俺だけレベルアップな件
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="info-tag">⭐ 8.8</span>
                <span className="info-tag">Aksiyon</span>
                <span className="info-tag">Fantastik</span>
                <span className="info-tag">Macera</span>
                <span className="info-tag">25 Bölüm</span>
              </div>

              <p className="mt-8 max-w-2xl text-[15px] leading-8 text-zinc-400">
                Dünyanın en zayıf avcısı olarak bilinen Sung Jin-Woo,
                gizemli bir sistem sayesinde seviye atlayabilen özel
                bir güce sahip olur ve giderek güçlenmeye başlar.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <a
                  href="#episodes"
                  className="rounded-xl bg-red-600 px-7 py-4 text-sm font-black hover:bg-red-500"
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
            Solo Leveling Hakkında
          </h2>

          <p className="mt-6 max-w-3xl text-sm leading-8 text-zinc-400">
            Sung Jin-Woo, zayıf bir avcı olarak başladığı yolculuğunda
            gizemli bir sistemin yardımıyla güçlenir ve dünyanın en
            güçlü avcılarından biri olma yolunda ilerler.
          </p>

        </div>
      </section>

      <section id="episodes" className="mx-auto max-w-7xl px-6 pb-24">

        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
            İzle
          </div>

          <h2 className="mt-2 text-3xl font-black">
            Solo Leveling Bölümleri
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">

          {Array.from({ length: 25 }, (_, i) => i + 1).map((episode) => (
            <a
              key={episode}
              href={
                episode === 1
                  ? "/anime/solo-leveling/episode-1"
                  : "#"
              }
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:-translate-y-1 hover:border-red-500/40"
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-600 group-hover:text-red-500">
                Bölüm
              </div>

              <div className="mt-2 text-2xl font-black">
                {String(episode).padStart(2, "0")}
              </div>

              <div className="mt-3 text-[10px] text-zinc-600">
                İzle →
              </div>
            </a>
          ))}

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