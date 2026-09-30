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
    <main>
      <section className="nox-hero">
        <div className="nox-container">
          <div className="nox-hero-content">
            <div className="nox-small-title">
              Karanlıkta doğan hikâyeler
            </div>

            <h1>
              NO<span>X</span>
            </h1>

            <p>
              En sevdiğin animeleri keşfet, serileri takip et
              ve yeni bölümleri kaçırma.
            </p>

            <Link href="/anime" className="nox-button">
              ANİMELERİ KEŞFET
            </Link>
          </div>
        </div>
      </section>

      <section className="nox-section">
        <div className="nox-container">
          <div className="nox-section-title">
            <h2>Güncel Bölümler</h2>
          </div>

          <div className="nox-grid">
            {animes.map((anime) => (
              <Link
                href={anime.link}
                key={anime.title}
                className="nox-card"
              >
                <div className="nox-card-image">
                  <img
                    src={anime.image}
                    alt={anime.title}
                  />
                </div>

                <div className="nox-card-content">
                  <div className="nox-card-title">
                    {anime.title}
                  </div>

                  <div className="nox-card-episode">
                    {anime.episode}
                  </div>

                  <div className="nox-card-line" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="nox-footer">
        © 2026 NOX — Anime Platform
      </footer>
    </main>
  );
}