'use client'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import Swal from "sweetalert2"

type Inputs = {
  email: string
  senha: string
}

const URL_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()
  const router = useRouter()

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${URL_BASE}/user/login`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ email: data.email, password: data.senha })
    })

    const dados = await response.json()
    
    if (response.status == 200) {
      Cookies.set("logado_token", dados.token);
      Cookies.set("logado_name", dados.name);
      Cookies.set("logado_id", dados.id);
      Cookies.set("logado_email", dados.email);
      Cookies.set("logado_nickName", dados.nickname);

      router.push("/principal")
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
  }

  useEffect(() => {
    setFocus("email")
  }, [])

  function goBack() {
    window.history.back();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black p-4">
      <div className="w-full max-w-md bg-gray-800 border-2 border-purple-700 rounded-2xl p-6 shadow-2xl text-white">
        <div className="text-center mb-6">
          <img
            src="./logo.png" alt="Mundo do Colecionador"
            className="w-20 h-20 mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold font-mono text-purple-400">
            Geek Collection
          </h1>
          <p className="text-sm text-gray-400">
            Controle sua coleção como um verdadeiro mestre nerd!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(verificaLogin)}>
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-purple-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required {...register("email")}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-purple-300">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required {...register("senha")}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-400 hover:bg-purple-800 text-black hover:text-white transition px-4 py-2 rounded w-full  text-sm sm:text-base font-semibold"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 Geek Collection — Vida longa e próspera 🖖
        </p>
      </div>
    </div>
  );
}
