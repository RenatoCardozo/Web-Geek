'use client'

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type ResumoData = {
  totalItens: number;
  totalGasto: number;
  tipos: string[];
};

const URL_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function CategoriasUsuario() {
  const [resumo, setResumo] = useState<ResumoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchResumo() {
      try {
        setLoading(true);
        const res = await fetch(`${URL_BASE}/user/resumo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: Cookies.get("logado_id") || "" }),
        });
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data: ResumoData = await res.json();
        setResumo(data);
      } catch (err) {
        setError((err as Error).message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchResumo();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-black text-white">
        Carregando dados...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-black text-red-500">
        {error}
      </div>
    );

  const categoriasUnicas = resumo?.tipos || [];
  const totalItens = resumo?.totalItens || 0;
  const totalGasto = resumo?.totalGasto || 0;

  function handleClickCategoria(categoria: string) {
    // Redireciona para a página categoria, passando o tipo via rota
    router.push(`principal/categoria/${categoria}`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-900 to-black">
      <main className="flex-grow px-4 pt-28 pb-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-5xl bg-gray-800 border-2 border-purple-700 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
            Categorias Cadastradas
          </h1>

          <p className="text-sm text-gray-300 mb-8 text-center max-w-2xl mx-auto">
            Aqui você encontra um resumo das categorias dos itens cadastrados em sua
            coleção pessoal. Explore os tipos de itens que você coleciona!
          </p>

          <ul className="flex flex-wrap justify-center gap-6">
            {categoriasUnicas.map((categoria, index) => (
              <li
                key={index}
                onClick={() => handleClickCategoria(categoria)}
                className="px-6 min-w-52 py-4 bg-purple-400 hover:bg-purple-800 text-black hover:text-white rounded-lg font-semibold text-center shadow-md cursor-pointer transition"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleClickCategoria(categoria);
                  }
                }}
              >
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-indigo-900 to-black text-purple-300 p-6 text-sm">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center bg-gray-800 border-2 border-purple-700 rounded-2xl p-8 shadow-xl">
          <span>
            <strong>Total de Itens:</strong> {totalItens}
          </span>
          <span>
            <strong>Categorias:</strong> {categoriasUnicas.length}
          </span>
          <span>
            <strong>Total Gasto:</strong> R$ {totalGasto.toFixed(2)}
          </span>
        </div>
        <p className="mt-3 text-center text-xs text-gray-400">
          Geek Collection — Vida longa e próspera 🖖
        </p>
      </footer>
    </div>
  );
}
