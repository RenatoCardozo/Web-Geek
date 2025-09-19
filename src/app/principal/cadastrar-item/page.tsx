// 'use client'

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaInfoCircle } from 'react-icons/fa';
// import Cookies from 'js-cookie'
// import Swal from 'sweetalert2';

// export default function FormularioItemMultiEtapas() {
//     const [step, setStep] = useState<number>(1);
//     const [tipoItem, setTipoItem] = useState<string>('');
//     const [imagem, setImagem] = useState<File | null>(null);
//     const [previewImagem, setPreviewImagem] = useState<string>("");
//     const [descricao, setDescricao] = useState('')

//     const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         setImagem(file); // armazenamos o File diretamente
//         setPreviewImagem(URL.createObjectURL(file)); // apenas para exibição
//     };



//     // Estados para tipo 'jogos'
//     const [nomeJogo, setNomeJogo] = useState("");
//     const [tipoJogo, setTipoJogo] = useState("");
//     const [fabricanteEstudio, setFabricanteEstudio] = useState("");
//     const [serieFranquiaJogo, setSerieFranquiaJogo] = useState("");

//     // Estados para livros, mangás, hqs, novels
//     const [titulo, setTitulo] = useState("");
//     const [volume, setVolume] = useState("");
//     const [autor, setAutor] = useState("");
//     const [genero, setGenero] = useState("");
//     const [editora, setEditora] = useState("");
//     const [idioma, setIdioma] = useState("");
//     const [precoCapa, setPrecoCapa] = useState("");
//     const [dataLancamento, setDataLancamento] = useState("");
//     const [colecao, setColecao] = useState("");

//     // Estados para figure
//     const [nomeFigura, setNomeFigura] = useState("");
//     const [alturaFigura, setAlturaFigura] = useState("");
//     const [fabricanteFigura, setFabricanteFigura] = useState("");
//     const [serieFranquiaFigura, setSerieFranquiaFigura] = useState("");
//     const [valorEstimado, setValorEstimado] = useState("");

//     // Estados para album
//     const [nomeAlbum, setNomeAlbum] = useState("");
//     const [numPaginasAlbum, setNumPaginasAlbum] = useState("");
//     const [tipoAlbum, setTipoAlbum] = useState("");
//     const [fabricanteEditoraAlbum, setFabricanteEditoraAlbum] = useState("");

//     // Estados para artbook
//     const [nomeArtbook, setNomeArtbook] = useState("");
//     const [ilustradorArtbook, setIlustradorArtbook] = useState("");
//     const [numPaginasArtbook, setNumPaginasArtbook] = useState("");
//     const [idiomaArtbook, setIdiomaArtbook] = useState("");
//     const [editoraArtbook, setEditoraArtbook] = useState("");
//     const [serieFranquiaArtbook, setSerieFranquiaArtbook] = useState("");

//     // Estados para card
//     const [nomeCard, setNomeCard] = useState("");
//     const [numCartasCard, setNumCartasCard] = useState("");
//     const [edicaoCard, setEdicaoCard] = useState("");
//     const [fabricanteDistribuidorCard, setFabricanteDistribuidorCard] = useState("");
//     const [valorEstimadoCard, setValorEstimadoCard] = useState("");


//     const nextStep = () => {
//         if (step === 4) {
//             handleSubmit();
//         } else {
//             setStep(step + 1);
//         }
//     };

//     const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

//     const inputClass =
//         'w-full h-[42px] px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600';

//     const animationVariants = {
//         initial: { opacity: 0, scale: 0.8 },
//         animate: { opacity: 1, scale: 1 },
//         exit: { opacity: 0, scale: 0.8 },
//     };

//     const zeraInputs = () => {
//         setTitulo("");
//         setVolume("");
//         setAutor("");
//         setGenero("");
//         setEditora("");
//         setIdioma("");
//         setImagem(null);
//         setPrecoCapa("");
//         setDataLancamento("");
//         setColecao("");
//         setPreviewImagem('')
//         setDescricao('')

//         // Estados para figure
//         setNomeFigura("");
//         setAlturaFigura("");
//         setFabricanteFigura("");
//         setSerieFranquiaFigura("");
//         setValorEstimado("");

//         // Estados para album
//         setNomeAlbum("");
//         setNumPaginasAlbum("");
//         setTipoAlbum("");
//         setFabricanteEditoraAlbum("");

//         // Estados para artbook
//         setNomeArtbook("");
//         setIlustradorArtbook("");
//         setNumPaginasArtbook("");
//         setIdiomaArtbook("");
//         setEditoraArtbook("");
//         setSerieFranquiaArtbook("");

//         // Estados para card
//         setNomeCard("");
//         setNumCartasCard("");
//         setEdicaoCard("");
//         setFabricanteDistribuidorCard("");
//         setValorEstimadoCard("");
//     };


//     const formatCurrency = (value: string) => {
//         // Remove tudo que não for número
//         let numericValue = value.replace(/\D/g, '');

//         // Transforma em número decimal (ex: 123456 -> 1234.56)
//         numericValue = (Number(numericValue) / 100).toFixed(2);

//         // Formata para pt-BR (ex: 1234.56 -> 1.234,56)
//         return numericValue.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
//     };

//     const handleAnoLancamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         let input = e.target.value.replace(/\D/g, ""); // Só números

//         if (input.length > 4) {
//             input = input.slice(0, 4); // Limita a 4 dígitos
//         }

//         const ano = Number(input);
//         const anoAtual = new Date().getFullYear();

//         // Se o ano for maior que o atual ou menor que 1000, zera
//         if (input.length === 4 && (ano > anoAtual || ano < 1000)) {
//             input = "";
//         }

//         setDataLancamento(input);
//     };




//     const handleSubmit = async () => {
//         try {
//             console.log("Enviando dados do formulário...");

//             const formData = new FormData();

//             formData.append('titulo', titulo);
//             formData.append('volume', volume.toString());
//             formData.append('autor', autor);
//             formData.append('genero', genero);
//             formData.append('editora', editora);
//             formData.append('idioma', idioma);
//             formData.append('precoCapa', precoCapa);
//             formData.append('dataLancamento', dataLancamento);
//             formData.append('colecao', colecao);
//             formData.append('descricao', descricao);
//             formData.append('cadastradoPor', Cookies.get('logado_id') || '');

//             if (imagem) {
//                 formData.append('imagem', imagem, `livro_${Date.now()}.jpg`);
//             }

//             const res = await fetch("http://localhost:3006/livros/register", {
//                 method: "POST",
//                 body: formData,
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.erro || "Erro ao cadastrar livro");
//             }

//             console.log("Livro cadastrado com sucesso:", data);
//             Swal.fire({
//                 title: 'Sucesso!',
//                 text: 'Livro cadastrado com sucesso.',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             });

//         } catch (error: any) {
//             console.error("Erro:", error);
//             Swal.fire({
//                 title: 'Erro!',
//                 text: error.message || 'Não foi possível cadastrar o livro.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };



//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black p-2 pt-36 md:pt-20">
//             <div className="w-full max-w-4xl bg-gray-800 border-2 border-purple-700 rounded-2xl p-4 sm:p-5 shadow-xl">
//                 <h2 className="text-2xl font-bold mb-6 text-center text-purple-300">
//                     Cadastrar Novo Item
//                 </h2>

//                 <div className="flex justify-center mb-6 gap-2">
//                     <span
//                         className={`w-4 h-4 rounded-full ${step === 1 ? 'bg-blue-500' : 'bg-slate-500'
//                             }`}
//                     ></span>
//                     <span
//                         className={`w-4 h-4 rounded-full ${step === 2 ? 'bg-blue-500' : 'bg-slate-500'
//                             }`}
//                     ></span>
//                     <span
//                         className={`w-4 h-4 rounded-full ${step === 3 ? 'bg-blue-500' : 'bg-slate-500'
//                             }`}
//                     ></span>
//                     <span
//                         className={`w-4 h-4 rounded-full ${step === 4 ? 'bg-blue-500' : 'bg-slate-500'
//                             }`}
//                     ></span>
//                 </div>

//                 <form>
//                     <AnimatePresence mode="wait">
//                         {step === 1 && (
//                             <motion.div
//                                 key="step1"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={animationVariants}
//                                 transition={{ duration: 0.4 }}
//                                 className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                             >
//                                 <div className="md:col-span-2">
//                                     <div className="flex justify-between items-center mb-1">
//                                         <label className="text-xs sm:text-sm text-purple-300">
//                                             Tipo do Item
//                                         </label>
//                                         <div className="relative group cursor-pointer">
//                                             <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                             <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                 Selecione o tipo de item que deseja Cadastrar.
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <select
//                                         value={tipoItem}
//                                         onChange={(e) => {
//                                             setTipoItem(e.target.value);
//                                             zeraInputs();
//                                         }}
//                                         className={`${inputClass}`}
//                                     >
//                                         <option value="">Selecione...</option>
//                                         <option value="livro">Livro</option>
//                                         <option value="manga">Mangá</option>
//                                         <option value="hq">HQ</option>
//                                         <option value="novel">Novel</option>
//                                         <option value="figure">Figure</option>
//                                         <option value="album">Álbum</option>
//                                         <option value="artbook">Artbook</option>
//                                         <option value="card">Card / Coleção de Cards</option>
//                                         <option value="jogos">Jogos</option>
//                                     </select>
//                                 </div>

//                                 {tipoItem === "jogos" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">
//                                                     Nome do jogo
//                                                 </label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Adicione o nome do jogo.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Nome do Jogo"
//                                                 className={inputClass}
//                                                 value={nomeJogo}
//                                                 onChange={(e) => setNomeJogo(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">
//                                                     Tipo de jogo
//                                                 </label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Selecione o tipo de jogo que deseja Cadastrar.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <select
//                                                 value={tipoJogo}
//                                                 onChange={(e) => setTipoJogo(e.target.value)}
//                                                 className={inputClass}
//                                             >
//                                                 <option value="">Selecione...</option>
//                                                 <option value="tabuleiro">Tabuleiro</option>
//                                                 <option value="carta">Carta</option>
//                                                 <option value="eletronico">Eletronico</option>
//                                             </select>
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">
//                                                     Fabricante/Estudio
//                                                 </label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome da empresa ou estudio que produzio o jogo.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Fabricante/Estudio"
//                                                 className={inputClass}
//                                                 value={fabricanteEstudio}
//                                                 onChange={(e) => setFabricanteEstudio(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">
//                                                     Série/Franquia
//                                                 </label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome da sério ou franquia que o jogo faz parte, se não ouver pode deixar em branco.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Série/Franquia"
//                                                 className={inputClass}
//                                                 value={serieFranquiaJogo}
//                                                 onChange={(e) => setSerieFranquiaJogo(e.target.value)}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {["livro", "manga", "hq", "novel"].includes(tipoItem) && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Título</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe o título principal da obra.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Título"
//                                                 className={inputClass}
//                                                 value={titulo}
//                                                 onChange={(e) => setTitulo(e.target.value)}
//                                             />
//                                         </div>
//                                         {tipoItem !== "livro" && (
//                                             <div>
//                                                 <div className="flex justify-between items-center mb-1">
//                                                     <label className="text-xs sm:text-sm text-purple-300">Volume</label>
//                                                     <div className="relative group cursor-pointer">
//                                                         <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                         <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                             Adicione o volume aqui (Exemplo: 1 ou unico).
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                                 <input
//                                                     placeholder="Volume"
//                                                     className={inputClass}
//                                                     value={volume}
//                                                     onChange={(e) => setVolume(e.target.value)}
//                                                 />
//                                             </div>
//                                         )}
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Autor</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome do autor ou autora responsável pela obra.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Autor"
//                                                 className={inputClass}
//                                                 value={autor}
//                                                 onChange={(e) => setAutor(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Gênero</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Ex: Aventura, Romance, Horror, Shonen, etc.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Gênero"
//                                                 className={inputClass}
//                                                 value={genero}
//                                                 onChange={(e) => setGenero(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Editora</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome da editora responsável pela publicação.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Editora"
//                                                 className={inputClass}
//                                                 value={editora}
//                                                 onChange={(e) => setEditora(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Idioma</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Idioma da publicação.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Idioma"
//                                                 className={inputClass}
//                                                 value={idioma}
//                                                 onChange={(e) => setIdioma(e.target.value)}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {tipoItem === "figure" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Nome da Figura</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome oficial ou popular da figura colecionável.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Nome da Figura"
//                                                 className={inputClass}
//                                                 value={nomeFigura}
//                                                 onChange={(e) => setNomeFigura(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Altura (cm)</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-48 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Altura da figura em centímetros (cm).
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Altura (cm)"
//                                                 className={inputClass}
//                                                 value={alturaFigura}
//                                                 onChange={(e) => setAlturaFigura(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Fabricante</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Empresa ou marca que fabricou a figura.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Fabricante"
//                                                 className={inputClass}
//                                                 value={fabricanteFigura}
//                                                 onChange={(e) => setFabricanteFigura(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Série/Franquia</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-48 sm:w-56 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome da série, franquia ou universo ao qual a figura pertence.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Série/Franquia"
//                                                 className={inputClass}
//                                                 value={serieFranquiaFigura}
//                                                 onChange={(e) => setSerieFranquiaFigura(e.target.value)}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {tipoItem === "album" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Nome do Álbum</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome oficial do álbum de figurinhas ou cards.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Nome do Álbum"
//                                                 className={inputClass}
//                                                 value={nomeAlbum}
//                                                 onChange={(e) => setNomeAlbum(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Número de Páginas</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-48 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Quantidade total de páginas do álbum.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Número de Páginas"
//                                                 className={inputClass}
//                                                 value={numPaginasAlbum}
//                                                 onChange={(e) => setNumPaginasAlbum(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Tipo</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-56 sm:w-64 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Tipo de conteúdo: adesivos, figurinhas, cards, etc.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Tipo (adesivos, figurinhas, cards...)"
//                                                 className={inputClass}
//                                                 value={tipoAlbum}
//                                                 onChange={(e) => setTipoAlbum(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Ano de Lançamento</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Ano em que o álbum foi lançado.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Ano de Lançamento"
//                                                 className={inputClass}
//                                                 value={dataLancamento}
//                                                 onChange={handleAnoLancamentoChange}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Fabricante/Editora</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-56 sm:w-64 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome do fabricante ou editora responsável pelo álbum.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Fabricante/Editora"
//                                                 className={inputClass}
//                                                 value={fabricanteEditoraAlbum}
//                                                 onChange={(e) => setFabricanteEditoraAlbum(e.target.value)}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {tipoItem === "artbook" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Nome do Artbook</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome oficial do artbook.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Nome do Artbook"
//                                                 className={inputClass}
//                                                 value={nomeArtbook}
//                                                 onChange={(e) => setNomeArtbook(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Ilustrador</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-36 sm:w-44 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome do ilustrador principal.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Ilustrador"
//                                                 className={inputClass}
//                                                 value={ilustradorArtbook}
//                                                 onChange={(e) => setIlustradorArtbook(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Nº de Páginas</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-36 sm:w-44 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Quantidade total de páginas.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Nº de Páginas"
//                                                 className={inputClass}
//                                                 value={numPaginasArtbook}
//                                                 onChange={(e) => setNumPaginasArtbook(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Idioma</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-36 sm:w-44 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Idioma em que o artbook foi publicado.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Idioma"
//                                                 className={inputClass}
//                                                 value={idiomaArtbook}
//                                                 onChange={(e) => setIdiomaArtbook(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Editora</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-36 sm:w-44 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Editora responsável pela publicação.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Editora"
//                                                 className={inputClass}
//                                                 value={editoraArtbook}
//                                                 onChange={(e) => setEditoraArtbook(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Série/Franquia</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Série ou franquia à qual pertence o artbook.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Série/Franquia"
//                                                 className={inputClass}
//                                                 value={serieFranquiaArtbook}
//                                                 onChange={(e) => setSerieFranquiaArtbook(e.target.value)}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {tipoItem === "card" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Nome do Card ou Coleção</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Nome oficial do card ou coleção.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Nome do Card ou Coleção"
//                                                 className={inputClass}
//                                                 value={nomeCard}
//                                                 onChange={(e) => setNomeCard(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Número de Cartas</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-36 sm:w-44 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Quantidade total de cartas na coleção.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Número de Cartas"
//                                                 className={inputClass}
//                                                 value={numCartasCard}
//                                                 onChange={(e) => setNumCartasCard(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Edição</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-28 sm:w-36 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informações da edição.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Edição"
//                                                 className={inputClass}
//                                                 value={edicaoCard}
//                                                 onChange={(e) => setEdicaoCard(e.target.value)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Fabricante/Distribuidor</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-52 sm:w-60 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Empresa responsável pela fabricação ou distribuição.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Fabricante/Distribuidor"
//                                                 className={inputClass}
//                                                 value={fabricanteDistribuidorCard}
//                                                 onChange={(e) => setFabricanteDistribuidorCard(e.target.value)}
//                                             />
//                                         </div>
//                                     </>
//                                 )}
//                             </motion.div>
//                         )}

//                         {step === 2 && (
//                             <motion.div
//                                 key="step2"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={animationVariants}
//                                 transition={{ duration: 0.4 }}
//                                 className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                             >
//                                 {["livro", "manga", "hq", "novel"].includes(tipoItem) && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Preço de capa</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Valor do preço sugerido na capa do item.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Preço de capa"
//                                                 className={inputClass}
//                                                 value={precoCapa ? `R$ ${precoCapa}` : ''}
//                                                 onChange={e => {
//                                                     const rawValue = e.target.value.replace(/[^\d,\.]/g, '');
//                                                     const formattedValue = formatCurrency(rawValue);
//                                                     setPrecoCapa(formattedValue);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Data de Lançamento</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Ano de lançamento do item (formato AAAA).
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 placeholder="AAAA"
//                                                 maxLength={4}
//                                                 className={inputClass}
//                                                 value={dataLancamento}
//                                                 onChange={handleAnoLancamentoChange}
//                                             />
//                                         </div>
//                                         {tipoItem !== "livro" && (
//                                             <div>
//                                                 <div className="flex justify-between items-center mb-1">
//                                                     <label className="text-xs sm:text-sm text-purple-300">Coleção</label>
//                                                     <div className="relative group cursor-pointer">
//                                                         <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                         <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                             Nome da coleção a que este item pertence.
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                                 <input
//                                                     placeholder="Coleção"
//                                                     className={inputClass}
//                                                     value={colecao}
//                                                     onChange={e => setColecao(e.target.value)}
//                                                 />
//                                             </div>
//                                         )}
//                                     </>
//                                 )}

//                                 {tipoItem === "figure" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Valor Estimado (R$)</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe um valor estimado para o item.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Valor Estimado (R$)"
//                                                 className={inputClass}
//                                                 value={`R$ ${valorEstimado}`}
//                                                 onChange={e => {
//                                                     const rawValue = e.target.value;
//                                                     const formattedValue = formatCurrency(rawValue);
//                                                     setValorEstimado(formattedValue);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Data de Lançamento</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe o ano de lançamento no formato AAAA.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="AAAA"
//                                                 className={inputClass}
//                                                 value={dataLancamento}
//                                                 onChange={handleAnoLancamentoChange}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {tipoItem === "jogos" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Valor Estimado (R$)</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-44 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Valor aproximado de mercado do item.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Valor Estimado (R$)"
//                                                 className={inputClass}
//                                                 value={`R$ ${valorEstimado}`}
//                                                 onChange={e => {
//                                                     const rawValue = e.target.value;
//                                                     const formattedValue = formatCurrency(rawValue);
//                                                     setValorEstimado(formattedValue);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Data de Lançamento</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Ano de lançamento do item (formato AAAA).
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="AAAA"
//                                                 className={inputClass}
//                                                 value={dataLancamento}
//                                                 onChange={handleAnoLancamentoChange}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {tipoItem === "album" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Preço de capa</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe o preço de capa do item, sem símbolos.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Preço de capa"
//                                                 className={inputClass}
//                                                 value={`R$ ${precoCapa}`}
//                                                 onChange={e => {
//                                                     const rawValue = e.target.value;
//                                                     const formattedValue = formatCurrency(rawValue);
//                                                     setPrecoCapa(formattedValue);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Data de Lançamento</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe o ano de lançamento do item (formato AAAA).
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="AAAA"
//                                                 className={inputClass}
//                                                 value={dataLancamento}
//                                                 onChange={handleAnoLancamentoChange}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {tipoItem === "artbook" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Preço de capa</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe o preço de capa do item, sem símbolos.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Preço de capa"
//                                                 className={inputClass}
//                                                 value={`R$ ${precoCapa}`}
//                                                 onChange={e => {
//                                                     const rawValue = e.target.value;
//                                                     const formattedValue = formatCurrency(rawValue);
//                                                     setPrecoCapa(formattedValue);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Data de Lançamento (opcional)</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe o ano de lançamento do item, se souber.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="AAAA"
//                                                 className={inputClass}
//                                                 value={dataLancamento}
//                                                 onChange={handleAnoLancamentoChange}
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {tipoItem === "card" && (
//                                     <>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Valor Estimado (R$)</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe o valor estimado do card, se disponível.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="Valor Estimado (R$)"
//                                                 className={inputClass}
//                                                 value={`R$ ${valorEstimadoCard}`}
//                                                 onChange={e => {
//                                                     const rawValue = e.target.value;
//                                                     const formattedValue = formatCurrency(rawValue);
//                                                     setValorEstimadoCard(formattedValue);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div>
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <label className="text-xs sm:text-sm text-purple-300">Data de Lançamento (opcional)</label>
//                                                 <div className="relative group cursor-pointer">
//                                                     <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                     <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                         Informe o ano de lançamento do card.
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <input
//                                                 placeholder="AAAA"
//                                                 className={inputClass}
//                                                 value={dataLancamento}
//                                                 onChange={handleAnoLancamentoChange}
//                                             />
//                                         </div>

//                                     </>
//                                 )}
//                             </motion.div>
//                         )}

//                         {step === 3 && (
//                             <motion.div
//                                 key="step3"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={animationVariants}
//                                 transition={{ duration: 0.4 }}
//                                 className="grid grid-cols-1 gap-4"
//                             >
//                                 <div className="w-full">
//                                     <div className="flex justify-between items-center mb-1">
//                                         <label className="text-xs sm:text-sm text-purple-300 block">Imagem</label>
//                                         <div className="relative group cursor-pointer">
//                                             <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                             <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                 Selecione a imagem do item.
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <div
//                                         className={`${inputClass} relative cursor-pointer p-2 flex justify-center items-center border-2 border-dashed border-purple-400 hover:border-purple-500 transition duration-200`}
//                                         onClick={() => document.getElementById('uploadCapa')?.click()}
//                                     >
//                                         <span className="text-purple-400 text-sm">Clique para selecionar uma imagem</span>
//                                     </div>
//                                     <input
//                                         type="file"
//                                         id="uploadCapa"
//                                         accept="image/*"
//                                         onChange={handleCapaChange}
//                                         className="hidden"
//                                     />
//                                     {previewImagem && (
//                                         <div className="mt-4 flex justify-center">
//                                             <img
//                                                 src={previewImagem}
//                                                 alt="Preview da Capa"
//                                                 className="w-full max-w-[200px] h-auto rounded-lg border border-purple-500 shadow-md mx-auto"
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             </motion.div>
//                         )}
//                         {step === 4 && (
//                             <motion.div
//                                 key="step4"
//                                 initial="initial"
//                                 animate="animate"
//                                 exit="exit"
//                                 variants={animationVariants}
//                                 transition={{ duration: 0.4 }}
//                             >
//                                 {['livro', 'manga', 'hq', 'novel', 'figure', 'album', 'artbook', 'card', 'jogos'].includes(tipoItem) && (
//                                     <div>
//                                         <div className="flex justify-between items-center mb-1">
//                                             <label className="text-xs sm:text-sm text-purple-300">
//                                                 {['livro', 'manga', 'hq', 'novel'].includes(tipoItem) ? 'Sinopse' : 'Descrição do item'}
//                                             </label>
//                                             <div className="relative group cursor-pointer">
//                                                 <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
//                                                 <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                                                     {['livro', 'manga', 'hq', 'novel'].includes(tipoItem)
//                                                         ? 'Escreva uma sinopse detalhada do livro, mangá, HQ ou novel.'
//                                                         : 'Descreva o item com detalhes relevantes.'}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <textarea
//                                             placeholder={['livro', 'manga', 'hq', 'novel'].includes(tipoItem) ? 'Sinopse' : 'Descrição do item'}
//                                             onChange={(e) => setDescricao(e.target.value)}
//                                             className="w-full px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 h-32"
//                                         />
//                                     </div>
//                                 )}
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
//                         {step > 1 ? (
//                             <button
//                                 type="button"
//                                 onClick={prevStep}
//                                 className="bg-gray-500 hover:bg-gray-600 text-white transition px-4 py-2 rounded w-full sm:w-2/5 text-sm sm:text-base font-semibold"
//                             >
//                                 Anterior
//                             </button>
//                         ) : (
//                             <div></div>
//                         )}

//                         <button
//                             type="button"
//                             onClick={nextStep}
//                             disabled={tipoItem === ''}
//                             className={`transition px-4 py-2 rounded w-full sm:w-2/5 text-sm sm:text-base font-semibold ${tipoItem !== ''
//                                 ? 'bg-purple-400 hover:bg-purple-800 text-black hover:text-white'
//                                 : 'bg-gray-500 cursor-not-allowed text-gray-300'
//                                 }`}
//                         >
//                             {step < 4 ? 'Próximo' : 'Cadastrar'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import CadastroLivros from "@/app/principal/components/cadastroLivros";
import '@/app/globals.css'

export default function FormularioItemMultiEtapas() {
    const [tipoItem, setTipoItem] = useState<string>('');
    const [step, setStep] = useState(1);
    const resetTipoItem = () => setTipoItem("");
    const inputClass =
        'w-full h-[42px] px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600';
    const animationVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black p-2 pt-36 md:pt-20">
            <div className="w-full max-w-4xl bg-gray-800 border-2 border-purple-700 rounded-2xl p-4 sm:p-5 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-300">
                    Cadastrar Novo Item
                </h2>
                {["livro", "manga", "hq", "novel"].includes(tipoItem) && (
                    <div className="flex justify-center mb-6 gap-2 mt-5">
                    <span
                        className={`w-4 h-4 rounded-full ${step === 1 ? 'bg-blue-500' : 'bg-slate-500'}`}>
                    </span>
                    <span
                        className={`w-4 h-4 rounded-full ${step === 2 ? 'bg-blue-500' : 'bg-slate-500'}`}>
                    </span>
                    <span
                        className={`w-4 h-4 rounded-full ${step === 3 ? 'bg-blue-500' : 'bg-slate-500'}`}>
                    </span>
                    <span
                        className={`w-4 h-4 rounded-full ${step === 4 ? 'bg-blue-500' : 'bg-slate-500'}`}>
                    </span>
                </div>
                )}
                <AnimatePresence mode="wait">

                    <motion.div
                        key="step1"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animationVariants}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs sm:text-sm text-purple-300">
                                    Tipo do Item
                                </label>
                                <div className="relative group cursor-pointer">
                                    <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                    <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        Selecione o tipo de item que deseja Cadastrar.
                                    </span>
                                </div>
                            </div>

                            <select
                                value={tipoItem}
                                onChange={(e) => {
                                    setTipoItem(e.target.value);

                                }}
                                className={`${inputClass} hide-scrollbar mb-5`}
                            >
                                <option value="">Selecione...</option>
                                <option value="livro">Livro</option>
                                <option value="manga">Mangá</option>
                                <option value="hq">HQ</option>
                                <option value="novel">Novel</option>
                                {/* <option value="figure">Figure</option>
                                <option value="album">Álbum</option>
                                <option value="artbook">Artbook</option>
                                <option value="card">Card / Coleção de Cards</option>
                                <option value="jogos">Jogos</option> */}
                            </select>
                            {["livro", "manga", "hq", "novel"].includes(tipoItem) && (
                                <>
                                    <CadastroLivros tipoItem={tipoItem} resetTipoItem={resetTipoItem} onStepChange={setStep} />
                                </>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}