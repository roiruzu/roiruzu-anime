"use client";

import { useEffect, useState } from "react";

function MoonLogo() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-10 w-10 text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]"
      fill="currentColor"
    >
      <path d="M27.5 3.5C22.8 6.4 20 11.4 20 17.2C20 25.9 27 33 35.7 33C36.2 33 36.7 33 37.2 32.9C34.2 36.1 29.7 38 24.7 38C15.1 38 7.3 30.2 7.3 20.6C7.3 11.4 14.4 3.8 23.5 3C24.9 2.9 26.2 3.1 27.5 3.5Z" />
    </svg>
  );
}

export default function AnimePage() {
  const [mouse, setMouse] = useState({
    x: -500,
    y: -500,
  });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveMouse);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* MOUSE GLOW */}
      <div
        className="mouse-glow"
        style={{
          left: mouse.x,
          top: mouse.y,
        }}
      />

      {/* NAVBAR */}
      <header className="border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <a
            href="/"
            className="flex items-center gap-3"
          >
            <MoonLogo />

            <div>
              <div className="font-black tracking-[0.12em]">
                ROIRUZU
              </div>

              <div className="text-[9px] font-bold tracking-[0.35em] text-red-500">
                ANIME
              </div>
            </div>
          </a>

          <nav className="hidden gap-8 text-sm md:flex">
            <a
              href="/"
              className="text-zinc-400 hover:text-red-500"
            >
              Ana Sayfa
            </a>

            <a
              href="/anime"
              className="text-white"
            >
              Animeler
            </a>

            <a
              href="/#popular"
              className="text-zinc-400 hover:text-red-500"
            >
              Popüler
            </a>
          </nav>

          <button className="red-button rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold hover:bg-red-500">
            Giriş Yap
          </button>

        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-red-700/[0.06] blur-[130px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:flex-row">

          {/* POSTER */}
          <div className="red-glow flex h-[430px] w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black md:w-[290px]">

            <MoonLogo />

          </div>

          {/* INFO */}
          <div className="flex flex-col justify-center">

            <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Anime
            </div>

            <h1 className="text-5xl font-black md:text-7xl">
              Cyber Moon
            </h1>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-400">
              <span>⭐ 8.7</span>
              <span>•</span>
              <span>2026</span>
              <span>•</span>
              <span>12 Bölüm</span>
              <span>•</span>
              <span>Aksiyon</span>
            </div>

            <p className="mt-7 max-w-2xl leading-7 text-zinc-400">
              Geceyi kaplayan gizemli olayların ardından
              genç bir kahraman, şehrin karanlık tarafında
              başlayan tehlikeli bir maceraya sürüklenir.
            </p>

            <div className="mt-8 flex gap-3">

              <button className="red-button rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-500">
                ▶ İzlemeye Başla
              </button>

              <button className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 font-bold text-zinc-300 hover:border-red-500/30">
                + Listeye Ekle
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* EPISODES */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            İzle
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Bölümler
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">

          {Array.from({ length: 12 }, (_, index) => (

            <button
              key={index}
              className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-red-500/50 hover:bg-red-600"
            >

              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-red-100">
                Bölüm
              </div>

              <div className="mt-1 text-xl font-black">
                {String(index + 1).padStart(2, "0")}
              </div>

            </button>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10 text-center text-sm text-zinc-600">
        © 2026 ROIRUZU Anime
      </footer>

    </main>
  );
}