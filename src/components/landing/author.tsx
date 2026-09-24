"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/landing/section-heading";

const CREDENTIALS = [
  "+3.400 sonhos analisados em consultório",
  "Pós-graduada em Neurociência do Sono",
  "Palestrante em 12 congressos de psicologia",
  "Colunista convidada de revistas sobre bem-estar",
];

export function Author() {
  return (
    <section
      id="autora"
      className="relative scroll-mt-20 overflow-hidden bg-[#160d26] py-20 sm:py-24"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(36,22,64,0.8)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Sobre a autora" title="Helena Vasconcelos" />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm"
          >
            {/* Moldura dourada dupla */}
            <div
              className="absolute -inset-3 rounded-3xl border border-amber-400/25"
              aria-hidden="true"
            />
            <div
              className="absolute -inset-1.5 rounded-[1.15rem] border border-amber-400/45"
              aria-hidden="true"
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-amber-400/20 bg-[#241640]">
              <Image
                src="/images/author.png"
                alt="Retrato de Helena Vasconcelos, autora do Livro dos Sonhos"
                fill
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover"
              />
            </div>
            <Badge className="absolute -right-3 top-6 rotate-[-3deg] rounded-full border border-amber-300/50 bg-amber-400 px-4 py-2 text-xs font-bold text-[#1a1128] shadow-[0_8px_24px_-8px_rgba(245,197,66,0.6)] sm:-right-6">
              18 anos de pesquisa
            </Badge>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
          >
            <p className="text-base leading-relaxed text-purple-100/80 sm:text-lg">
              Psicóloga clínica (CRP 06/98765) e pesquisadora do sono e dos
              sonhos há 18 anos. Helena acompanhou mais de 3.400 relatos de
              sonhos em consultório e grupos de estudo antes de condensar tudo
              o que aprendeu neste livro.
            </p>

            <ul className="flex flex-col gap-3">
              {CREDENTIALS.map((credential) => (
                <li key={credential} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
                    <Check className="size-4 text-amber-300" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-purple-100/90 sm:text-base">
                    {credential}
                  </span>
                </li>
              ))}
            </ul>

            <blockquote className="relative mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
              <span
                className="absolute -top-5 left-6 font-serif text-6xl leading-none text-amber-400/60"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-serif text-lg leading-relaxed text-[#f3ecff] italic sm:text-xl">
                Todo sonho é uma carta que você escreve para si mesmo(a) — e
                nunca aprendeu a ler.
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
