"use client";

import { useEffect, useRef } from "react";

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
  {
    name: "Cyber Moon",
    slug: "cyber-moon",
    image: "/images/cyber-moon.jpg",
    rating: "8.7",
    episodes: "12 Bölüm",
  },
];

function MoonLogo() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-9 w-9 text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]"
      fill="currentColor"
    >
      <path d="M27.5 3.5C22.8 6.4 20 11.4 20 17.2C20 25.9 27 33 35.7 33C36.2 33 36.7 33 37.2 32.9C34.2 36.1 29.7 38 24.7 38C15.1 38 7.3 30.2 7.3 20.6C7.3 11.4 14.4 3.8 23.5 3C24.9 2.9 26.2 3.1 27.5 3.5Z" />
    </svg>
  );
}

export default function Home() {
  const glowRef = useRef<HTMLDivElement>(null);

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

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* MOUSE GLOW */}
      <div
        ref={glowRef}
        className="mouse-glow"
      />

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <a
            href="/"
            className="flex items-center gap-3"
          >

            <MoonLogo />

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

            <a
              href="/"
              className="text-white transition hover:text-red-500"
            >
              Ana Sayfa
            </a>

            <a
              href="#popular"
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

          </nav>

          <div className="flex items-center gap-3">

            <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-red-500/40 hover:text-red-500 sm:flex">
              🔍
            </button>

            <button className="red-button rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold hover:bg-red-500">
              Giriş Yap
            </button>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-red-700/[0.07] blur-[140px]" />

        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">

          <div className="relative z-10">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500">

              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#dc2626]" />

              NOX SCANS

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
                className="red-button rounded-xl bg-red-600 px-7 py-4 text-sm font-bold hover:bg-red-500"
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
        © 2026 NOX SCANS
      </footer>

    </main>
  );
}