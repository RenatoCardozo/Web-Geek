'use client'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { useUser } from "../context/userContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [logado, setLogado] = useState(false);
  const { setUser, user } = useUser();

  useEffect(() => {
    const verificarToken = async () => {
      const cookieToken = Cookies.get("logado_token");
      const cookieName = Cookies.get("logado_name")
      const cookieId = Cookies.get("logado_id");
      const cookieEmail = Cookies.get("logado_email");
      const cookieNickName = Cookies.get("logado_nickName");

      if (cookieToken) {
        try {
          const response = await fetch("http://localhost:3006/user/token", {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
            },
          });

          const data = await response.json();
          console.log("data.message:", data.dados);

          if (data.mensagem) {
            setLogado(true);
            setUser({
              id: cookieId || '',
              name: cookieName || '',
              email: cookieEmail || '',
              nickname: cookieNickName || '',
              token: cookieToken
            })
          } else {
            router.replace("/");
            Cookies.remove("logado_token");
            Cookies.remove("logado_name");
            Cookies.remove("logado_id");
            Cookies.remove("logado_email");
            Cookies.remove("logado_nickName");
          }
        } catch (error) {
          console.error("Erro na verificação de token:", error);
          router.replace("/");
          Cookies.remove("logado_token");
          Cookies.remove("logado_name");
          Cookies.remove("logado_id");
          Cookies.remove("logado_email");
          Cookies.remove("logado_nickName");
        }
      } else {
        router.replace("/");
        Cookies.remove("logado_token");
        Cookies.remove("logado_name");
        Cookies.remove("logado_id");
        Cookies.remove("logado_email");
        Cookies.remove("logado_nickName");
      }
    };

    verificarToken();
  }, [router]);

  return (
    <>
      {logado && (
        <div>
          <Header />
          {children}
        </div>
      )}
    </>
  );
}
