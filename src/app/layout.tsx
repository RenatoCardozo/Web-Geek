import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from '@/app/context/userContext';

export const metadata: Metadata = {
  title: "Geek Collection",
  description: "Catalogue a sua coleção aqui",
  keywords: ["Mangas", "HQS", "Novels", "Figures", "Cards"],
  icons: {
    icon: '/logo.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}




