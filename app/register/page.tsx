"use client";

import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "Kayıt başarısız.");
        return;
      }

      setMessage("Hesabın başarıyla oluşturuldu!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch {
      setMessage("Sunucuya bağlanırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Kayıt Ol</h1>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı adı"
          className="w-full rounded border p-3"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta"
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
          className="w-full rounded border p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-red-600 p-3 font-semibold text-white"
        >
          {loading ? "Kaydediliyor..." : "Kayıt Ol"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </main>
  );
}