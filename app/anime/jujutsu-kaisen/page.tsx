const episodes = Array.from({ length: 12 }, (_, i) => i + 1);

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090d]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <a href="/" className="text-2xl font-black">
            ROIRUZU<span className="text-purple-500">.</span>
          </a>

          <nav className="hidden gap-8 md:flex">
            <a href="/" className="text-zinc-400 hover:text-purple-400">
              Ana Sayfa
            </a>
            <a href="/anime" className="text-zinc-400 hover:text-purple-400">
              Animeler
            </a>
          </nav>

        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pt-12">

        <a href="/" className="text-sm text-zinc-500 hover:text-purple-400">
          ← Ana Sayfaya Dön
        </a>

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#101016]">

          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-[#17101c] to-black" />

          <div className="relative grid items-end gap-10 p-8 md:grid-cols-[280px_1fr] md:p-12">

            <div className="h-[390px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src="/images/jujutsu-kaisen.jpg"
                alt="Jujutsu Kaisen"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="pb-2">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-400">
                Anime
              </p>

              <h1 className="mt-3 text-5xl font-black md:text-7xl">
                Jujutsu Kaisen
              </h1>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                  Action
                </span>

                <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                  Supernatural
                </span>

                <span className="rounded-lg bg-white/5 px-3 py-1 text-sm text-zinc-400">
                  2020
                </span>
              </div>

              <p className="mt-7 max-w-2xl leading-8 text-zinc-400">
                Yuji Itadori'nin lanetler ve büyücüler dünyasına
                girişini anlatan aksiyon dolu bir anime.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">

                <button className="rounded-xl bg-purple-600 px-7 py-3 font-bold transition hover:bg-purple-500">
                  ▶ İlk Bölümü İzle
                </button>

                <button className="rounded-xl border border-white/10 bg-white/5 px-7 py-3 font-bold transition hover:bg-white/10">
                  + Listeye Ekle
                </button>

              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">

        <p className="text-sm font-bold uppercase tracking-widest text-purple-400">
          Bölümler
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Jujutsu Kaisen Bölümleri
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">

          {episodes.map((episode) => (
            <button
              key={episode}
              className="rounded-xl border border-white/10 bg-[#101016] p-5 text-left transition hover:border-purple-500/50 hover:bg-purple-500/10"
            >
              <span className="text-xs text-zinc-500">
                BÖLÜM
              </span>

              <p className="mt-1 text-xl font-black">
                {episode}
              </p>
            </button>
          ))}

        </div>

      </section>

      <footer className="border-t border-white/10 py-10 text-center">

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