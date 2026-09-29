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

      {/* BÖLÜM SAYFASI */}
      <section className="mx-auto max-w-6xl px-6 py-12">

        <a
          href="/anime/solo-leveling"
          className="text-sm text-zinc-500 transition hover:text-purple-400"
        >
          ← Solo Leveling'e Dön
        </a>

        <div className="mt-8">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
            Solo Leveling
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            1. Bölüm
          </h1>

        </div>

        {/* VIDEO OYNATICI */}
        <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">

          <video
            controls
            className="h-full w-full"
            poster="/images/solo-leveling.jpg"
          >
            <source
              src="/videos/solo-leveling-1.mp4"
              type="video/mp4"
            />

            Tarayıcınız video oynatmayı desteklemiyor.
          </video>

        </div>

        {/* ALT BİLGİ */}
        <div className="mt-6 flex items-center justify-between">

          <div>
            <p className="font-bold">
              Solo Leveling
            </p>

            <p className="text-sm text-zinc-500">
              1. Bölüm
            </p>
          </div>

          <a
            href="/anime/solo-leveling"
            className="rounded-xl border border-white/10 bg-[#101016] px-5 py-3 transition hover:bg-white/10"
          >
            ← Bölüm Listesi
          </a>

        </div>

      </section>

    </main>
  );
}