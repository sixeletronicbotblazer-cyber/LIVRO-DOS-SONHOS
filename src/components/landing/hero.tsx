"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/landing/divider";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="livro"
      className="relative flex flex-col overflow-hidden bg-[#160d26]"
    >
      {/* Fundo místico */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160d26]/80 via-[#160d26]/60 to-[#160d26]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(22,13,38,0.7)_80%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:py-28">
        {/* Coluna esquerda */}
        <div className="flex flex-col items-start gap-6 text-center lg:text-left">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <Badge className="gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-medium text-amber-200 sm:text-sm">
              <Sparkles className="size-3.5 text-amber-300" aria-hidden="true" />
              Mais de 12.000 leitores transformaram suas noites
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl leading-[1.1] font-bold text-[#f3ecff] sm:text-5xl lg:text-6xl"
          >
            Decifre as{" "}
            <em className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text font-serif italic text-transparent">
              mensagens escondidas
            </em>{" "}
            dos seus sonhos
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-base text-purple-200/70 sm:text-lg"
          >
            O guia definitivo de interpretação dos sonhos que revela o que sua
            mente tenta te dizer enquanto você dorme — com mais de 500 símbolos
            explicados.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button
              asChild
              className="h-14 w-full rounded-full bg-amber-400 px-8 text-base font-bold text-[#1a1128] shadow-[0_0_40px_-10px_rgba(245,197,66,0.5)] transition-all hover:bg-amber-300 hover:shadow-[0_0_50px_-10px_rgba(245,197,66,0.6)] sm:w-auto"
            >
              <Link href="#oferta">
                Quero o Livro dos Sonhos
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-14 w-full rounded-full border border-white/15 text-base font-medium text-purple-100 transition-colors hover:border-amber-400/40 hover:bg-white/5 hover:text-amber-200 sm:w-auto sm:px-8"
            >
              <Link href="#conteudo">Ver o que tem dentro</Link>
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-center"
          >
            <div className="flex -space-x-3">
              {[
                { src: "/images/avatar-1.png", alt: "Leitora Mariana" },
                { src: "/images/avatar-2.png", alt: "Leitor Rafael" },
                { src: "/images/avatar-3.png", alt: "Leitora Dulce" },
              ].map((avatar) => (
                <div
                  key={avatar.src}
                  className="relative size-11 overflow-hidden rounded-full border-2 border-amber-400/60 bg-[#241640]"
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <div
                className="flex items-center gap-0.5"
                aria-label="Avaliação média: 4.9 de 5 estrelas"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-purple-200/70">
                <strong className="font-semibold text-[#f3ecff]">4.9/5</strong>{" "}
                — 2.347 avaliações
              </p>
            </div>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs tracking-wide text-purple-200/50 sm:text-sm"
          >
            Compra segura • Acesso imediato • Garantia de 7 dias
          </motion.p>
        </div>

        {/* Coluna direita — capa flutuante */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto w-fit [perspective:1200px]"
        >
          {/* Brilho radial dourado */}
          <div
            className="absolute left-1/2 top-1/2 -z-10 size-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.35)_0%,rgba(245,197,66,0.12)_45%,transparent_70%)] blur-2xl"
            aria-hidden="true"
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="rotate-[2deg] rounded-xl shadow-[0_45px_90px_-25px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
              <Image
                src="/images/book-cover.png"
                alt="Capa do e-book Livro dos Sonhos, com lua dourada sobre céu noturno"
                width={340}
                height={595}
                priority
                sizes="(max-width: 1024px) 280px, 340px"
                className="h-auto w-[260px] rounded-xl border border-amber-400/20 object-cover sm:w-[320px] lg:w-[340px]"
              />
            </div>

            <Badge className="absolute -right-4 top-8 rotate-[-6deg] rounded-full border border-amber-300/50 bg-amber-400 px-4 py-2 text-xs font-bold tracking-wide text-[#1a1128] shadow-[0_8px_24px_-8px_rgba(245,197,66,0.6)] sm:-right-8">
              Best-seller
            </Badge>
          </motion.div>
        </motion.div>
      </div>

      {/* Friso inferior ornamentado */}
      <div className="relative pb-8">
        <Divider />
      </div>
    </section>
  );
}
