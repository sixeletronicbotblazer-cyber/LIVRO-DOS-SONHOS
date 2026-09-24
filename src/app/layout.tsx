import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Livro dos Sonhos | Decifre as Mensagens dos Seus Sonhos",
  description:
    "O guia definitivo de interpretação dos sonhos com mais de 500 símbolos explicados. Aprenda a ler o que sua mente tenta te dizer enquanto você dorme — com técnica, psicologia e 18 anos de pesquisa. Oferta de lançamento: 50% OFF por tempo limitado.",
  keywords: [
    "livro dos sonhos",
    "interpretação de sonhos",
    "significado dos sonhos",
    "dicionário de sonhos",
    "sonhos recorrentes",
    "pesadelos",
  ],
  authors: [{ name: "Helena Vasconcelos" }],
  icons: {
    icon: "/images/favicon-icon.png",
  },
  openGraph: {
    title: "Livro dos Sonhos | Decifre as Mensagens dos Seus Sonhos",
    description:
      "Mais de 500 símbolos explicados. O guia definitivo para decifrar o que seus sonhos tentam te dizer.",
    siteName: "Livro dos Sonhos",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#160d26] text-[#f3ecff]`}
      >
        {children}
        <Toaster
          theme="dark"
          position="top-center"
          closeButton
          toastOptions={{
            style: {
              background: "#1f1433",
              border: "1px solid rgba(245, 197, 66, 0.25)",
              color: "#f3ecff",
            },
          }}
        />
      </body>
    </html>
  );
}
