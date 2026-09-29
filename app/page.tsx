const animeList = [
  {
    title: "Solo Leveling",
    image: "/images/solo-leveling.jpg",
    year: "2024",
    genre: "Action • Fantasy",
    href: "/anime/solo-leveling",
  },
  {
    title: "Demon Slayer",
    image: "/images/demon-slayer.jpg",
    year: "2019",
    genre: "Action • Fantasy",
    href: "/anime/demon-slayer",
  },
  {
    title: "Blue Lock",
    image: "/images/blue-lock.jpg",
    year: "2022",
    genre: "Sports • Drama",
    href: "/anime/blue-lock",
  },
  {
    title: "Jujutsu Kaisen",
    image: "/images/jujutsu-kaisen.jpg",
    year: "2020",
    genre: "Action • Supernatural",
    href: "/anime/jujutsu-kaisen",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090d]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <a
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            ROIRUZU<span className="text-purple-500">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-zinc-300 transition hover:text-purple-400"
            >
              Ana Sayfa
            </a>

            <a
              href="/anime"
              className="text-zinc-400 transition hover:text-purple-400"
            >
              Animeler
            </a>
          </nav>

          <a
            href="/anime"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-purple-500/10"
          >
            Tüm Animeler
          </a>

        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-[#07070b] to-[#07070b]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">

          <div className="max-w-3xl">

            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-purple-400">
              ROIRUZU ANIME
            </p>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Anime dünyasına
              <br />
              <span className="text-purple-500">
                hoş geldin.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
              Favori animelerini keşfet, serileri incele ve
              bölümlere kolayca ulaş.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="/anime"
                className="rounded-xl bg-purple-600 px-7 py-3.5 font-bold transition hover:bg-purple-500"
              >
                Animeleri Keşfet
              </a>

              <a
                href="#anime-list"
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-bold transition hover:bg-white/10"
              >
                Popüler Animeler
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* ANIME LIST */}
      <section
        id="anime-list"
        className="mx-auto max-w-7xl px-6 py-20"
      >

        <div className="flex items-end justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-400">
              Koleksiyon
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Popüler Animeler
            </h2>
          </div>

          <a
            href="/anime"
            className="hidden text-sm font-semibold text-zinc-400 transition hover:text-purple-400 sm:block"
          >
            Tümünü Gör →
          </a>

        </div>

        {/* CARDS */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {animeList.map((anime) => (
            <article
              key={anime.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101016] transition duration-300 hover:-translate-y-1 hover:border-purple-500/40"
            >

              {/* IMAGE */}
              <div className="relative h-[420px] overflow-hidden">

                <img
                  src={anime.image}
                  alt={anime.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute left-4 top-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold backdrop-blur">
                  {anime.year}
                </div>

              </div>

              {/* INFO */}
              <div className="p-5">

                <h3 className="text-xl font-black">
                  {anime.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  {anime.genre}
                </p>

                <a
                  href={anime.href}
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-purple-600 px-5 py-3 font-bold transition hover:bg-purple-500"
                >
                  İncele
                </a>

              </div>

            </article>
          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#09090d] py-12">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <p className="text-xl font-black">
            ROIRUZU<span className="text-purple-500">.</span>
          </p>

          <p className="mt-3 text-sm text-zinc-600">
            © 2026 ROIRUZU Anime
          </p>

        </div>

      </footer>

    </main>
  );
}