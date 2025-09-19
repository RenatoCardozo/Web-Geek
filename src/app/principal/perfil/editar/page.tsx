'use client'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { FaArrowLeft, FaEnvelope, FaIdBadge, FaUserAlt, FaInfoCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'

const URL_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function EditarPerfil() {
    const [name, setName] = useState('')
    const [nickName, setNickName] = useState('')
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputNickName, setInputNickName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const router = useRouter()

    useEffect(() => {
        setName(Cookies.get("logado_name") || "")
        setNickName(Cookies.get("logado_nickName") || "")
        setEmail(Cookies.get("logado_email") || "")
        setInputName(Cookies.get("logado_name") || "")
        setInputNickName(Cookies.get("logado_nickName") || "")
        setInputEmail(Cookies.get("logado_email") || "")
        setUserId(Cookies.get("logado_id") || "")
    }, [])

    async function salvarAlteracoes() {
        const nameFinal = inputName.trim() !== '' ? inputName : name;
        const nickFinal = inputNickName.trim() !== '' ? inputNickName : nickName;
        const emailFinal = inputEmail.trim() !== '' ? inputEmail : email;

        try {
            const response = await fetch(`${URL_BASE}/user/edite`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userId,
                    name: nameFinal,
                    nickname: nickFinal,
                    email: emailFinal
                })
            })

            const result = await response.json()
            if (response.ok) {
                Cookies.set('logado_name', nameFinal)
                Cookies.set('logado_nickName', nickFinal)
                Cookies.set('logado_email', emailFinal)
                router.push('/principal/perfil')
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: result.message,
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1b2e',
                    color: '#fff'
                });
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: result.error || 'Erro ao alterar dados do usuário.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1b2e',
                    color: '#fff'
                });
            }
        } catch (err) {
            console.error(err)
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

    const validatePassword = {
        maiuscula: /[A-Z]/.test(newPassword),
        minuscula: /[a-z]/.test(newPassword),
        numero: /[0-9]/.test(newPassword),
        especial: /[^A-Za-z0-9]/.test(newPassword),
        tamanho: newPassword.length >= 8,
        iguais: newPassword === confirmNewPassword && newPassword.length > 0
    };

    const todasValidacoesSenha = Object.values(validatePassword).every(Boolean);

    async function changePassword() {
        try {
            const response = await fetch(`${URL_BASE}/user/changePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    password: password,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword,
                })
            });
            const result = await response.json()
            if (response.ok) {
                router.push('/principal/perfil')
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: result.message,
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1b2e',
                    color: '#fff'
                });
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: result.error || 'Erro ao alterar dados do usuário.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#1f1b2e',
                    color: '#fff'
                });
            }
        } catch (err) {
            console.error(err)
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black p-2 pt-36 md:pt-20">
            <div className="w-full max-w-4xl bg-gray-800 border-2 border-purple-700 rounded-2xl p-4 sm:p-5 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => router.back()}
                        className="text-white hover:text-purple-300 transition text-xl"
                        title="Voltar"
                    >
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold text-purple-400 font-mono ml-1">
                        Editar Perfil
                    </h1>
                    <div className="w-6" />
                </div>

                <div className="md:flex md:space-x-6">
                    {/* Formulário de Edição de Perfil */}
                    <div className="md:w-1/2">
                        <h2 className="text-lg sm:text-xl font-bold text-purple-400 font-mono mb-4 text-center md:text-left">
                            Informações Pessoais
                        </h2>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-6 px-1 sm:px-2">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs sm:text-sm text-purple-300">Nome</label>
                                    <div className="relative group cursor-pointer">
                                        <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            Digite seu nome completo como será exibido.
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={inputName}
                                    onChange={(e) => setInputName(e.target.value)}
                                    onFocus={() => setInputName('')}
                                    className="w-full px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs sm:text-sm text-purple-300">Nickname</label>
                                    <div className="relative group cursor-pointer">
                                        <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            Apelido que será usado no sistema.
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={inputNickName}
                                    onChange={(e) => setInputNickName(e.target.value)}
                                    onFocus={() => setInputNickName('')}
                                    className="w-full px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs sm:text-sm text-purple-300">Email</label>
                                    <div className="relative group cursor-pointer">
                                        <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            Use um e-mail válido para login e recuperação.
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="email"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                    onFocus={() => setInputEmail('')}
                                    className="w-full px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={salvarAlteracoes}
                                className="bg-purple-400 mx-auto hover:bg-purple-800 text-black hover:text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm sm:text-base"
                            >
                                Salvar Alterações
                            </button>
                        </form>
                    </div>

                    {/* Formulário de Troca de Senha */}
                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <h2 className="text-lg sm:text-xl font-bold text-purple-400 font-mono mb-4 text-center md:text-left">
                            Troca de Senha
                        </h2>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-6 px-1 sm:px-2">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs sm:text-sm text-purple-300">Senha antiga</label>
                                    <div className="relative group cursor-pointer">
                                        <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            Digite sua senha atual para autenticação.
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs sm:text-sm text-purple-300">Nova Senha</label>
                                    <div className="relative group cursor-pointer">
                                        <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            Deve conter maiúsculas, minúsculas, números e caracteres especiais.
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs sm:text-sm text-purple-300">Confirme a nova Senha</label>
                                    <div className="relative group cursor-pointer">
                                        <FaInfoCircle className="text-purple-400 text-xs sm:text-sm group-hover:text-purple-200 transition" />
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-40 sm:w-52 bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                            Deve ser idêntica à nova senha digitada acima.
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 text-sm sm:text-base rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>

                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs sm:text-sm mt-4 space-y-1"
                            >
                                {[
                                    { label: "Letra maiúscula", valid: validatePassword.maiuscula },
                                    { label: "Letra minúscula", valid: validatePassword.minuscula },
                                    { label: "Número", valid: validatePassword.numero },
                                    { label: "Caractere especial", valid: validatePassword.especial },
                                    { label: "Mínimo 8 caracteres", valid: validatePassword.tamanho },
                                    { label: "Senhas iguais", valid: validatePassword.iguais },
                                ].map(({ label, valid }) => (
                                    <li
                                        key={label}
                                        className={`flex items-center gap-2 transition-all duration-300 ${valid ? "text-green-400" : "text-red-400"}`}
                                    >
                                        {valid ? "✔️" : "❌"} {label}
                                    </li>
                                ))}
                            </motion.ul>
                            <button
                                type="button"
                                onClick={changePassword}
                                disabled={!todasValidacoesSenha}
                                className={`font-semibold mx-auto px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm sm:text-base ${
                                    todasValidacoesSenha 
                                        ? 'bg-purple-400 hover:bg-purple-800 text-black hover:text-white'
                                        : 'bg-gray-500 cursor-not-allowed text-gray-300'
                                }`}
                            >
                                Trocar senha
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                    Geek Collection — Vida longa e próspera 🖖
                </p>
            </div>
        </div>
    )
}