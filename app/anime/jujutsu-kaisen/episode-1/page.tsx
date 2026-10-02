"use client";

import { useState } from "react";

const sources = [
  {
    name: "Test Player",
    url: "",
  },
  {
    name: "Kaynak 2",
    url: "",
  },
  {
    name: "Kaynak 3",
    url: "",
  },
];

export default function EpisodePage() {
  const [selectedSource, setSelectedSource] = useState(0);

  const source = sources[selectedSource];

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* Başlık */}
        <div className="mb-5">
          <p className="text-sm text-gray-400">Jujutsu Kaisen</p>

          <h1 className="mt-1 text-2xl font-bold">
            Bölüm 1
          </h1>
        </div>

        {/* Kaynaklar */}
        <div className="mb-4 flex flex-wrap gap-2">
          {sources.map((item, index) => (
            <button
              key={item.name}
              onClick={() => setSelectedSource(index)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                selectedSource === index
                  ? "bg-red-600 text-white"
                  : "bg-[#18181f] text-gray-300 hover:bg-[#24242d]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Player */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
          {source.url ? (
            <iframe
              key={source.url}
              src={source.url}
              title={`${source.name} - Jujutsu Kaisen Bölüm 1`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-3 text-4xl">▶</div>

                <h2 className="text-lg font-semibold">
                  {source.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Bu kaynak için henüz video eklenmedi.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bölüm navigasyonu */}
        <div className="mt-5 flex items-center justify-between">
          <button
            disabled
            className="rounded-lg bg-[#18181f] px-4 py-2 text-sm text-gray-600"
          >
            ← Önceki Bölüm
          </button>

          <span className="text-sm text-gray-400">
            Bölüm 1
          </span>

          <button
            disabled
            className="rounded-lg bg-[#18181f] px-4 py-2 text-sm text-gray-600"
          >
            Sonraki Bölüm →
          </button>
        </div>

      </div>
    </main>
  );
}