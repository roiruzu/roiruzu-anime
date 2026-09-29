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

export default function AnimePage() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090d]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <a
            href="/"
            className="text-2xl font-black"
          >
            ROIRUZU<span className="text-purple-500">.</span>
          </a>

          <nav className="hidden gap-8 md:flex">

            <a
              href="/"
              className="text-zinc-400 transition hover:text-purple-400"
            >
              Ana Sayfa
            </a>

            <a
              href="/anime"
              className="text-purple-400"
            >
              Animeler
            </a>

          </nav>

        </div>
      </header>

      {/* BAŞLIK */}
      <section className="mx-auto max-w-7xl px-6 pt-16">

        <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
          ROIRUZU ANIME
        </p>

        <h1 className="mt-3 text-5xl font-black md:text-6xl">
          Tüm Animeler
        </h1>

        <p className="mt-5 max-w-2xl text-zinc-500">
          İzlemek istediğin animeyi keşfet ve detaylarına göz at.
        </p>

      </section>

      {/* ANİME KARTLARI */}
      <section className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {animeList.map((anime) => (

            <article
              key={anime.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101016] transition duration-300 hover:-translate-y-1 hover:border-purple-500/40"
            >

              {/* GÖRSEL */}
              <div className="relative h-[420px] overflow-hidden">

                <img
                  src={anime.image}
                  alt={anime.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <span className="absolute left-4 top-4 rounded-lg bg-black/70 px-3 py-1 text-xs font-bold backdrop-blur">
                  {anime.year}
                </span>

              </div>

              {/* BİLGİ */}
              <div className="p-5">

                <h2 className="text-xl font-black">
                  {anime.title}
                </h2>

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
      <footer className="border-t border-white/10 bg-[#09090d] py-10 text-center">

        <p className="font-black">
          ROIRUZU<span className="text-purple-500">.</span>
        </p>

        <p className="mt-2 text-sm text-zinc-600">
          © 2026 ROIRUZU Anime
        </p>

      </footer>

    </main>
  );
}