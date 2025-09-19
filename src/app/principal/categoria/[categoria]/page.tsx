'use client';

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FiFilter } from "react-icons/fi";
import Cookies from "js-cookie";
import { AiFillStar, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const URL_BASE = process.env.NEXT_PUBLIC_API_URL;
const ITEMS_PER_PAGE = 12;

export default function CategoriaPage() {
    const { categoria } = useParams();

    const [colecoes, setColecoes] = useState<string[]>([]);
    const [editoras, setEditoras] = useState<{ id: string; nome: string }[]>([]);
    const [idiomas, setIdiomas] = useState<{ id: string; nome: string }[]>([]);
    const [generos, setGeneros] = useState<{ id: string; nome: string }[]>([]);

    const [editoraFiltro, setEditoraFiltro] = useState("Todas");
    const [idiomaFiltro, setIdiomaFiltro] = useState("Todos");
    const [colecaoFiltro, setColecaoFiltro] = useState("Todas");
    const [generoFiltro, setGeneroFiltro] = useState("Todos");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [filtrosAbertos, setFiltrosAbertos] = useState(false);
    const [livrosFiltrados, setLivrosFiltrados] = useState<any[]>([]);

    // Modal state
    const [modalAberto, setModalAberto] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState<any>(null);

    useEffect(() => {
        async function fetchFiltros() {
            try {
                const res = await fetch(`${URL_BASE}/user/filtros/livros`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tipoFiltro: categoria?.toString() || "Todos",
                        userId: Cookies.get("logado_id"),
                    }),
                });
                if (!res.ok) throw new Error("Erro ao buscar dados");

                const data = await res.json();

                setColecoes(data.colecoes || []);
                setEditoras(data.editoras || []);
                setIdiomas(data.idiomas || []);
                setGeneros(data.generos || []);
            } catch (err) {
                console.error("Erro ao buscar filtros:", err);
            }
        }
        fetchFiltros();
    }, []);

    useEffect(() => {
        async function fetchFiltrados() {
            try {
                const res = await fetch(`${URL_BASE}/livros/buscar-livros`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        editora: editoraFiltro,
                        idioma: idiomaFiltro,
                        colecao: colecaoFiltro,
                        genero: generoFiltro,
                        tipo: categoria?.toString() || "Todos",
                        userId: Cookies.get("logado_id"),
                    }),
                });
                const data = await res.json();
                setLivrosFiltrados(data || []);
                setPaginaAtual(1);
            } catch (err) {
                console.error("Erro ao buscar livros:", err);
            }
        }
        fetchFiltrados();
    }, [editoraFiltro, idiomaFiltro, colecaoFiltro, generoFiltro, categoria]);

    const totalPaginas = Math.ceil(livrosFiltrados.length / ITEMS_PER_PAGE);
    const itensPagina = livrosFiltrados.slice(
        (paginaAtual - 1) * ITEMS_PER_PAGE,
        paginaAtual * ITEMS_PER_PAGE
    );

    // Abre modal com item clicado
    function abrirModal(item: any) {
        setItemSelecionado(item);
        setModalAberto(true);
    }

    // Fecha modal
    function fecharModal() {
        setModalAberto(false);
        setItemSelecionado(null);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-900 to-black pt-28 px-4 text-white overflow-hidden">
            <h1 className="text-3xl font-bold mb-8 text-center capitalize">
                Categoria: {`${categoria}s` || "Nenhuma"}
            </h1>

            <div className="flex flex-col md:flex-row flex-1 gap-6 h-[calc(100vh-8rem)]">
                <button
                    className="md:hidden mb-4 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-700 rounded font-semibold hover:bg-indigo-600 transition"
                    onClick={() => setFiltrosAbertos((v) => !v)}
                >
                    <FiFilter size={20} />
                    {filtrosAbertos ? "Fechar filtros" : "Mostrar filtros"}
                </button>

                <aside
                    className={`flex flex-col gap-6 bg-indigo-800 bg-opacity-30 rounded-lg shadow-md p-4
          ${filtrosAbertos ? "block" : "hidden"} md:block md:w-1/4 md:max-h-[440px]`}
                >
                    {filtrosAbertos ? "" : <label className="mb-1 font-semibold">Filtros</label>}
                    <div className="flex flex-col mt-3">
                        <label className="mb-1 font-semibold">Editora</label>
                        <select
                            value={editoraFiltro}
                            onChange={(e) => setEditoraFiltro(e.target.value)}
                            className="rounded bg-indigo-700 text-white p-2"
                        >
                            <option value="Todas">Todas</option>
                            {editoras.map((e) => (
                                <option key={e.id} value={e.nome}>
                                    {e.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col mt-3">
                        <label className="mb-1 font-semibold">Idioma</label>
                        <select
                            value={idiomaFiltro}
                            onChange={(e) => setIdiomaFiltro(e.target.value)}
                            className="rounded bg-indigo-700 text-white p-2"
                        >
                            <option value="Todos">Todos</option>
                            {idiomas.map((i) => (
                                <option key={i.id} value={i.nome}>
                                    {i.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col mt-3">
                        <label className="mb-1 font-semibold">Gênero</label>
                        <select
                            value={generoFiltro}
                            onChange={(e) => setGeneroFiltro(e.target.value)}
                            className="rounded bg-indigo-700 text-white p-2"
                        >
                            <option value="Todos">Todos</option>
                            {generos.map((g) => (
                                <option key={g.id} value={g.nome}>
                                    {g.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col mt-3">
                        <label className="mb-1 font-semibold">Coleção</label>
                        <select
                            value={colecaoFiltro}
                            onChange={(e) => setColecaoFiltro(e.target.value)}
                            className="rounded bg-indigo-700 text-white p-2"
                        >
                            <option value="Todas">Todas</option>
                            {colecoes.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>

                <section className="md:w-3/4 bg-indigo-800 bg-opacity-30 rounded-lg shadow-md p-4 flex flex-col max-h-full md:max-h-[440px] relative">
                    <div className="flex-grow overflow-y-auto mb-20">
                        {itensPagina.length === 0 ? (
                            <p className="text-center mt-8 text-gray-300">Nenhum item encontrado.</p>
                        ) : (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {itensPagina.map((item) => (
                                    <li
                                        key={item.id}
                                        className="bg-indigo-900/60 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col cursor-pointer"
                                        onClick={() => abrirModal(item)}
                                    >
                                        <div className="relative w-full h-48 mb-3">
                                            <img
                                                src={
                                                    item.imagem
                                                        ? `http://localhost:3006/uploads/${item.imagem}`
                                                        : "https://via.placeholder.com/300x200?text=Sem+Imagem"
                                                }
                                                alt={`Capa de ${item.titulo}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>

                                        <h3 className="font-bold text-lg text-white mb-1 flex items-center justify-between">
                                            <span>{item.titulo}</span>
                                            {item.volume && (
                                                <span className="text-sm text-indigo-300 ml-2">Vol. {item.volume}</span>
                                            )}
                                        </h3>

                                        {item.EditoraLivro?.length > 0 && (
                                            <p className="text-sm text-indigo-200">
                                                <strong>Editora:</strong>{" "}
                                                {item.EditoraLivro.map((el: { editora: { nome: string } }) => el.editora.nome).join(", ")}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {livrosFiltrados.length > 0 && (
                        <nav className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
                            <button
                                onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
                                disabled={paginaAtual === 1}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white disabled:opacity-50"
                            >
                                Anterior
                            </button>
                            <span className="text-white">
                                Página {paginaAtual} de {totalPaginas}
                            </span>
                            <button
                                onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
                                disabled={paginaAtual === totalPaginas}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white disabled:opacity-50"
                            >
                                Próxima
                            </button>
                        </nav>
                    )}
                </section>
            </div>

            {/* Modal */}
            {modalAberto && itemSelecionado && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50"
                    onClick={fecharModal}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="bg-indigo-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-indigo-300 hover:text-white text-2xl font-bold"
                            onClick={fecharModal}
                            aria-label="Fechar modal"
                        >
                            &times;
                        </button>

                        <div className="flex flex-col md:flex-row gap-6">
                            <img
                                src={
                                    itemSelecionado.imagem
                                        ? `http://localhost:3006/uploads/${itemSelecionado.imagem}`
                                        : "https://via.placeholder.com/300x400?text=Sem+Imagem"
                                }
                                alt={`Capa de ${itemSelecionado.titulo}`}
                                className="w-full md:w-52 h-auto object-cover rounded-md"
                            />

                            <div className="flex-1 text-white">
                                <h2 className="text-3xl font-bold mb-3">{itemSelecionado.titulo}</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    <p><span className="text-indigo-400 font-semibold">Volume:</span> {itemSelecionado.volume}</p>
                                    <p><span className="text-indigo-400 font-semibold">Coleção:</span> {itemSelecionado.colecao}</p>
                                    <p><span className="text-indigo-400 font-semibold">Tipo:</span> {itemSelecionado.tipo.charAt(0).toUpperCase() + itemSelecionado.tipo.slice(1)}</p>
                                    <p><span className="text-indigo-400 font-semibold">Edição:</span> {itemSelecionado.edicao}</p>
                                    <p><span className="text-indigo-400 font-semibold">Lançamento:</span> {itemSelecionado.dataLancamento}</p>
                                    <p><span className="text-indigo-400 font-semibold">Preço de Capa:</span> R$ {itemSelecionado.precoCapa}</p>

                                    {itemSelecionado.EditoraLivro?.length > 0 && (
                                        <p>
                                            <span className="text-indigo-400 font-semibold">Editora:</span>{" "}
                                            {itemSelecionado.EditoraLivro.map((e: { editora: { nome: any; }; }) => e.editora?.nome).join(", ")}
                                        </p>
                                    )}
                                    {itemSelecionado.IdiomaLivro?.length > 0 && (
                                        <p>
                                            <span className="text-indigo-400 font-semibold">Idioma:</span>{" "}
                                            {itemSelecionado.IdiomaLivro.map((i: { idioma: { nome: any; }; }) => i.idioma?.nome).join(", ")}
                                        </p>
                                    )}
                                    {itemSelecionado.generos?.length > 0 && (
                                        <p>
                                            <span className="text-indigo-400 font-semibold">Gênero(s):</span>{" "}
                                            {itemSelecionado.generos.map((g: { genero: { nome: any; }; }) => g.genero?.nome).join(", ")}
                                        </p>
                                    )}
                                </div>

                                {itemSelecionado.leitores?.length > 0 && (
                                    <div className="mt-4 border-t border-indigo-700 pt-4">
                                        <h3 className="text-lg font-semibold text-indigo-300 mb-2">Informações do Usuário</h3>
                                        <p><span className="text-indigo-400 font-semibold">Valor Pago:</span> R$ {itemSelecionado.leitores[0].valorPago}</p>
                                        <p><span className="text-indigo-400 font-semibold">Conservação:</span> {itemSelecionado.leitores[0].conservacao}/10</p>
                                        <p><span className="text-indigo-400 font-semibold">Leu:</span> {itemSelecionado.leitores[0].lido === "sim" ? "Sim" : "Não"}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-indigo-400 font-semibold">Nota:</span>
                                            {[...Array(5)].map((_, i) => {
                                                const notaUsuario = itemSelecionado.leitores[0].nota;
                                                const notaConvertida = notaUsuario / 2;

                                                if (i + 1 <= Math.floor(notaConvertida)) {
                                                    return <AiFillStar key={i} className="text-yellow-400" />;
                                                } else if (i < notaConvertida) {
                                                    return <FaRegStarHalfStroke className="text-yellow-400" />
                                                } else {
                                                    return <AiOutlineStar key={i} className="text-yellow-400" />;
                                                }
                                            })}
                                        </div>
                                    </div>
                                )}

                                {itemSelecionado.descricao && (
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-indigo-300 mb-2">Descrição</h3>
                                        <p className="whitespace-pre-line text-sm text-gray-200">{itemSelecionado.descricao}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
