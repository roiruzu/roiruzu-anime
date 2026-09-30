import Link from "next/link";

const animes = [
  {
    title: "Solo Leveling",
    episode: "Bölüm 1",
    image: "/images/solo-leveling.jpg",
    link: "/anime/solo-leveling",
  },
  {
    title: "Jujutsu Kaisen",
    episode: "Bölüm 1",
    image: "/images/jujustus-kaisen.jpg",
    link: "/anime/jujutsu-kaisen",
  },
  {
    title: "Demon Slayer",
    episode: "Bölüm 1",
    image: "/images/demon-slayer.jpg",
    link: "/anime/demon-slayer",
  },
  {
    title: "Blue Lock",
    episode: "Bölüm 1",
    image: "/images/blue-lock.jpg",
    link: "/anime/blue-lock",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <header className="border-b border-white/10 bg-[#070707]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11">
              <div className="absolute left-1 top-0 h-10 w-10 rounded-full bg-red-600" />
              <div className="absolute left-4 top-[-2px] h-10 w-10 rounded-full bg-[#070707]" />
            </div>

            <div>
              <div className="text-2xl font-black tracking-[0.35em]">
                NOX
              </div>
              <div className="text-[9px] tracking-[0.45em] text-red-500">
                ANIME
              </div>
            </div>
          </Link>

          {/* MENU */}
          <nav className="hidden gap-8 text-sm text-gray-400 md:flex">
            <Link href="/" className="text-red-500">
              ANA SAYFA
            </Link>

            <Link
              href="/anime"
              className="transition hover:text-white"
            >
              ANİMELER
            </Link>

            <Link
              href="/anime/solo-leveling"
              className="transition hover:text-white"
            >
              POPÜLER
            </Link>
          </nav>

          {/* SEARCH */}
          <div className="hidden rounded border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-500 sm:block">
            🔍 Anime ara...
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/images/solo-leveling.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-6">
          <div className="max-w-2xl">

            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-8 w-8">
                <div className="absolute h-7 w-7 rounded-full bg-red-600" />
                <div className="absolute left-2 top-[-2px] h-7 w-7 rounded-full bg-black" />
              </div>

              <span className="text-xs font-bold tracking-[0.35em] text-red-500">
                NOX ANIME
              </span>
            </div>

            <h1 className="text-5xl font-black md:text-7xl">
              SOLO
              <span className="text-red-600"> LEVELING</span>
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-gray-400">
              En sevdiğin animeleri keşfet ve yeni bölümleri
              takip et.
            </p>

            <Link
              href="/anime/solo-leveling"
              className="mt-7 inline-block bg-red-600 px-7 py-3 text-sm font-bold transition hover:bg-red-700"
            >
              İZLE
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-7 flex items-center gap-3">
          <div className="h-6 w-1 bg-red-600" />
          <h2 className="text-xl font-bold tracking-wide">
            GÜNCEL BÖLÜMLER
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {animes.map((anime) => (
            <Link
              href={anime.link}
              key={anime.title}
              className="group overflow-hidden border border-white/10 bg-[#0b0b0d] transition hover:-translate-y-1 hover:border-red-700"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold">
                  {anime.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {anime.episode}
                </p>

                <div className="mt-3 h-[2px] w-8 bg-red-600" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-xs text-gray-600">
        <div className="mb-2 flex justify-center">
          <div className="relative h-7 w-7">
            <div className="absolute h-6 w-6 rounded-full bg-red-600" />
            <div className="absolute left-2 top-[-2px] h-6 w-6 rounded-full bg-[#050505]" />
          </div>
        </div>

        © 2026 NOX ANIME
      </footer>

    </main>
  );
}