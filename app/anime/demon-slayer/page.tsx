"use client";

import { useEffect, useRef } from "react";

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

export default function DemonSlayerPage() {
  const glowRef = useRef<HTMLDivElement>(null);

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
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      <div
        ref={glowRef}
        className="mouse-glow pointer-events-none fixed z-0"
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-red-700/[0.07] blur-[150px]" />
      </div>

      <header className="sticky top-0 z-[9999] border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <a href="/" className="relative z-[10000] flex items-center gap-3">
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

          <nav className="relative z-[10000] hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="/" className="text-zinc-400 transition hover:text-red-500">
              Ana Sayfa
            </a>

            <a href="/#popular" className="text-white transition hover:text-red-500">
              Animeler
            </a>

            <a href="/#popular" className="text-zinc-400 transition hover:text-red-500">
              Popüler
            </a>

            <a href="/#genres" className="text-zinc-400 transition hover:text-red-500">
              Türler
            </a>
          </nav>

          <div className="relative z-[10000] flex items-center gap-3">
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-red-500/40 hover:text-red-500 sm:flex"
            >
              🔍
            </button>

            <a
              href="/login"
              className="red-button relative z-[10001] inline-flex cursor-pointer items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-500"
            >
              Giriş Yap
            </a>
          </div>
        </div>
      </header>

      <section className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14">

          <div className="mb-10 flex items-center gap-2 text-sm">
            <a href="/" className="text-zinc-500 transition hover:text-red-500">
              Ana Sayfa
            </a>

            <span className="text-zinc-700">/</span>

            <a href="/#popular" className="text-zinc-500 transition hover:text-red-500">
              Animeler
            </a>

            <span className="text-zinc-700">/</span>

            <span className="text-zinc-300">
              Demon Slayer
            </span>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[310px_1fr]">

            <div className="relative mx-auto w-full max-w-[310px]">
              <div className="pointer-events-none absolute -inset-5 rounded-[35px] bg-red-600/[0.08] blur-2xl" />

              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl">

                <img
                  src="/images/demon-slayer.jpg"
                  alt="Demon Slayer"
                  className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <div className="absolute left-5 top-5 rounded-lg border border-red-500/30 bg-red-600/90 px-3 py-1.5 text-xs font-black">
                  HD
                </div>

                <div className="absolute bottom-5 left-5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-500">
                    NOX SCANS
                  </div>

                  <div className="mt-1 text-xl font-black">
                    DEMON SLAYER
                  </div>
                </div>

              </div>
            </div>

            <div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" />

                <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                  Anime
                </span>
              </div>

              <h1 className="mt-5 text-6xl font-black leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
                Demon
                <br />
                <span className="text-red-600">
                  Slayer
                </span>
              </h1>

              <p className="mt-5 text-lg font-medium text-zinc-500">
                鬼滅の刃
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  ⭐ 8.6
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  Aksiyon
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  Doğaüstü
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  Fantastik
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  63 Bölüm
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
                  2019
                </span>
              </div>

              <p className="mt-8 max-w-2xl text-[15px] leading-8 text-zinc-400">
                Tanjiro Kamado, ailesinin bir iblis tarafından öldürülmesinin
                ardından kız kardeşi Nezuko&apos;yu kurtarmak ve onu yeniden
                insana dönüştürmek için Demon Slayer Corps&apos;a katılır.
                Böylece güçlü iblislerle dolu tehlikeli bir maceraya atılır.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#episodes"
                  className="red-button rounded-xl bg-red-600 px-7 py-4 text-sm font-black shadow-lg shadow-red-950/30 hover:bg-red-500"
                >
                  ▶ Bölümleri Gör
                </a>

                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-bold text-zinc-300 transition hover:border-red-500/40 hover:text-white"
                >
                  + Listeme Ekle
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">

          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              Hikaye
            </div>

            <h2 className="mt-3 text-3xl font-black">
              Demon Slayer Hakkında
            </h2>

            <p className="mt-6 max-w-3xl text-sm leading-8 text-zinc-400">
              Tanjiro Kamado, ailesini kaybettikten sonra iblisler hakkında
              gerçeği öğrenir. Kız kardeşi Nezuko da bir iblise dönüşmüştür.
              Onu yeniden insana döndürmenin bir yolunu bulmak isteyen Tanjiro,
              Demon Slayer Corps&apos;a katılır ve güçlü iblislerle savaşmaya
              başlar.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              Bilgiler
            </div>

            <div className="mt-7 space-y-5">

              <div className="flex justify-between border-b border-white/[0.06] pb-4">
                <span className="text-sm text-zinc-500">Puan</span>
                <span className="font-bold">⭐ 8.6</span>
              </div>

              <div className="flex justify-between border-b border-white/[0.06] pb-4">
                <span className="text-sm text-zinc-500">Bölüm</span>
                <span className="font-bold">63</span>
              </div>

              <div className="flex justify-between border-b border-white/[0.06] pb-4">
                <span className="text-sm text-zinc-500">Yıl</span>
                <span className="font-bold">2019</span>
              </div>

              <div className="flex justify-between border-b border-white/[0.06] pb-4">
                <span className="text-sm text-zinc-500">Stüdyo</span>
                <span className="font-bold">ufotable</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">Tür</span>
                <span className="text-right font-bold">
                  Aksiyon / Fantastik
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      <section
        id="episodes"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-24"
      >

        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              İzle
            </div>

            <h2 className="mt-2 text-3xl font-black">
              Demon Slayer Bölümleri
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              İzlemek istediğin bölümü seç.
            </p>
          </div>

          <div className="hidden text-sm text-zinc-600 sm:block">
            63 Bölüm
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {Array.from({ length: 63 }, (_, i) => i + 1).map(
            (episode) => (
              <a
                key={episode}
                href={
                  episode === 1
                    ? "/anime/demon-slayer/episode-1"
                    : "#"
                }
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-600/[0.06]"
              >
                <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-600 transition group-hover:text-red-500">
                  Bölüm
                </div>

                <div className="mt-2 text-2xl font-black">
                  {String(episode).padStart(2, "0")}
                </div>

                <div className="mt-3 text-[10px] text-zinc-600 transition group-hover:text-zinc-300">
                  İzle →
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </a>
            )
          )}
        </div>
      </section>

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