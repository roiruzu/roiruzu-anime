import Link from "next/link";

const animes = [
  {
    title: "Solo Leveling",
    description: "Güçsüz bir avcıdan dünyanın en güçlü avcısına...",
    image: "/images/solo-leveling.jpg",
    episodes: "Bölüm 1",
    link: "/anime/solo-leveling",
  },
  {
    title: "Jujutsu Kaisen",
    description: "Lanetler ve büyücüler arasındaki mücadele...",
    image: "/images/jujustus-kaisen.jpg",
    episodes: "Bölüm 1",
    link: "/anime/jujutsu-kaisen",
  },
  {
    title: "Demon Slayer",
    description: "Tanjiro'nun iblislerle mücadelesi...",
    image: "/images/demon-slayer.jpg",
    episodes: "Bölüm 1",
    link: "/anime/demon-slayer",
  },
  {
    title: "Blue Lock",
    description: "Dünyanın en iyi forvetini bulmak için yapılan proje...",
    image: "/images/blue-lock.jpg",
    episodes: "Bölüm 1",
    link: "/anime/blue-lock",
  },
];

function MoonLogo() {
  return (
    <div className="relative h-10 w-10">
      <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-red-600" />
      <div className="absolute left-2 top-0 h-8 w-8 rounded-full bg-[#070707]" />
    </div>
  );
}

export default function AnimePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <MoonLogo />

            <div>
              <div className="text-2xl font-black tracking-[0.3em]">
                NOX
              </div>

              <div className="text-[8px] tracking-[0.45em] text-red-500">
                ANIME
              </div>
            </div>
          </Link>

          {/* MENU */}
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <Link
              href="/"
              className="text-gray-400 transition hover:text-white"
            >
              ANA SAYFA
            </Link>

            <Link
              href="/anime"
              className="font-bold text-red-500"
            >
              ANİMELER
            </Link>
          </nav>

          {/* SEARCH */}
          <div className="hidden border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-500 sm:block">
            🔍 Anime ara...
          </div>
        </div>
      </header>

      {/* TITLE */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-14">

        <div className="flex items-center gap-4">
          <MoonLogo />

          <div>
            <p className="text-xs font-bold tracking-[0.4em] text-red-500">
              NOX ANIME
            </p>

            <h1 className="mt-1 text-4xl font-black md:text-5xl">
              ANİMELER
            </h1>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-500">
          İzlemek istediğin animeleri keşfet ve favori serilerini
          takip et.
        </p>
      </section>

      {/* ANIME GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="mb-8 flex items-center gap-3">
          <div className="h-6 w-1 bg-red-600" />

          <h2 className="text-sm font-bold tracking-[0.15em]">
            TÜM ANİMELER
          </h2>

          <span className="text-xs text-gray-600">
            {animes.length} SERİ
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {animes.map((anime) => (
            <Link
              href={anime.link}
              key={anime.title}
              className="group overflow-hidden border border-white/10 bg-[#0b0b0d] transition duration-300 hover:-translate-y-1 hover:border-red-700"
            >
              {/* IMAGE */}
              <div className="relative aspect-[2/3] overflow-hidden bg-black">

                <img
                  src={anime.image}
                  alt={anime.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* EPISODE */}
                <div className="absolute bottom-3 left-3 bg-red-600 px-2 py-1 text-[10px] font-bold">
                  {anime.episodes}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h3 className="text-sm font-bold">
                  {anime.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                  {anime.description}
                </p>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-[10px] uppercase tracking-wider text-gray-600">
                    Anime
                  </span>

                  <span className="text-red-600 transition group-hover:translate-x-1">
                    →
                  </span>

                </div>

                <div className="mt-3 h-[2px] w-8 bg-red-600 transition-all group-hover:w-full" />

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#070707] py-10">

        <div className="flex flex-col items-center justify-center">

          <MoonLogo />

          <div className="mt-2 text-lg font-black tracking-[0.3em]">
            NOX
          </div>

          <p className="mt-2 text-xs text-gray-600">
            © 2026 NOX ANIME
          </p>

        </div>

      </footer>

    </main>
  );
}