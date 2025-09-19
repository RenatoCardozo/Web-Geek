'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import "@/app/globals.css";

const URL_BASE = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    tipoItem: string;
    resetTipoItem: () => void;
    onStepChange: React.Dispatch<React.SetStateAction<number>>;
};

type Idioma = {
    nome: string;
};

type Editora = {
    nome: string;
};

type cadastrado = {
    mensagem: string;
    livro: {
        id: string;
    };
};

export default function cadastroLivros({ tipoItem, resetTipoItem, onStepChange }: Props) {
    const [step, setStep] = useState<number>(1);
    const [imagem, setImagem] = useState<File | null>(null);
    const [previewImagem, setPreviewImagem] = useState<string>("");
    const [descricao, setDescricao] = useState('')
    const [titulo, setTitulo] = useState("");
    const [volume, setVolume] = useState("");
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");
    const [editora, setEditora] = useState("");
    const [idioma, setIdioma] = useState("");
    const [precoCapa, setPrecoCapa] = useState("");
    const [dataLancamento, setDataLancamento] = useState("");
    const [colecao, setColecao] = useState("");
    const [edicao, setEdicao] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [leu, setLeu] = useState('');
    const [valorPago, setValorPago] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [conservacao, setConservacao] = useState('');
    const [livroCadastrado, setLivroCadastrado] = useState<cadastrado | null>(null)

    const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImagem(file);
        setPreviewImagem(URL.createObjectURL(file));
    };

    useEffect(() => {
        setStep(1);
        zeraInputs()
        onStepChange(1)
    }, [tipoItem]);

    const nextStep = () => {
        if (step === 4) {
            const volumeHTML = tipoItem !== 'livro'
                ? `<div><strong>Volume:</strong> ${volume || '-'}</div>`
                : '';
            Swal.fire({
                title: 'Confirmar Cadastro?',
                html: `
                <div style="display: flex; gap: 20px; align-items: flex-start; font-size: 14px; text-align: left;">
                    ${previewImagem
                        ? `<img src="${previewImagem}" alt="Capa selecionada" style="width: 100px; height: 140px; border-radius: 4px; object-fit: cover;" />`
                        : ''
                    }
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <div><strong>Coleção:</strong> ${colecao || '-'}</div>
                        <div><strong>Edição:</strong> ${edicao || '-'}</div>
                        <div><strong>Título:</strong> ${titulo || '-'}</div>
                        ${volumeHTML}
                        <div><strong>Preço de Capa:</strong> R$ ${precoCapa || '-'}</div>
                        <div><strong>Gênero:</strong> ${genero || '-'}</div>
                        <div><strong>Autor:</strong> ${autor || '-'}</div>
                        <div><strong>Editora:</strong> ${editora || '-'}</div>
                        <div><strong>Idioma:</strong> ${idioma || '-'}</div>
                        <div><strong>Lançamento:</strong> ${dataLancamento || '-'}</div>
                    </div>
                </div>
            `,
                showCancelButton: true,
                confirmButtonText: 'Cadastrar',
                cancelButtonText: 'Cancelar',
                background: '#1f1b2e',
                color: '#fff',
                width: 600,
            }).then((result) => {
                if (result.isConfirmed) {
                    handleSubmit();
                }
            });
        } else {
            setStep(step + 1);
            onStepChange(step + 1)
        }
    };


    const prevStep = () => {
        onStepChange((prev: number) => (prev > 1 ? prev - 1 : prev));
        setStep((prev: number) => (prev > 1 ? prev - 1 : prev));
    }

    const inputClass =
        'w-full h-[42px] px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600';

    const animationVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    };

    const zeraInputs = () => {
        setTitulo("");
        setVolume("");
        setAutor("");
        setGenero("");
        setEditora("");
        setIdioma("");
        setImagem(null);
        setPrecoCapa("");
        setDataLancamento("");
        setColecao("");
        setPreviewImagem('')
        setDescricao('')
        setEdicao('')
    };


    const formatCurrency = (value: string) => {
        let numericValue = value.replace(/\D/g, '');

        numericValue = (Number(numericValue) / 100).toFixed(2);

        return numericValue.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleAnoLancamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, ""); // Só números

        if (input.length > 4) {
            input = input.slice(0, 4); // Limita a 4 dígitos
        }

        const ano = Number(input);
        const anoAtual = new Date().getFullYear();

        // Se o ano for maior que o atual ou menor que 1000, zera
        if (input.length === 4 && (ano > anoAtual || ano < 1000)) {
            input = "";
        }

        setDataLancamento(input);
    };

    const handleSubmit = async () => {
        try {
            console.log("Enviando dados do formulário...");

            const formData = new FormData();

            if (edicao === 'unico' || tipoItem === 'livro') {
                formData.append('volume', "0");
            } else {
                formData.append('volume', volume.toString());
            }

            formData.append('titulo', titulo);
            formData.append('autor', autor);
            formData.append('genero', genero);
            formData.append('editora', editora);
            formData.append('idioma', idioma);
            formData.append('precoCapa', precoCapa);
            formData.append('dataLancamento', dataLancamento);
            formData.append('colecao', colecao);
            formData.append('descricao', descricao);
            formData.append('cadastradoPor', Cookies.get('logado_id') || '');
            formData.append('edicao', edicao);
            formData.append('tipo', tipoItem);

            if (imagem) {
                formData.append('imagem', imagem, `livro_${Date.now()}.jpg`);
            }

            const res = await fetch(`${URL_BASE}/livros/register`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setLivroCadastrado(data)
            console.log('livroCadastrado:', livroCadastrado);

            if (res.status === 201) {
                console.log("Livro cadastrado com sucesso:", data);

                // Perguntar se deseja adicionar à coleção
                const result = await Swal.fire({
                    title: 'Livro cadastrado!',
                    text: 'Deseja adicionar à sua coleção agora?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    background: '#1f1b2e',
                    color: '#fff'
                });

                if (result.isConfirmed) {
                    setModalVisible(true)
                } else {
                    zeraInputs();
                    setStep(1);
                    onStepChange(1)
                    resetTipoItem();
                }
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: data.erro || 'Erro ao cadastrar livro.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1b2e',
                    color: '#fff'
                });
            }
        } catch (error: any) {
            console.error("Erro:", error);
            Swal.fire({
                title: 'Erro!',
                text: error.message || 'Não foi possível cadastrar o livro.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    const [idiomas, setIdiomas] = useState<Idioma[]>([])
    const [idiomasFiltro, setIdiomasFiltro] = useState<Idioma[]>([])
    const [editoras, setEditoras] = useState<Editora[]>([])
    const [editorasFiltro, setEditorasFiltro] = useState<Editora[]>([])
    const [generos, setGeneros] = useState<Editora[]>([])
    const [generosFiltro, setGenerosFiltro] = useState<Editora[]>([])

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const resIdioma = await fetch(`${URL_BASE}/livros/idiomas`);
                const resEditora = await fetch(`${URL_BASE}/livros/editoras`);
                const resGeneros = await fetch(`${URL_BASE}/livros/generos`);
                const dataIdioma = await resIdioma.json();
                const dataEditora = await resEditora.json();
                const dataGeneros = await resGeneros.json();
                setIdiomas(dataIdioma);
                setEditoras(dataEditora);
                setGeneros(dataGeneros)
            } catch (error) {
                console.error("Erro ao buscar idiomas, editoras:", error);
            }
        };
        buscarDados()
    }, []);

    useEffect(() => {
        if (idioma.trim() === "") {
            setIdiomasFiltro([]);
            return;
        }

        const resultado = idiomas.filter((item) =>
            item.nome.toLowerCase().includes(idioma.toLowerCase())
        );
        setIdiomasFiltro(resultado);
    }, [idioma, idiomas]);

    useEffect(() => {
        if (editora.trim() === "") {
            setEditorasFiltro([]);
            return;
        }

        const resultado = editoras.filter((item) =>
            item.nome.toLowerCase().includes(editora.toLowerCase())
        );
        setEditorasFiltro(resultado);
    }, [editora, editoras]);

    useEffect(() => {
        if (genero.trim() === "") {
            setGenerosFiltro([]);
            return;
        }

        const resultado = generos.filter((item) =>
            item.nome.toLowerCase().includes(genero.toLowerCase())
        );
        setGenerosFiltro(resultado);
    }, [genero, generos]);

    const cadastrarColecao = async () => {
        const body = {
            livro_id: livroCadastrado?.livro.id,
            user_id: Cookies.get('logado_id') || '',
            valorPago: valorPago,
            conservacao,
            nota: avaliacao,
            lido: leu,
        };

        try {
            const res = await fetch(`${URL_BASE}/livros/cadastrarColecao`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json()

            if (res.ok) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Adicionado a coleção com sucesso',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1b2e',
                    color: '#fff'
                });
                setModalVisible(false);
                setValorPago('');
                setConservacao('');
                setAvaliacao('');
                setLeu('');
                zeraInputs();
                setStep(1);
                onStepChange(1)
                resetTipoItem();
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: data.error || 'Erro ao cadastrar livro.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1b2e',
                    color: '#fff'
                });
            }
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Erro interno do servidor.',
                showConfirmButton: false,
                timer: 3000,
                background: '#1f1b2e',
                color: '#fff'
            });
        }
    };

    return (
        <>
            {/* <div className="flex justify-center mb-6 gap-2 mt-5">
                <span
                    className={`w-4 h-4 rounded-full ${step === 1 ? 'bg-blue-500' : 'bg-slate-500'
                        }`}
                ></span>
                <span
                    className={`w-4 h-4 rounded-full ${step === 2 ? 'bg-blue-500' : 'bg-slate-500'
                        }`}
                ></span>
                <span
                    className={`w-4 h-4 rounded-full ${step === 3 ? 'bg-blue-500' : 'bg-slate-500'
                        }`}
                ></span>
                <span
                    className={`w-4 h-4 rounded-full ${step === 4 ? 'bg-blue-500' : 'bg-slate-500'
                        }`}
                ></span>
            </div> */}

            <form>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={animationVariants}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >

                            <>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Coleção</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                Nome da coleção a que este item pertence.
                                            </span>
                                        </div>
                                    </div>
                                    <input
                                        placeholder="Coleção"
                                        className={inputClass}
                                        value={colecao}
                                        onChange={e => setColecao(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Edição</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                .
                                            </span>
                                        </div>
                                    </div>
                                    <select
                                        value={edicao}
                                        onChange={(e) => {
                                            setEdicao(e.target.value);

                                        }}
                                        className={`${inputClass}`}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="regular">Regular</option>
                                        <option value="unico">Volume Unico</option>
                                        <option value="especial">Edição Especial</option>
                                        <option value="historica">Historica</option>
                                        <option value="omnibus">Omnibus</option>
                                        <option value="capaCartao">Capa Cartão</option>
                                        <option value="capaDura">Capa Dura</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Título</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                Informe o título principal da obra.
                                            </span>
                                        </div>
                                    </div>
                                    <input
                                        placeholder="Título"
                                        className={inputClass}
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />
                                </div>
                                {!(tipoItem === "livro" || edicao === "unico") && (
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-xs sm:text-sm text-purple-300">Volume</label>
                                            <div className="relative group cursor-pointer">
                                                <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                                <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                    Adicione o volume aqui.
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            placeholder="Volume"
                                            className={inputClass}
                                            value={volume}
                                            onChange={(e) => {
                                                const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                                                setVolume(onlyNumbers);
                                            }}
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Preço de capa</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                Valor do preço sugerido na capa do item.
                                            </span>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Preço de capa"
                                        className={inputClass}
                                        value={precoCapa ? `R$ ${precoCapa}` : ''}
                                        onChange={e => {
                                            const rawValue = e.target.value.replace(/[^\d,\.]/g, '');
                                            const formattedValue = formatCurrency(rawValue);
                                            setPrecoCapa(formattedValue);
                                        }}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Gênero</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                Ex: Aventura, Romance, Horror, Shonen, etc.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative w-full">
                                        <input
                                            placeholder="Gênero"
                                            className={inputClass}
                                            value={genero}
                                            onChange={(e) => setGenero(e.target.value)}
                                        />
                                        {generosFiltro.length > 0 && (
                                            <ul className="absolute z-50 w-full  bg-gray-700 text-white  rounded mt-1 max-h-20 overflow-y-auto shadow-lg hide-scrollbar">
                                                {generosFiltro.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        onMouseDown={() => {
                                                            setGenero(item.nome);
                                                            setTimeout(() => {
                                                                setGenerosFiltro([]);
                                                            }, 0);
                                                        }}
                                                        className="px-3 py-2 hover:bg-gray-800 cursor-pointer"
                                                    >
                                                        {item.nome}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                            </>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={animationVariants}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Editora</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                Nome da editora responsável pela publicação.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative w-full">
                                        <input
                                            placeholder="Editora"
                                            className={inputClass}
                                            value={editora}
                                            onChange={(e) => setEditora(e.target.value)}
                                        />
                                        {editorasFiltro.length > 0 && (
                                            <ul className="absolute z-50 w-full  bg-gray-700 text-white  rounded mt-1 max-h-60 overflow-y-auto shadow-lg hide-scrollbar">
                                                {editorasFiltro.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        onMouseDown={() => {
                                                            setEditora(item.nome);
                                                            setTimeout(() => {
                                                                setEditorasFiltro([]);
                                                            }, 0);
                                                        }}
                                                        className="px-3 py-2 hover:bg-gray-800 cursor-pointer"
                                                    >
                                                        {item.nome}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Idioma</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                Idioma da publicação.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative w-full">
                                        <input
                                            placeholder="Idioma"
                                            className={inputClass}
                                            value={idioma}
                                            onChange={(e) => setIdioma(e.target.value)}
                                        />
                                        {idiomasFiltro.length > 0 && (
                                            <ul className="absolute z-50 w-full  bg-gray-700 text-white  rounded mt-1 max-h-60 overflow-y-auto shadow-lg hide-scrollbar">
                                                {idiomasFiltro.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        onMouseDown={() => {
                                                            setIdioma(item.nome);
                                                            setTimeout(() => {
                                                                setIdiomasFiltro([]);
                                                            }, 0);
                                                        }}
                                                        className="px-3 py-2 hover:bg-gray-800 cursor-pointer"
                                                    >
                                                        {item.nome}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Autor</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                Nome do autor ou autora responsável pela obra.
                                            </span>
                                        </div>
                                    </div>
                                    <input
                                        placeholder="Autor"
                                        className={inputClass}
                                        value={autor}
                                        onChange={(e) => setAutor(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs sm:text-sm text-purple-300">Data de Lançamento</label>
                                        <div className="relative group cursor-pointer">
                                            <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                Ano de lançamento do item (formato AAAA).
                                            </span>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="AAAA"
                                        maxLength={4}
                                        className={inputClass}
                                        value={dataLancamento}
                                        onChange={handleAnoLancamentoChange}
                                    />
                                </div>

                            </>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={animationVariants}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs sm:text-sm text-purple-300 block">Imagem</label>
                                    <div className="relative group cursor-pointer">
                                        <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            Selecione a imagem do item.
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`${inputClass} relative cursor-pointer p-2 flex justify-center items-center border-2 border-dashed border-purple-400 hover:border-purple-500 transition duration-200`}
                                    onClick={() => document.getElementById('uploadCapa')?.click()}
                                >
                                    <span className="text-purple-400 text-sm">Clique para selecionar uma imagem</span>
                                </div>
                                <input
                                    type="file"
                                    id="uploadCapa"
                                    accept="image/*"
                                    onChange={handleCapaChange}
                                    className="hidden"
                                />
                                {previewImagem && (
                                    <div className="mt-4 flex justify-center">
                                        <img
                                            src={previewImagem}
                                            alt="Preview da Capa"
                                            className="w-full max-w-[200px] h-auto rounded-lg border border-purple-500 shadow-md mx-auto"
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={animationVariants}
                            transition={{ duration: 0.4 }}
                        >

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs sm:text-sm text-purple-300">
                                        Sinopse
                                    </label>
                                    <div className="relative group cursor-pointer">
                                        <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            Escreva uma sinopse detalhada do livro, mangá, HQ ou novel.
                                        </span>
                                    </div>
                                </div>
                                <textarea
                                    placeholder='Sinopse'
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    className="hide-scrollbar w-full px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 h-32"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="bg-gray-500 hover:bg-gray-600 text-white transition px-4 py-2 rounded w-full sm:w-2/5 text-sm sm:text-base font-semibold"
                        >
                            Anterior
                        </button>
                    ) : (
                        <div></div>
                    )}

                    <button
                        type="button"
                        onClick={nextStep}
                        disabled={tipoItem === ''}
                        className={`transition px-4 py-2 rounded w-full sm:w-2/5 text-sm sm:text-base font-semibold ${tipoItem !== ''
                            ? 'bg-purple-400 hover:bg-purple-800 text-black hover:text-white'
                            : 'bg-gray-500 cursor-not-allowed text-gray-300'
                            }`}
                    >
                        {step < 4 ? 'Próximo' : 'Cadastrar'}
                    </button>
                </div>
            </form>

            {modalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4 text-purple-400 text-center">Adicionar à Coleção</h2>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs sm:text-sm text-purple-300">Valor Pago</label>
                                <div className="relative group cursor-pointer">
                                    <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                    <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        Valor que você pagou na obra, em reais.
                                    </span>
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="Ex: 29,90"
                                className={inputClass}
                                value={valorPago ? `R$ ${valorPago}` : ''}
                                onChange={e => {
                                    const rawValue = e.target.value.replace(/[^\d,\.]/g, '');
                                    const formattedValue = formatCurrency(rawValue);
                                    setValorPago(formattedValue);
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs sm:text-sm text-purple-300">Estado de Conservação</label>
                                <div className="relative group cursor-pointer">
                                    <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                    <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        De 0 (péssimo) a 10 (novo).
                                    </span>
                                </div>
                            </div>
                            <input
                                placeholder="0 a 10"
                                className={inputClass}
                                value={conservacao}
                                onChange={(e) => {
                                    let onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                                    if (onlyNumbers !== '') {
                                        const num = parseInt(onlyNumbers);
                                        if (num > 10) {
                                            onlyNumbers = '10';
                                        }
                                    }
                                    setConservacao(onlyNumbers);
                                }}
                            />
                        </div>

                        {/* Nota */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs sm:text-sm text-purple-300">Avaliação</label>
                                <div className="relative group cursor-pointer">
                                    <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                    <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        Sua nota para a obra.
                                    </span>
                                </div>
                            </div>
                            <input
                                placeholder="0 a 10"
                                className={inputClass}
                                value={avaliacao}
                                onChange={(e) => {
                                    let onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                                    if (onlyNumbers !== '') {
                                        const num = parseInt(onlyNumbers);
                                        if (num > 10) {
                                            onlyNumbers = '10';
                                        }
                                    }
                                    setAvaliacao(onlyNumbers);
                                }}
                            />
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs sm:text-sm text-purple-300">Já leu?</label>
                            </div>
                            <select
                                className={inputClass}
                                value={leu}
                                onChange={(e) => {
                                    setLeu(e.target.value);
                                }}
                            >
                                <option value="">Selecione...</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalVisible(false)}
                                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={cadastrarColecao}
                                className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 transition"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}