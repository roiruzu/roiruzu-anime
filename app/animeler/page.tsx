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
    genres: ["Aksiyon", "Macera", "Fantastik"],
  },
  {
    name: "Jujutsu Kaisen",
    slug: "jujutsu-kaisen",
    image: "/images/jujutsu-kaisen.jpg",
    rating: "8.6",
    episodes: "47 Bölüm",
    genres: ["Aksiyon", "Doğaüstü", "Fantastik"],
  },
  {
    name: "Solo Leveling",
    slug: "solo-leveling",
    image: "/images/solo-leveling.jpg",
    rating: "8.8",
    episodes: "25 Bölüm",
    genres: ["Aksiyon", "Fantastik", "Macera"],
  },
  {
    name: "Blue Lock",
    slug: "blue-lock",
    image: "/images/blue-lock.jpg",
    rating: "8.2",
    episodes: "38 Bölüm",
    genres: ["Spor", "Okul", "Dram"],
  },
];

const genres = [
  "Tümü",
  "Aksiyon",
  "Macera",
  "Komedi",
  "Dram",
  "Romantik",
  "Korku",
  "Fantastik",
  "Doğaüstü",
  "Okul",
  "Spor",
  "Psikolojik",
  "Bilim Kurgu",
];

export default function AnimelerPage() {
  const glowRef = useRef<HTMLDivElement>(null);

  const [selectedGenre, setSelectedGenre] = useState("Tümü");
  const [search, setSearch] = useState("");

  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  /* =========================
     USER
  ========================= */

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

  /* =========================
     MOUSE GLOW
  ========================= */

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

  /* =========================
     LOGOUT
  ========================= */

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

  /* =========================
     FILTER
  ========================= */

  const filteredAnime = animeList.filter((anime) => {
    const matchesSearch = anime.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "Tümü" ||
      anime.genres.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

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

        <div className="absolute right-[-250px] top-[40%] h-[500px] w-[500px] rounded-full bg-red-700/[0.025] blur-[150px]" />

      </div>

      {/* =========================
          NAVBAR
      ========================= */}

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
              className="text-white transition hover:text-red-500"
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

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 sm:flex">
              🔍
            </div>

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

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-20">

        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500">

          <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#dc2626]" />

          TSUKİSUB

        </div>

        <h1 className="mt-7 text-5xl font-black tracking-tight sm:text-6xl">

          Anime
          <br />

          <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.2)]">
            Kütüphanesi.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">
          Sevdiğin animeleri keşfet, türlere göre filtrele ve
          izlemek istediğin seriyi kolayca bul.
        </p>

      </section>

      {/* =========================
          SEARCH
      ========================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-6">

        <div className="relative max-w-2xl">

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Anime ara..."
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 pr-14 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-red-500/40 focus:bg-white/[0.045]"
          />

          <svg
            className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>

        </div>

      </section>

      {/* =========================
          GENRES
      ========================= */}

      <section
        id="genres"
        className="relative z-10 mx-auto max-w-7xl px-6 py-12"
      >

        <div className="mb-5 flex items-center gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Keşfet
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Türler
            </h2>

          </div>

          <div className="h-px flex-1 bg-white/10" />

        </div>

        <div className="flex flex-wrap gap-3">

          {genres.map((genre) => {

            const active = selectedGenre === genre;

            return (
              <button
                key={genre}
                type="button"
                onClick={() => setSelectedGenre(genre)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "border-red-500/40 bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.15)]"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-red-500/30 hover:text-white"
                }`}
              >
                {genre}
              </button>
            );
          })}

        </div>

      </section>

      {/* =========================
          ANIME LIST
      ========================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">

        <div className="mb-7 flex items-end justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Liste
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {selectedGenre === "Tümü"
                ? "Tüm Animeler"
                : selectedGenre}
            </h2>

          </div>

          <span className="text-sm text-zinc-500">
            {filteredAnime.length} anime
          </span>

        </div>

        {filteredAnime.length > 0 ? (

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">

            {filteredAnime.map((anime) => (

              <a
                key={anime.name}
                href={`/anime/${anime.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-red-500/30"
              >

                <div className="relative aspect-[3/4] overflow-hidden">

                  <img
                    src={anime.image}
                    alt={anime.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute inset-0 bg-red-600/0 transition duration-500 group-hover:bg-red-600/10" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">

                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                      Anime
                    </div>

                    <h3 className="mt-1 text-lg font-black">
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

        ) : (

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] py-24 text-center">

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-3xl">
              🔍
            </div>

            <h2 className="text-xl font-bold">
              Anime bulunamadı
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Arama veya tür filtresine uygun anime bulunamadı.
            </p>

          </div>

        )}

      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="relative z-10 border-t border-white/[0.06] py-10 text-center text-sm text-zinc-600">
        © 2026 TSUKİSUB
      </footer>

    </main>
  );
}