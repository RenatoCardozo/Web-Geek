'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { FaUserAlt, FaEnvelope, FaIdBadge, FaArrowLeft, FaRegCopy } from "react-icons/fa"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export default function Perfil() {
  const [name, setName] = useState("")
  const [nickName, setNickName] = useState("")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const router = useRouter()

  useEffect(() => {
    setName(Cookies.get("logado_name") || "")
    setNickName(Cookies.get("logado_nickName") || "")
    setEmail(Cookies.get("logado_email") || "")
    setUserId(Cookies.get("logado_id") || "")
  }, [])

  const copiarId = () => {
    navigator.clipboard.writeText(userId)
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'ID copiado para a área de transferência!',
      showConfirmButton: false,
      timer: 3000,
      background: '#1f1b2e',
      color: '#fff'
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black p-4 pt-20">
      <div className="w-full max-w-md bg-gray-800 border-2 border-purple-700 rounded-2xl p-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push('/principal')}
            className="text-white hover:text-purple-300 transition text-xl"
            title="Voltar"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-purple-400 font-mono ml-1">
            Perfil do Usuário
          </h1>
          <div className="w-6" />
        </div>

        {/* Foto de perfil */}
        <div className="flex justify-center mb-6">
          <img
            src="../../perfil.png"
            alt="Foto de Perfil"
            className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-md"
          />
        </div>

        {/* Dados do usuário */}
        <div className="space-y-5 px-2">
          <div className="flex items-center gap-3">
            <FaUserAlt className="text-purple-400 text-lg" />
            <span className="font-semibold text-base text-gray-300">{name}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaIdBadge className="text-purple-400 text-lg" />
            <span className="font-semibold text-sm sm:text-base text-gray-300">{nickName}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-purple-400 text-lg" />
            <span className="text-gray-300 text-sm sm:text-base">{email}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-purple-400 text-lg">#</span>
            <span className="text-sm sm:text-base text-gray-300">ID: {userId}</span>
            <button
              onClick={copiarId}
              className="ml-1 text-gray-400 hover:text-purple-300 transition text-sm"
              title="Copiar ID"
            >
              <FaRegCopy />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push("/principal/perfil/editar")}
            className="bg-purple-400 hover:bg-purple-800 text-black hover:text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm sm:text-base"
          >
            <FaUserAlt className="text-white" />
            Editar Perfil
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Geek Collection — Vida longa e próspera 🖖
        </p>
      </div>
    </div>
  )
}
