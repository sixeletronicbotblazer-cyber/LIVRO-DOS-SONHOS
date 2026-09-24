"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "#livro", label: "O Livro" },
  { href: "#conteudo", label: "Conteúdo" },
  { href: "#autora", label: "Autora" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#160d26]/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Navegação principal"
      >
        <Link
          href="#livro"
          className="flex items-center gap-2.5 rounded-md focus-visible:ring-[3px] focus-visible:ring-amber-300/40 focus-visible:outline-none"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
            <Moon className="size-5 text-amber-300" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-wide text-[#f3ecff] sm:text-xl">
            Livro dos Sonhos
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-purple-200/70 transition-colors hover:text-amber-300 focus-visible:ring-[3px] focus-visible:ring-amber-300/40 focus-visible:outline-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="hidden h-10 rounded-full bg-amber-400 px-5 text-sm font-bold text-[#1a1128] shadow-[0_0_30px_-10px_rgba(245,197,66,0.6)] transition-all hover:bg-amber-300 hover:shadow-[0_0_40px_-10px_rgba(245,197,66,0.7)] sm:inline-flex"
          >
            <Link href="#oferta">Quero meu livro</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 text-purple-100 hover:bg-white/5 hover:text-amber-300 lg:hidden"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-l border-white/10 bg-[#1a0f2e] text-[#f3ecff]"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5 font-serif text-lg text-[#f3ecff]">
                  <Moon className="size-5 text-amber-300" aria-hidden="true" />
                  Livro dos Sonhos
                </SheetTitle>
                <SheetDescription className="text-purple-200/60">
                  Decifre as mensagens da sua noite.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Menu móvel">
                <ul className="flex flex-col gap-1 px-4">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 items-center rounded-lg px-4 py-2.5 text-base font-medium text-purple-100/90 transition-colors hover:bg-white/5 hover:text-amber-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto p-4">
                <Button
                  asChild
                  className="h-12 w-full rounded-full bg-amber-400 text-base font-bold text-[#1a1128] shadow-[0_0_30px_-10px_rgba(245,197,66,0.6)] hover:bg-amber-300"
                >
                  <Link href="#oferta" onClick={() => setOpen(false)}>
                    Quero meu livro
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
