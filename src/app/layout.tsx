import type { Metadata } from "next";
import "./globals.css";
import { Figtree } from 'next/font/google'
import Header from './luksguin/components/header'
import Footer from './luksguin/components/footer'

const fonte = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Normal, Médio e Negrito
})

export const metadata: Metadata = {
  title: "Spotify",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br">
      <body className={fonte.className}>
        <Header></Header>

        {children}

        <Footer></Footer>
      </body>
    </html>
  );
}
