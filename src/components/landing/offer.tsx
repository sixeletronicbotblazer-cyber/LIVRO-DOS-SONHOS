"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Countdown } from "@/components/landing/countdown";
import { SectionHeading } from "@/components/landing/section-heading";

const DELIVERABLES = [
  "E-book completo Livro dos Sonhos (214 páginas)",
  "Dicionário com 500+ símbolos",
  "Exercícios práticos ao fim de cada capítulo",
  "Acesso vitalício + atualizações gratuitas",
];

const BONUSES = [
  "Bônus: Diário de Sonhos em PDF",
  "Bônus: Guia Rápido de Símbolos para imprimir",
  "Bônus: Áudio de meditação para lembrar sonhos",
];

const TRUST_ITEMS: { icon: LucideIcon; label: string }[] = [
  { icon: Lock, label: "Pagamento 100% seguro" },
  { icon: CreditCard, label: "Cartão ou Pix" },
  { icon: Zap, label: "Acesso imediato por e-mail" },
];

export function Offer() {
  const handleCheckout = () => {
    toast.info(
      "Ambiente de demonstração — aqui você seria levado(a) ao checkout seguro.",
      { duration: 4000 }
    );
  };

  return (
    <section
      id="oferta"
      className="relative scroll-mt-20 overflow-hidden bg-[#160d26] py-20 sm:py-24"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,197,66,0.09)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Oferta de lançamento"
          title="Comece a decifrar seus sonhos hoje"
        />
        <p className="mt-4 text-center font-serif text-2xl font-semibold text-amber-300 sm:text-3xl">
          50% OFF por tempo limitado
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-amber-400/40 bg-[#1a1029]/90 p-6 shadow-[0_0_80px_-30px_rgba(245,197,66,0.45)] backdrop-blur sm:p-10"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,197,66,0.12)_0%,transparent_55%)]"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Esquerda — o que você recebe */}
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="relative w-28 shrink-0 sm:w-36">
                  <div
                    className="absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.3)_0%,transparent_70%)] blur-xl"
                    aria-hidden="true"
                  />
                  <Image
                    src="/images/book-cover.png"
                    alt="Capa do e-book Livro dos Sonhos"
                    width={144}
                    height={252}
                    sizes="(max-width: 640px) 112px, 144px"
                    className="h-auto w-full rounded-lg border border-amber-400/25 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div className="flex flex-col gap-1.5 pt-2">
                  <h3 className="font-serif text-2xl font-semibold text-[#f3ecff]">
                    O que você recebe
                  </h3>
                  <p className="text-sm text-purple-200/60">
                    Tudo enviado na hora, direto no seu e-mail.
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-3.5">
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/15">
                      <Check className="size-4 text-amber-300" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-purple-100/90 sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
                {BONUSES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/15">
                      <Check className="size-4 text-amber-300" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-amber-100/95 sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direita — preço, countdown, escassez */}
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-[#160d26]/70 p-6 sm:p-8">
              <div className="flex w-full flex-col items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-200/60">
                  A oferta expira em:
                </p>
                <Countdown />
              </div>

              <div className="flex w-full flex-col items-center gap-1 border-t border-white/10 pt-6">
                <p className="text-base text-purple-200/60">
                  de{" "}
                  <span className="text-lg line-through decoration-red-400/70 decoration-2">
                    R$ 97
                  </span>{" "}
                  por apenas
                </p>
                <p className="font-serif text-5xl font-bold text-amber-300 sm:text-6xl">
                  12x{" "}
                  <span className="text-amber-300">R$ 4,90</span>
                </p>
                <p className="text-sm font-medium text-purple-100/80">
                  ou{" "}
                  <span className="font-bold text-amber-200">R$ 47</span> à
                  vista
                </p>
              </div>

              <div className="flex w-full flex-col gap-2.5">
                <p className="text-sm text-purple-200/70">
                  Restam{" "}
                  <strong className="font-bold text-amber-300">
                    37 exemplares
                  </strong>{" "}
                  nesta condição
                </p>
                <Progress
                  value={93}
                  aria-label="93% das vagas da oferta de lançamento já foram reservadas"
                  className="h-2.5 bg-white/10 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-amber-500 [&_[data-slot=progress-indicator]]:to-amber-300"
                />
              </div>

              <Button
                onClick={handleCheckout}
                className="h-16 w-full rounded-full bg-amber-400 px-8 text-base font-bold tracking-wide text-[#1a1128] shadow-[0_0_40px_-10px_rgba(245,197,66,0.5)] transition-all hover:bg-amber-300 hover:shadow-[0_0_60px_-12px_rgba(245,197,66,0.65)] sm:h-[4.25rem] sm:text-lg"
              >
                GARANTIR MEU ACESSO IMEDIATO
                <ArrowRight className="size-5" aria-hidden="true" />
              </Button>

              <ul className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3">
                {TRUST_ITEMS.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-center gap-2 text-xs text-purple-200/70"
                  >
                    <item.icon
                      className="size-4 shrink-0 text-amber-300"
                      aria-hidden="true"
                    />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
