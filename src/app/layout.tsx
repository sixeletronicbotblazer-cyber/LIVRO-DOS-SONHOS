import type { Metadata, Viewport } from 'next'
import './fonts.css'
import './styles.css'

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='13' fill='%23111111'/%3E%3Cpath d='M16 15h14c5 0 8 2 10 5 2-3 5-5 10-5v33c-5 0-8 1-10 4-2-3-5-4-10-4H16z' fill='none' stroke='%23F6C945' stroke-width='4' stroke-linejoin='round'/%3E%3Cpath d='M40 20v32' stroke='%23F6C945' stroke-width='4'/%3E%3C/svg%3E"

export const metadata: Metadata = {
  title: 'Livro dos Sonhos | Significados, bichos e números',
  description:
    'Sonhou? Consulte significados, bichos e números associados no Livro dos Sonhos. Veja páginas reais do livro antes de decidir.',
  icons: {
    icon: FAVICON,
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
