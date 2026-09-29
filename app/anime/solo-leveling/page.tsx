export default function Page() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">

      {/* NAVBAR */}
      <header className="border-b border-white/10 bg-[#09090d]">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-6">

          <a
            href="/"
            className="text-2xl font-black"
          >
            ROIRUZU<span className="text-purple-500">.</span>
          </a>

        </div>
      </header>

      {/* DETAY */}
      <section className="mx-auto max-w-6xl px-6 py-12">

        <a
          href="/anime"
          className="text-sm text-zinc-500 hover:text-purple-400"
        >
          ← Animelere Dön
        </a>

        <div className="mt-8 grid gap-10 rounded-3xl border border-white/10 bg-[#101016] p-8 md:grid-cols-[280px_1fr]">

          {/* POSTER */}
          <div className="h-[400px] overflow-hidden rounded-2xl">

            <img
              src="/images/solo-leveling.jpg"
              alt="Solo Leveling"
              className="h-full w-full object-cover"
            />

          </div>

          {/* BİLGİ */}
          <div className="flex flex-col justify-end">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
              Anime
            </p>

            <h1 className="mt-3 text-5xl font-black">
              Solo Leveling
            </h1>

            <div className="mt-5 flex gap-3">

              <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                Action
              </span>

              <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                Fantasy
              </span>

            </div>

            <p className="mt-7 max-w-2xl leading-8 text-zinc-400">
              Sung Jin-Woo, dünyanın en zayıf avcısı olarak başladığı
              yolculukta gizemli bir sistem sayesinde güçlenmeye başlar.
            </p>

            {/* İLK BÖLÜM */}
            <div className="mt-7">

              <a
                href="/anime/solo-leveling/episode-1"
                className="inline-flex rounded-xl bg-purple-600 px-7 py-3 font-bold transition hover:bg-purple-500"
              >
                ▶ İlk Bölümü İzle
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* BÖLÜMLER */}
      <section className="mx-auto max-w-6xl px-6 pb-20">

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-400">
          Bölümler
        </p>

        <h2 className="mt-2 text-3xl font-black">
          Solo Leveling Bölümleri
        </h2>

        <div className="mt-8">

          <a
            href="/anime/solo-leveling/episode-1"
            className="inline-block rounded-xl border border-white/10 bg-[#101016] p-5 transition hover:border-purple-500/50 hover:bg-purple-500/10"
          >

            <span className="text-xs text-zinc-500">
              BÖLÜM
            </span>

            <p className="mt-1 text-xl font-black">
              1
            </p>

          </a>

        </div>

      </section>

    </main>
  );
}