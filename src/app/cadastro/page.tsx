'use client';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import Cookies from 'js-cookie';
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from '@/app/context/userContext';

interface Inputs {
    nome: string;
    nickName: string;
    email: string;
    senha: string;
    confirmarSenha: string;
}

const URL_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function Cadastro() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const router = useRouter();
    const [etapa, setEtapa] = useState(1);
    const senha = watch("senha") || "";
    const confirmarSenha = watch("confirmarSenha") || "";
    const { setUser } = useUser();

    const validarSenha = {
        maiuscula: /[A-Z]/.test(senha),
        minuscula: /[a-z]/.test(senha),
        numero: /[0-9]/.test(senha),
        especial: /[^A-Za-z0-9]/.test(senha),
        tamanho: senha.length >= 8,
        iguais: senha === confirmarSenha && senha.length > 0
    };

    const todasValidacoesSenha = Object.values(validarSenha).every(Boolean);

    async function enviaDados(data: Inputs) {
        //if (!todasValidacoesSenha) {
        //     Swal.fire({
        //         toast: true,
        //         position: 'top-end',
        //         icon: 'error',
        //         title: 'A senha não atende todos os critérios.',
        //         showConfirmButton: false,
        //         timer: 3000,
        //         background: '#1f1b2e',
        //         color: '#fff'
        //     });
        //     return;
        // }

        try {
            const response = await fetch(`${URL_BASE}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.nome,
                    nickname: data.nickName,
                    email: data.email,
                    password: data.senha,
                    passwordConfirm: data.confirmarSenha
                })
            });

            const dados = await response.json();

            if (response.ok) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1b2e',
                    color: '#fff'
                });
                const responseLogin = await fetch("http://localhost:3006/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.senha,
                    })
                });

                const dadosLogin = await responseLogin.json()
                setUser({
                    id: dadosLogin.id,
                    name: dadosLogin.name,
                    email: dadosLogin.email,
                    nickname: dadosLogin.nickname,
                    token: dadosLogin.token
                })
                Cookies.set("logado_token", dadosLogin.token);
                Cookies.set("logado_name", dadosLogin.name);
                Cookies.set("logado_id", dadosLogin.id);
                Cookies.set("logado_email", dadosLogin.email);
                Cookies.set("logado_nickName", dadosLogin.nickname);
                router.push("/principal");
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: dados.error || 'Erro ao cadastrar usuário.',
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
                title: 'Erro ao conectar com o servidor.',
                showConfirmButton: false,
                timer: 3000,
                background: '#1f1b2e',
                color: '#fff'
            });
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-r from-indigo-900 to-black flex items-center justify-center px-4 sm:px-6 md:px-10 py-8 text-white">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-800 border-2 border-purple-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="text-center mb-4">
                    <img
                        src="./logo.png"
                        alt="Mundo do Colecionador"
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2"
                    />
                    <h1 className="text-xl sm:text-2xl font-bold font-mono text-purple-400">
                        Geek Collection
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-400">
                        Controle sua coleção como um verdadeiro mestre nerd!
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(enviaDados)}
                    className="space-y-6 text-sm sm:text-base"
                >
                    <AnimatePresence mode="wait">
                        {etapa === 1 && (
                            <motion.div
                                key="etapa1"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block mb-1 text-purple-300">Nome</label>
                                    <input
                                        type="text"
                                        {...register("nome")}
                                        className="w-full px-3 py-2 sm:py-2.5 rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-purple-300">NickName</label>
                                    <input
                                        type="text"
                                        {...register("nickName")}
                                        maxLength={11}
                                        className="w-full px-3 py-2 sm:py-2.5 rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-purple-300">Email</label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/i,
                                                message: "Email inválido"
                                            },
                                        })}
                                        className="w-full px-3 py-2 sm:py-2.5 rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setEtapa(2)}
                                        className="bg-purple-400 hover:bg-purple-800 text-black hover:text-white transition px-4 py-2 rounded w-full sm:w-2/5 text-sm sm:text-base font-semibold"
                                    >
                                        Próximo
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {etapa === 2 && (
                            <motion.div
                                key="etapa2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block mb-1 text-purple-300">Senha</label>
                                    <input
                                        type="password"
                                        {...register("senha")}
                                        className="w-full px-3 py-2 sm:py-2.5 rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-purple-300">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        {...register("confirmarSenha")}
                                        className="w-full px-3 py-2 sm:py-2.5 rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                                    />
                                </div>

                                <motion.ul
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xs sm:text-sm mt-4 space-y-1"
                                >
                                    {[
                                        { label: "Letra maiúscula", valid: validarSenha.maiuscula },
                                        { label: "Letra minúscula", valid: validarSenha.minuscula },
                                        { label: "Número", valid: validarSenha.numero },
                                        { label: "Caractere especial", valid: validarSenha.especial },
                                        { label: "Mínimo 8 caracteres", valid: validarSenha.tamanho },
                                        { label: "Senhas iguais", valid: validarSenha.iguais },
                                    ].map(({ label, valid }) => (
                                        <li
                                            key={label}
                                            className={`flex items-center gap-2 transition-all duration-300 ${valid ? "text-green-400" : "text-red-400"}`}
                                        >
                                            {valid ? "✔️" : "❌"} {label}
                                        </li>
                                    ))}
                                </motion.ul>

                                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setEtapa(1)}
                                        className="bg-gray-500 hover:bg-gray-600 transition px-4 py-2 rounded w-full sm:w-2/5 text-sm sm:text-base font-semibold"
                                    >
                                        Voltar
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-purple-400 hover:bg-purple-800 text-black hover:text-white transition px-4 py-2 rounded w-full sm:w-2/5 text-sm sm:text-base font-semibold"
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>

                <p className="text-xs sm:text-sm text-center text-gray-400 mt-6">
                    Já tem uma conta?{' '}
                    <Link href="/login" className="text-purple-300 underline hover:text-purple-200">Faça login</Link>
                </p>
            </div>
        </main>
    );
}