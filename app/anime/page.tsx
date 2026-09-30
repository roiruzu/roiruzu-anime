"use client";

import { useEffect, useRef } from "react";

const animeData: Record<
  string,
  {
    name: string;
    image: string;
    rating: string;
    year: string;
    episodes: number;
    genre: string;
    description: string;
  }
> = {
  "demon-slayer": {
    name: "Demon Slayer",
    image: "/images/demon-slayer.jpg",
    rating: "8.9",
    year: "2019",
    episodes: 63,
    genre: "Aksiyon",
    description:
      "İblisler ve insanların karşı karşıya geldiği dünyada Tanjiro'nun ailesini korumak ve kız kardeşini kurtarmak için çıktığı yolculuk.",
  },

  "jujutsu-kaisen": {
    name: "Jujutsu Kaisen",
    image: "/images/jujutsu-kaisen.jpg",
    rating: "8.6",
    year: "2020",
    episodes: 47,
    genre: "Aksiyon",
    description:
      "Lanetlerin ve büyücülerin dünyasında Yuji Itadori'nin tehlikeli macerası.",
  },

  "solo-leveling": {
    name: "Solo Leveling",
    image: "/images/solo-leveling.jpg",
    rating: "8.8",
    year: "2024",
    episodes: 25,
    genre: "Aksiyon",
    description:
      "En zayıf avcı olarak başlayan Sung Jin-Woo'nun gizemli sistem sayesinde güçlenmesini anlatan hikaye.",
  },

  "blue-lock": {
    name: "Blue Lock",
    image: "/images/blue-lock.jpg",
    rating: "8.2",
    year: "2022",
    episodes: 38,
    genre: "Spor",
    description:
      "Japonya'nın en iyi forvetini yetiştirmek amacıyla oluşturulan sıra dışı futbol projesi.",
  },

  "cyber-moon": {
    name: "Cyber Moon",
    image: "/images/cyber-moon.jpg",
    rating: "8.7",
    year: "2026",
    episodes: 12,
    genre: "Aksiyon",
    description:
      "Gecenin karanlığında başlayan gizemli olaylar genç bir kahramanı şehrin bilinmeyen tarafına sürükler.",
  },
};

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

export default function AnimePage({
  params,
}: {
  params: { slug: string };
}) {
  const glowRef = useRef<HTMLDivElement>(null);

  const anime =
    animeData[params.slug] ?? animeData["cyber-moon"];

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
    <main className="min-h-screen bg-[#050505] text-white">

      {/* MOUSE GLOW */}

      <div
        ref={glowRef}
        className="mouse-glow"
      />

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">

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

          <nav className="hidden gap-8 text-sm md:flex">

            <a
              href="/"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Ana Sayfa
            </a>

            <a
              href="/#popular"
              className="text-white"
            >
              Animeler
            </a>

            <a
              href="/#popular"
              className="text-zinc-400 hover:text-red-500"
            >
              Popüler
            </a>

          </nav>

          <button className="red-button rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold hover:bg-red-500">
            Giriş Yap
          </button>

        </div>

      </header>

      {/* ANIME HERO */}

      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute left-1/3 top-0 h-[600px] w-[600px] rounded-full bg-red-700/[0.06] blur-[140px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:flex-row">

          {/* POSTER */}

          <div className="red-glow h-[430px] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 md:w-[290px]">

            <img
              src={anime.image}
              alt={anime.name}
              className="h-full w-full object-cover"
            />

          </div>

          {/* BİLGİ */}

          <div className="flex flex-col justify-center">

            <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Anime
            </div>

            <h1 className="text-5xl font-black md:text-7xl">
              {anime.name}
            </h1>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-400">

              <span>⭐ {anime.rating}</span>

              <span>•</span>

              <span>{anime.year}</span>

              <span>•</span>

              <span>{anime.episodes} Bölüm</span>

              <span>•</span>

              <span>{anime.genre}</span>

            </div>

            <p className="mt-7 max-w-2xl leading-7 text-zinc-400">
              {anime.description}
            </p>

            <div className="mt-8 flex gap-3">

              <button className="red-button rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-500">
                ▶ İzlemeye Başla
              </button>

              <button className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 font-bold text-zinc-300 transition hover:border-red-500/30 hover:text-white">
                + Listeye Ekle
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* BÖLÜMLER */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="mb-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            İzle
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Bölümler
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">

          {Array.from(
            { length: anime.episodes },
            (_, index) => (
              <button
                key={index}
                className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-red-500/50 hover:bg-red-600"
              >

                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-red-100">
                  Bölüm
                </div>

                <div className="mt-1 text-xl font-black">
                  {String(index + 1).padStart(2, "0")}
                </div>

              </button>
            )
          )}

        </div>

      </section>

      <footer className="border-t border-white/[0.06] py-10 text-center text-sm text-zinc-600">
        © 2026 NOX SCANS
      </footer>

    </main>
  );
}