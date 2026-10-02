"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type User = {
  id: string;
  username: string;
  createdAt: string;
};

const FOUNDER_USERNAMES = ["Roiruzu", "Anti Spiral"];
const EXECUTIVE_USERNAME = "Waerypp";

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export default function KullanicilarPage() {
  const glowRef = useRef<HTMLDivElement>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  /* =========================
     CURRENT USER
  ========================= */

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          setCurrentUser(null);
          return;
        }

        const data = await response.json();
        setCurrentUser(data.user ?? null);
      } catch (error) {
        console.error("USER FETCH ERROR:", error);
        setCurrentUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    getUser();
  }, []);

  /* =========================
     USERS
  ========================= */

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch("/api/users", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Kullanıcılar alınamadı");
        }

        const data = await response.json();

        setUsers(data.users ?? []);
      } catch (error) {
        console.error("USERS FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  /* =========================
     MOUSE GLOW
  ========================= */

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

  /* =========================
     LOGOUT
  ========================= */

  async function logout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("LOGOUT FAILED");
        return;
      }

      setCurrentUser(null);
      setShowUserMenu(false);

      window.location.href = "/";
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  }

  /* =========================
     FILTER
  ========================= */

  const filteredUsers = users.filter((user) =>
    normalizeUsername(user.username).includes(
      normalizeUsername(search)
    )
  );

  /* =========================
     FOUNDERS
     Roiruzu HER ZAMAN İLK
  ========================= */

  const founders = FOUNDER_USERNAMES
    .map((founderName) =>
      filteredUsers.find(
        (user) =>
          normalizeUsername(user.username) ===
          normalizeUsername(founderName)
      )
    )
    .filter((user): user is User => Boolean(user));

  /* =========================
     EXECUTIVE
  ========================= */

  const executive = filteredUsers.find(
    (user) =>
      normalizeUsername(user.username) ===
      normalizeUsername(EXECUTIVE_USERNAME)
  );

  /* =========================
     MEMBERS
  ========================= */

  const members = filteredUsers.filter((user) => {
    const username = normalizeUsername(user.username);

    const isFounder = FOUNDER_USERNAMES.some(
      (founder) =>
        normalizeUsername(founder) === username
    );

    const isExecutive =
      username === normalizeUsername(EXECUTIVE_USERNAME);

    return !isFounder && !isExecutive;
  });

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =========================
          MOUSE GLOW
      ========================= */}

      <div
        ref={glowRef}
        className="mouse-glow pointer-events-none fixed z-0"
      />

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-red-700/[0.07] blur-[150px]" />

        <div className="absolute right-[-250px] top-[35%] h-[500px] w-[500px] rounded-full bg-red-700/[0.035] blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[-250px] h-[500px] w-[500px] rounded-full bg-red-700/[0.025] blur-[150px]" />

      </div>

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}

          <a
            href="/"
            className="flex items-center gap-3"
          >

            <Image
              src="/icon.png"
              alt="TSUKİSUB"
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-xl object-contain"
            />

            <div>

              <div className="text-xl font-black tracking-[0.12em]">
                TSUKİSUB
              </div>

              <div className="text-[9px] font-bold tracking-[0.35em] text-red-500">
                ANIME & MANGA
              </div>

            </div>

          </a>

          {/* NAVIGATION */}

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">

            <a
              href="/"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Ana Sayfa
            </a>

            <a
              href="/animeler"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Animeler
            </a>

            <a
              href="/#popular"
              className="text-zinc-400 transition hover:text-red-500"
            >
              Popüler
            </a>

            <a
              href="/kullanicilar"
              className="text-white transition hover:text-red-500"
            >
              Kullanıcılar
            </a>

          </nav>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3">

            {/* SEARCH */}

            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-red-500/40 hover:text-red-500 sm:flex"
            >

              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

            </button>

            {/* USER */}

            {loadingUser ? (

              <div className="h-10 w-24 animate-pulse rounded-xl bg-white/10" />

            ) : currentUser ? (

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setShowUserMenu(!showUserMenu)
                  }
                  className="red-button rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-500"
                >
                  {currentUser.username}
                </button>

                {showUserMenu && (

                  <div className="absolute right-0 top-14 w-44 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">

                    <a
                      href="/profile"
                      className="block px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                    >
                      👤 Profil
                    </a>

                    <button
                      type="button"
                      onClick={logout}
                      className="block w-full px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-500/10"
                    >
                      🚪 Çıkış Yap
                    </button>

                  </div>

                )}

              </div>

            ) : (

              <a
                href="/login"
                className="red-button rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-500"
              >
                Giriş Yap
              </a>

            )}

          </div>

        </div>

      </header>

      {/* =========================
          CONTENT
      ========================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">

        {/* HEADER */}

        <div className="mb-10">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500">

            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#dc2626]" />

            TSUKİSUB COMMUNITY

          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <h1 className="text-5xl font-black leading-none tracking-tight md:text-6xl">

                Topluluk

                <br />

                <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.2)]">
                  Üyeleri.
                </span>

              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
                Tsuki Sub topluluğundaki kullanıcıları keşfet,
                profillerini görüntüle ve topluluğu tanı.
              </p>

            </div>

            {/* TOTAL USER */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-5 backdrop-blur-sm">

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">
                Toplam Üye
              </p>

              <p className="mt-2 text-3xl font-black">
                {users.length}
              </p>

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <div className="mb-14">

          <div className="relative max-w-2xl">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Kullanıcı adı ara..."
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 pr-14 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-red-500/40 focus:bg-white/[0.045]"
            />

            <svg
              className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="py-24 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />

            <p className="mt-5 text-sm text-zinc-500">
              Üyeler yükleniyor...
            </p>

          </div>

        )}

        {/* EMPTY */}

        {!loading && filteredUsers.length === 0 && (

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] py-24 text-center">

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-3xl">
              👤
            </div>

            <h2 className="text-xl font-bold">
              Kullanıcı bulunamadı
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Aradığın kullanıcı mevcut değil.
            </p>

          </div>

        )}

        {/* =========================
            FOUNDERS
        ========================= */}

        {!loading && founders.length > 0 && (

          <section className="mb-12">

            <div className="mb-5 flex items-center gap-4">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">
                  Yönetim
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Kurucular
                </h2>

              </div>

              <div className="h-px flex-1 bg-white/10" />

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {founders.map((founder) => (

                <a
                  key={founder.id}
                  href={`/profil/${founder.username}`}
                  className="group relative flex overflow-hidden rounded-3xl border border-red-500/20 bg-red-500/[0.045] p-7 transition duration-300 hover:border-red-500/50 hover:bg-red-500/[0.07]"
                >

                  <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-red-600/[0.07] blur-[80px]" />

                  <div className="relative flex w-full items-center gap-5">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-600/10 text-3xl font-black text-red-500 shadow-[0_0_35px_rgba(220,38,38,0.12)]">
                      {founder.username
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="truncate text-xl font-black">
                          {founder.username}
                        </h3>

                        <span className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-500">
                          KURUCU
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-zinc-500">
                        Tsuki Sub Kurucusu
                      </p>

                    </div>

                    <svg
                      className="hidden h-6 w-6 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-red-500 md:block"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>

                  </div>

                </a>

              ))}

            </div>

          </section>

        )}

        {/* =========================
            CHIEF EXECUTIVE
        ========================= */}

        {!loading && executive && (

          <section className="mb-12">

            <div className="mb-5 flex items-center gap-4">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                  Yönetim
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Yönetim Ekibi
                </h2>

              </div>

              <div className="h-px flex-1 bg-white/10" />

            </div>

            <a
              href={`/profil/${executive.username}`}
              className="group relative flex overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-500/[0.035] p-7 transition duration-300 hover:border-orange-500/40 hover:bg-orange-500/[0.06]"
            >

              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-500/[0.05] blur-[70px]" />

              <div className="relative flex w-full items-center gap-6">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-3xl font-black text-orange-400">
                  {executive.username
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="text-xl font-black">
                      {executive.username}
                    </h3>

                    <span className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-400">
                      CHIEF EXECUTIVE
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-zinc-500">
                    Tsuki Sub Yönetimi
                  </p>

                </div>

                <svg
                  className="hidden h-6 w-6 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-orange-400 md:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>

              </div>

            </a>

          </section>

        )}

        {/* =========================
            MEMBERS
        ========================= */}

        {!loading && members.length > 0 && (

          <section>

            <div className="mb-7 flex items-end gap-4">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">
                  Community
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  Üyeler
                </h2>

                <p className="mt-1 text-sm text-zinc-600">
                  Topluluğun diğer üyeleri
                </p>

              </div>

              <span className="mb-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-500">
                {members.length} kişi
              </span>

              <div className="mb-3 h-px flex-1 bg-white/10" />

            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {members.map((user) => (

                <a
                  key={user.id}
                  href={`/profil/${user.username}`}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-zinc-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-[#101010]"
                >

                  <div className="absolute right-[-50px] top-[-50px] h-32 w-32 rounded-full bg-red-600/0 blur-[60px] transition duration-500 group-hover:bg-red-600/[0.08]" />

                  <div className="relative">

                    <div className="flex items-center justify-between">

                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-3xl font-black text-zinc-500 transition group-hover:border-red-500/30 group-hover:bg-red-600/10 group-hover:text-red-500">
                        {user.username
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <svg
                        className="h-5 w-5 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>

                    </div>

                    <div className="mt-6">

                      <h3 className="truncate text-xl font-black text-zinc-200 transition group-hover:text-white">
                        {user.username}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-600">
                        Tsuki Sub üyesi
                      </p>

                    </div>

                    <div className="mt-6 h-px bg-white/5" />

                    <div className="mt-4 flex items-center justify-between">

                      <span className="text-xs text-zinc-700">
                        Profil
                      </span>

                      <span className="text-xs text-transparent transition group-hover:text-red-500">
                        Görüntüle →
                      </span>

                    </div>

                  </div>

                </a>

              ))}

            </div>

          </section>

        )}

        {/* BOTTOM */}

        {!loading && filteredUsers.length > 0 && (

          <div className="mt-14 border-t border-white/[0.06] pt-7 text-center">

            <span className="text-xs text-zinc-700">
              TSUKİSUB · {filteredUsers.length} kullanıcı
            </span>

          </div>

        )}

      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/[0.06] py-10 text-center text-sm text-zinc-600">
        © 2026 TSUKİSUB
      </footer>

    </main>
  );
}