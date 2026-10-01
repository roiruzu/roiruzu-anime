"use client";

import { useEffect, useRef, useState } from "react";

type Anime = {
  id: string;
  name: string;
  slug: string;
  image: string;
  rating: string;
  episodes: string;
  year: string;
  genres: string[];
};

type User = {
  id: string;
  username: string;
  email: string;
};

const animeDatabase: Anime[] = [
  {
    id: "jujutsu-kaisen",
    name: "Jujutsu Kaisen",
    slug: "jujutsu-kaisen",
    image: "/images/jujutsu-kaisen.jpg",
    rating: "8.6",
    episodes: "47 Bölüm",
    year: "2020",
    genres: ["Aksiyon", "Doğaüstü", "Fantastik"],
  },
  {
    id: "blue-lock",
    name: "Blue Lock",
    slug: "blue-lock",
    image: "/images/blue-lock.jpg",
    rating: "8.3",
    episodes: "38 Bölüm",
    year: "2022",
    genres: ["Spor", "Futbol", "Shounen"],
  },
  {
    id: "solo-leveling",
    name: "Solo Leveling",
    slug: "solo-leveling",
    image: "/images/solo-leveling.jpg",
    rating: "8.8",
    episodes: "25 Bölüm",
    year: "2024",
    genres: ["Aksiyon", "Fantastik", "Macera"],
  },
  {
    id: "demon-slayer",
    name: "Demon Slayer",
    slug: "demon-slayer",
    image: "/images/demon-slayer.jpg",
    rating: "8.6",
    episodes: "63 Bölüm",
    year: "2019",
    genres: ["Aksiyon", "Doğaüstü", "Fantastik"],
  },
];

export default function ProfilePage() {
  const glowRef = useRef<HTMLDivElement>(null);

  const [list, setList] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState("");

  const [activeTab, setActiveTab] = useState<"list" | "continue">("list");
  const [loaded, setLoaded] = useState(false);

  /* =========================
     KULLANICI BİLGİLERİNİ AL
  ========================= */

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          setUserError(data.error || "Giriş yapmanız gerekiyor.");
          setUser(null);
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("PROFILE USER ERROR:", error);
        setUserError("Kullanıcı bilgileri alınamadı.");
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, []);

  /* =========================
     LOCAL STORAGE'DAN LİSTEYİ OKU
  ========================= */

  useEffect(() => {
    try {
      const savedList = localStorage.getItem("nox-watchlist");

      if (savedList) {
        const parsedList = JSON.parse(savedList);

        if (Array.isArray(parsedList)) {
          setList(parsedList);
        }
      }
    } catch (error) {
      console.error("WATCHLIST ERROR:", error);
      setList([]);
    }

    setLoaded(true);
  }, []);

  /* =========================
     LİSTEYİ STORAGE'A KAYDET
  ========================= */

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "nox-watchlist",
        JSON.stringify(list)
      );
    } catch {
      // Storage kullanılamazsa uygulama çökmeyecek.
    }
  }, [list, loaded]);

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
     KAYITLI ANİMELER
  ========================= */

  const savedAnime = animeDatabase.filter((anime) =>
    list.includes(anime.id)
  );

  /* =========================
     LİSTEDEN ÇIKAR
  ========================= */

  const removeFromList = (id: string) => {
    setList((current) => {
      const updated = current.filter((item) => item !== id);

      try {
        localStorage.setItem(
          "nox-watchlist",
          JSON.stringify(updated)
        );
      } catch {
        // Storage hatasında uygulama çökmeyecek.
      }

      return updated;
    });
  };

  /* =========================
     LOADING
  ========================= */

  if (loadingUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-red-600" />

          <p className="mt-5 text-sm text-zinc-500">
            Profil yükleniyor...
          </p>
        </div>
      </main>
    );
  }

  /* =========================
     GİRİŞ YAPILMAMIŞ
  ========================= */

  if (!user) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.06] blur-[150px]" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/[0.08] bg-zinc-950/90 p-10 text-center shadow-2xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-500/30 bg-red-600/10 text-4xl">
            🔒
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Giriş Yapmalısın
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Profilini görüntülemek için önce hesabına giriş yapman gerekiyor.
          </p>

          {userError && (
            <p className="mt-4 text-xs text-red-400">
              {userError}
            </p>
          )}

          <a
            href="/login"
            className="mt-7 inline-flex rounded-xl bg-red-600 px-7 py-3 text-sm font-black transition hover:bg-red-500"
          >
            Giriş Yap
          </a>

          <div className="mt-5">
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
      <header className="sticky top-0 z-[9999] border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <a
            href="/"
            className="relative z-[10000] flex items-center gap-3"
          >

            <img
              src="/icon.png"
              alt="NOX SCANS"
              className="h-9 w-9 rounded-xl object-cover drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]"
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

            <a
              href="/"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Ana Sayfa
            </a>

            <a
              href="/#popular"
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
              href="/#genres"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Türler
            </a>

          </nav>

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-red-500/40 hover:text-red-500 sm:flex"
            >
              🔍
            </button>

            <a
              href="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-600/10 text-lg transition hover:bg-red-600/20"
              title="Profil"
            >
              👤
            </a>

          </div>

        </div>
      </header>

      {/* PROFILE */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-14">

        {/* PROFILE HEADER */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02]">

          <div className="absolute inset-0 bg-gradient-to-r from-red-600/[0.08] via-transparent to-transparent" />

          <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:p-10">

            {/* AVATAR */}
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-red-500/30 bg-red-600/10 text-5xl shadow-[0_0_50px_rgba(220,38,38,0.12)]">
              👤
            </div>

            {/* USER INFO */}
            <div className="flex-1">

              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                Profil
              </div>

              <h1 className="mt-2 break-words text-4xl font-black sm:text-5xl">
                {user.username}
              </h1>

              <p className="mt-2 break-all text-sm text-zinc-500">
                {user.email}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
                  <span className="text-xs text-zinc-500">
                    Listem
                  </span>

                  <span className="ml-2 font-bold">
                    {list.length}
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
                  <span className="text-xs text-zinc-500">
                    İzlenen
                  </span>

                  <span className="ml-2 font-bold">
                    0
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
                  <span className="text-xs text-zinc-500">
                    Favoriler
                  </span>

                  <span className="ml-2 font-bold">
                    0
                  </span>
                </div>

              </div>
            </div>

            {/* SETTINGS */}
            <a
              href="/profile/settings"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-zinc-300 transition hover:border-red-500/40 hover:text-white"
            >
              ⚙ Ayarlar
            </a>

          </div>
        </div>

        {/* TABS */}
        <div className="mt-12 flex items-center gap-2 border-b border-white/[0.06]">

          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`border-b-2 px-5 py-4 text-sm font-bold transition ${
              activeTab === "list"
                ? "border-red-600 text-white"
                : "border-transparent text-zinc-500 hover:text-white"
            }`}
          >
            📚 Listem
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("continue")}
            className={`border-b-2 px-5 py-4 text-sm font-bold transition ${
              activeTab === "continue"
                ? "border-red-600 text-white"
                : "border-transparent text-zinc-500 hover:text-white"
            }`}
          >
            ▶ İzlemeye Devam Et
          </button>

        </div>

        {/* LIST */}
        {activeTab === "list" && (
          <section className="py-10">

            <div className="mb-8">

              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                Kütüphanem
              </div>

              <h2 className="mt-2 text-3xl font-black">
                Listeme Eklediklerim
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Daha sonra izlemek istediğin animeler.
              </p>

            </div>

            {savedAnime.length === 0 ? (

              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">

                <div className="text-5xl">
                  📚
                </div>

                <h3 className="mt-5 text-xl font-black">
                  Listen henüz boş
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-zinc-500">
                  Anime sayfalarından beğendiğin animeleri
                  &quot;+ Listeme Ekle&quot; butonuyla buraya
                  ekleyebilirsin.
                </p>

                <a
                  href="/#popular"
                  className="mt-7 inline-flex rounded-xl bg-red-600 px-6 py-3 text-sm font-black transition hover:bg-red-500"
                >
                  Anime Keşfet
                </a>

              </div>

            ) : (

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                {savedAnime.map((anime) => (

                  <div
                    key={anime.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition duration-300 hover:-translate-y-1 hover:border-red-500/30"
                  >

                    <a href={`/anime/${anime.slug}`}>

                      <div className="relative aspect-[3/4] overflow-hidden">

                        <img
                          src={anime.image}
                          alt={anime.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                        <div className="absolute left-3 top-3 rounded-lg bg-red-600 px-2 py-1 text-[10px] font-black">
                          HD
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">

                          <div className="text-xs font-bold text-red-500">
                            ⭐ {anime.rating}
                          </div>

                          <div className="mt-1 text-lg font-black">
                            {anime.name}
                          </div>

                        </div>

                      </div>

                    </a>

                    <div className="p-4">

                      <div className="flex flex-wrap gap-1">

                        {anime.genres.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] text-zinc-500"
                          >
                            {genre}
                          </span>
                        ))}

                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-zinc-600">
                        <span>{anime.episodes}</span>
                        <span>{anime.year}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromList(anime.id)}
                        className="mt-4 w-full rounded-xl border border-red-500/20 bg-red-600/10 py-2.5 text-xs font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
                      >
                        Listeden Çıkar
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>
        )}

        {/* CONTINUE */}
        {activeTab === "continue" && (
          <section className="py-10">

            <div className="mb-8">

              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                İzleme Geçmişi
              </div>

              <h2 className="mt-2 text-3xl font-black">
                İzlemeye Devam Et
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Yarım bıraktığın bölümlere buradan devam edebilirsin.
              </p>

            </div>

            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">

              <div className="text-5xl">
                ▶️
              </div>

              <h3 className="mt-5 text-xl font-black">
                Henüz izleme geçmişin yok
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-zinc-500">
                Bir anime bölümü izlemeye başladığında burada
                görünmeye başlayacak.
              </p>

            </div>

          </section>
        )}

      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06] py-10 text-center">

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