"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/landing/section-heading";

const TESTIMONIALS = [
  {
    name: "Mariana Costa",
    meta: "28, São Paulo — SP",
    avatar: "/images/avatar-1.png",
    alt: "Foto de Mariana Costa",
    text: "Depois de entender o que meu sonho recorrente sobre quedas significava, parei de ter medo de tomar decisões na carreira. Em 3 meses pedi demissão e abri meu próprio negócio.",
    result: "Sonho recorrente resolvido em 3 semanas",
  },
  {
    name: "Rafael Oliveira",
    meta: "35, Belo Horizonte — MG",
    avatar: "/images/avatar-2.png",
    alt: "Foto de Rafael Oliveira",
    text: "Os pesadelos que me perseguiram por anos praticamente desapareceram. A técnica do capítulo 4 mudou minhas noites — e minhas manhãs.",
    result: "90% menos pesadelos em 60 dias",
  },
  {
    name: "Dulce Ferreira",
    meta: "52, Curitiba — PR",
    avatar: "/images/avatar-3.png",
    alt: "Foto de Dulce Ferreira",
    text: "Achei que fosse bobagem. Mas o dicionário de símbolos é tão profundo que comecei a entender padrões da minha vida inteira. Recomendo de olhos fechados — literalmente.",
    result: "12 anos de sonhos finalmente decifrados",
  },
];

function Stars() {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label="Avaliação: 5 de 5 estrelas"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative scroll-mt-20 overflow-hidden bg-[#1f1433] py-20 sm:py-24"
    >
      <div
        className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(36,22,64,0.9)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Quem já leu"
          title="Histórias de quem aprendeu a ler os próprios sonhos"
        />

        <div className="mt-6 flex justify-center">
          <Badge className="gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-medium text-amber-200 sm:text-sm">
            <BadgeCheck
              className="size-4 text-amber-300"
              aria-hidden="true"
            />
            4.9 de 5 — 2.347 avaliações verificadas
          </Badge>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20"
            >
              <div className="flex items-center gap-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-amber-400/50 bg-[#241640]">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.alt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-lg font-semibold text-[#f3ecff]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-purple-200/60 sm:text-sm">
                    {testimonial.meta}
                  </p>
                  <Stars />
                </div>
              </div>

              <blockquote className="text-sm leading-relaxed text-purple-100/85 sm:text-base">
                {testimonial.text}
              </blockquote>

              <p className="mt-auto border-t border-white/10 pt-4 text-sm font-bold text-amber-300">
                {testimonial.result}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
