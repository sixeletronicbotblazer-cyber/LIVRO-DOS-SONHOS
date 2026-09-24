import Link from "next/link";
import { Mail, MapPin, Moon, Sparkles } from "lucide-react";

const FOOTER_LINKS = [
  { href: "#livro", label: "O Livro" },
  { href: "#conteudo", label: "Conteúdo" },
  { href: "#autora", label: "Autora" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#oferta", label: "Oferta" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-amber-400/10 bg-[#120b1f]">
      <div className="mx-auto max-w-6xl px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
                <Moon className="size-5 text-amber-300" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-semibold text-[#f3ecff]">
                Livro dos Sonhos
              </span>
            </div>
            <p className="flex items-center gap-2 text-sm text-purple-200/60">
              <Sparkles className="size-3.5 text-amber-400/60" aria-hidden="true" />
              Decifre as mensagens da sua noite.
            </p>
          </div>

          <nav aria-label="Links do rodapé">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80">
              Navegação
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-purple-200/70 transition-colors hover:text-amber-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80">
              Contato
            </p>
            <ul className="flex flex-col gap-2.5">
              <li className="flex min-h-11 items-center gap-2.5 text-sm text-purple-200/70">
                <Mail className="size-4 shrink-0 text-amber-300/80" aria-hidden="true" />
                contato@livrodossonhos.com.br
              </li>
              <li className="flex min-h-11 items-center gap-2.5 text-sm text-purple-200/70">
                <MapPin className="size-4 shrink-0 text-amber-300/80" aria-hidden="true" />
                São Paulo, Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6">
          <p className="text-center text-xs text-purple-200/50">
            © 2025 Livro dos Sonhos — Helena Vasconcelos. Todos os direitos
            reservados.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[0.7rem] leading-relaxed text-purple-200/40">
            Este produto não substitui acompanhamento médico ou psicológico.
            Os resultados podem variar de pessoa para pessoa.
          </p>
          <p className="mt-4 flex items-center justify-center gap-4 text-xs text-purple-200/60">
            <a
              href="#"
              className="inline-flex min-h-11 items-center transition-colors hover:text-amber-300"
            >
              Termos
            </a>
            <span aria-hidden="true" className="text-purple-200/30">
              •
            </span>
            <a
              href="#"
              className="inline-flex min-h-11 items-center transition-colors hover:text-amber-300"
            >
              Privacidade
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
