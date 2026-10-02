"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const glowRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  useEffect(() => {
    let mouseX = -500;
    let mouseY = -500;
    let animationFrame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const updateGlow = () => {
      if (glowRef.current) {
        glowRef.current.style.left = `${mouseX}px`;
        glowRef.current.style.top = `${mouseY}px`;
      }

      animationFrame = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
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

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* MOUSE GLOW */}
      <div
        ref={glowRef}
        className="mouse-glow pointer-events-none fixed z-0"
      />

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-red-700/[0.07] blur-[150px]" />

        <div className="absolute bottom-[-300px] left-[-200px] h-[500px] w-[500px] rounded-full bg-red-700/[0.04] blur-[150px]" />

        <div className="absolute right-[-200px] top-[35%] h-[500px] w-[500px] rounded-full bg-red-700/[0.035] blur-[150px]" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <a
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/icon.png"
              alt="TSUKİSUB"
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-xl object-contain"
            />

            <div>
              <div className="text-xl font-black tracking-[0.12em]">
                TSUKİSUB
              </div>

              <div className="text-[9px] font-bold tracking-[0.35em] text-red-500">
                ANIME & MANGA
              </div>
            </div>
          </a>

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">

            <a
              href="/"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Ana Sayfa
            </a>

            <a
              href="/animeler"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Animeler
            </a>

            <a
              href="/#popular"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Popüler
            </a>

            <a
              href="/kullanicilar"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Kullanıcılar
            </a>

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-red-500/40 hover:text-red-500 sm:flex"
            >
              🔍
            </button>

            {/* USER */}
            {loadingUser ? (

              <div className="h-10 w-24 animate-pulse rounded-xl bg-white/10" />

            ) : user ? (

              <div className="relative">

                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="red-button rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-500"
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
                className="red-button rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-500"
              >
                Giriş Yap
              </a>

            )}

          </div>

        </div>
      </header>

      {/* BÖLÜM ALANI */}
      <section className="relative z-10">

        {/* ÜST KIRMIZI GLOW */}
        <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-700/[0.07] blur-[140px]" />

        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">

          {/* GERİ DÖN */}
          <a
            href="/anime/solo-leveling"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-red-500"
          >
            ← Solo Leveling'e Dön
          </a>

          {/* BAŞLIK */}
          <div className="mt-8">

            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#dc2626]" />
              SOLO LEVELING
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              1. Bölüm
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500">
              Solo Leveling 1. Bölüm'ü Türkçe altyazılı olarak izle.
            </p>

          </div>

          {/* VIDEO PLAYER */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-black shadow-2xl shadow-black/50">

            <div className="aspect-video w-full">

              <iframe
                src="https://embed.vcdn.me/embed/cad19399-2f8f-4aa6-8e74-0b0414fe6446"
                className="h-full w-full"
                frameBorder="0"
                allowFullScreen
                allow="fullscreen; picture-in-picture"
                title="Solo Leveling 1. Bölüm"
              />

            </div>

          </div>

          {/* BÖLÜM BİLGİSİ */}
          <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-zinc-950/70 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="h-14 w-10 overflow-hidden rounded-lg border border-white/10">
                <Image
                  src="/images/solo-leveling.jpg"
                  alt="Solo Leveling"
                  width={80}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="font-bold">
                  Solo Leveling
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  1. Bölüm
                </p>
              </div>

            </div>

            <a
              href="/anime/solo-leveling"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-bold text-zinc-300 transition hover:border-red-500/30 hover:bg-red-500/[0.05] hover:text-white"
            >
              ← Bölüm Listesi
            </a>

          </div>

          {/* ALT BİLGİ */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-white/[0.07] bg-zinc-950/60 p-6">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                Anime
              </div>

              <div className="mt-2 text-lg font-black">
                Solo Leveling
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-zinc-950/60 p-6">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                Bölüm
              </div>

              <div className="mt-2 text-lg font-black">
                1. Bölüm
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-zinc-950/60 p-6">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                Durum
              </div>

              <div className="mt-2 flex items-center gap-2 text-lg font-black">
                <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#dc2626]" />
                Yayında
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="relative z-10 mt-10 border-t border-white/[0.06] py-10 text-center text-sm text-zinc-600">
        © 2026 TSUKİSUB
      </footer>

    </main>
  );
}