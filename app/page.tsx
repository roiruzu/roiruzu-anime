"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const animeList = [
  {
    name: "Demon Slayer",
    slug: "demon-slayer",
    image: "/images/demon-slayer.jpg",
    rating: "8.9",
    episodes: "63 Bölüm",
  },
  {
    name: "Jujutsu Kaisen",
    slug: "jujutsu-kaisen",
    image: "/images/jujutsu-kaisen.jpg",
    rating: "8.6",
    episodes: "47 Bölüm",
  },
  {
    name: "Solo Leveling",
    slug: "solo-leveling",
    image: "/images/solo-leveling.jpg",
    rating: "8.8",
    episodes: "25 Bölüm",
  },
  {
    name: "Blue Lock",
    slug: "blue-lock",
    image: "/images/blue-lock.jpg",
    rating: "8.2",
    episodes: "38 Bölüm",
  },
];

export default function Home() {
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
              alt="TSUKİSCANS"
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-xl object-contain"
            />

            <div>
              <div className="text-xl font-black tracking-[0.12em]">
                TSUKİSCANS
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
              className="text-white transition hover:text-red-500"
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
              href="#popular"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Popüler
            </a>

            <a
              href="#genres"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Türler
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

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-red-700/[0.07] blur-[140px]" />

        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">

          {/* HERO TEXT */}
          <div className="relative z-10">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#dc2626]" />
              TSUKİSCANS
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              Anime
              <br />
              <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.2)]">
                Dünyasına
              </span>
              <br />
              Hoş Geldin.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400">
              Sevdiğin animeleri keşfet, bölümlerini takip et
              ve anime dünyasının en iyi yapımlarını tek bir
              yerde bul.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#popular"
                className="red-button rounded-xl bg-red-600 px-7 py-4 text-sm font-bold transition hover:bg-red-500"
              >
                ▶ Anime Keşfet
              </a>

              <a
                href="#popular"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-bold text-zinc-300 transition hover:border-red-500/30 hover:text-white"
              >
                Popüler Animeler
              </a>

            </div>

            <div className="mt-10 flex gap-8">

              <div>
                <div className="text-2xl font-black">
                  500+
                </div>

                <div className="mt-1 text-sm text-zinc-500">
                  Anime
                </div>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <div className="text-2xl font-black">
                  10K+
                </div>

                <div className="mt-1 text-sm text-zinc-500">
                  Bölüm
                </div>
              </div>

              <div className="h-10 w-px bg-white/10" />

              <div>
                <div className="text-2xl font-black">
                  24/7
                </div>

                <div className="mt-1 text-sm text-zinc-500">
                  Online
                </div>
              </div>

            </div>

          </div>

          {/* HERO IMAGES */}
          <div className="relative hidden h-[520px] md:block">

            <div className="absolute right-8 top-12 h-[400px] w-[270px] rotate-6 overflow-hidden rounded-3xl border border-red-500/20 shadow-2xl shadow-red-950/30">

              <img
                src="/images/demon-slayer.jpg"
                alt="Demon Slayer"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            </div>

            <div className="absolute right-32 top-20 z-10 h-[400px] w-[270px] -rotate-3 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl">

              <img
                src="/images/solo-leveling.jpg"
                alt="Solo Leveling"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6">

                <div className="text-xs font-bold uppercase tracking-widest text-red-500">
                  Featured
                </div>

                <div className="mt-1 text-xl font-black">
                  Solo Leveling
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* POPULAR */}
      <section
        id="popular"
        className="mx-auto max-w-7xl px-6 py-20"
      >

        <div className="flex items-end justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Keşfet
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Popüler Animeler
            </h2>

          </div>

          <span className="text-sm text-zinc-500">
            Daha fazlası yakında
          </span>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">

          {animeList.map((anime) => (

            <a
              key={anime.name}
              href={`/anime/${anime.slug}`}
              className="anime-card group overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950"
            >

              <div className="relative aspect-[3/4] overflow-hidden">

                <img
                  src={anime.image}
                  alt={anime.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute inset-0 bg-red-600/0 transition duration-500 group-hover:bg-red-600/10" />

                <div className="absolute bottom-0 left-0 right-0 p-4">

                  <div className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                    Anime
                  </div>

                  <h3 className="mt-1 font-bold">
                    {anime.name}
                  </h3>

                  <div className="mt-2 flex justify-between text-xs text-zinc-400">

                    <span>
                      ⭐ {anime.rating}
                    </span>

                    <span>
                      {anime.episodes}
                    </span>

                  </div>

                </div>

              </div>

            </a>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10 text-center text-sm text-zinc-600">
        © 2026 TSUKİSCANS
      </footer>

    </main>
  );
}