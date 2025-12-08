"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o reload da página

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/luksguin/library");
    } else {
      alert("Falha no login. Verifique seus dados.");
    }
  };

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center text-white text-4xl">
      <div className="border-2 border-white w-[100vh] h-auto p-10 rounded-4xl flex items-center flex-col gap-5">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png"
          alt="Spotify Logo"
          className="h-[15vh] mb-10 object-contain"
        />
        <p>Bem vindo ao SpotGuinho</p>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2.5 items-center mt-4 flex-col w-full"
        >
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4 w-full"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-400 h-[6vh] border-green-500 border-2 rounded-4xl text-black text-2xl px-4 w-full"
          />

          <button
            type="submit"
            className="bg-green-500 text-white rounded-4xl h-[8vh] w-full mt-4 hover:bg-white hover:text-black hover:cursor-pointer transition-colors"
          >
            Continuar
          </button>
        </form>

        <div className="text-2xl mt-[6vh] flex flex-col text-center gap-3">
          <p>Ainda não tem uma conta?</p>
          <Link
            href="/create"
            className="font-bold text border-gray-500 border-2 rounded-4xl py-2 px-6 hover:bg-white hover:text-black transition-colors"
          >
            Inscrever-se
          </Link>
        </div>
      </div>
    </div>
  );
}
