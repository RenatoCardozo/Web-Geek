'use client'
import Link from "next/link"
import Cookies from "js-cookie"
import { FaBars, FaTimes } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

function Header() {
  const [menuAberto, setMenuAberto] = useState<boolean>(false)
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')

  const router = useRouter()

  useEffect(() => {
    const cookieName = Cookies.get("logado_name")
    const cookieId = Cookies.get("logado_id");
    const cookieEmail = Cookies.get("logado_email");
    const cookieNickName = Cookies.get("logado_nickName");
    if (cookieNickName) setNickName(cookieNickName)
    if (cookieEmail) setEmail(cookieEmail)
  }, [])

  function limpaCookies() {
    Swal.fire({
      title: "Você tem certeza que deseja sair?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#a855f7",
      background: "#1e1b4b",
      iconColor: "#c084fc",
      customClass: {
        popup: "rounded-xl shadow-lg border border-purple-700",
        title: "font-bold text-lg text-purple-100",
        htmlContainer: "text-sm text-purple-300",
        confirmButton: "px-5 py-2 rounded-md font-semibold bg-purple-600 hover:bg-purple-700",
        cancelButton: "px-5 py-2 rounded-md font-semibold bg-purple-400 hover:bg-purple-500",
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          Cookies.remove("logado_token");
          Cookies.remove("logado_name");
          Cookies.remove("logado_id");
          Cookies.remove("logado_email");
          Cookies.remove("logado_nickName");
          router.replace("/");
        }
      })
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-900 to-black shadow-md w-full absolute">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-3">
            <img src="../logo.png" alt="Logo" className="w-10 h-10 rounded-lg" />
            <span className="text-white text-xl font-bold font-mono">Geek Collection</span>
          </div>

          <div className="flex items-center space-x-4 text-white">
            <button
              onClick={() => setMenuAberto(true)}
              className="text-white text-2xl p-2 hover:bg-purple-700 rounded transition"
              title="Abrir menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${menuAberto ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="px-4 py-4 border-b border-purple-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Menu</h2>
            <button
              onClick={() => setMenuAberto(false)}
              className="text-white text-lg hover:text-purple-400 transition"
              aria-label="Fechar menu"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm">
            <span className="text-purple-300 font-semibold">{nickName}</span>
            <span className="text-gray-400">{email}</span>
          </div>
        </div>

        <div className="p-6 space-y-6 text-white">
          <Link
            href="/principal/perfil"
            onClick={() => setMenuAberto(false)}
            className="block hover:text-purple-400 transition"
          >
            Perfil
          </Link>
          <Link
            href="/principal"
            onClick={() => setMenuAberto(false)}
            className="block hover:text-purple-400 transition"
          >
            My Page
          </Link>
          <Link
            href="/principal/cadastrar-item"
            onClick={() => setMenuAberto(false)}
            className="block hover:text-purple-400 transition"
          >
            Cadastrar item
          </Link>
          <button
            onClick={() => {
              setMenuAberto(false)
              limpaCookies()
            }}
            className="block text-left text-red-400 hover:text-red-300 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
