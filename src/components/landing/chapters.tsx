"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Anchor,
  BookOpen,
  CloudMoon,
  Compass,
  Eye,
  Moon,
  Rabbit,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/landing/section-heading";

interface Chapter {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const FIRST_CHAPTERS: Chapter[] = [
  {
    number: "01",
    icon: Moon,
    title: "A linguagem secreta dos sonhos",
    description:
      "Como sua mente constrói mensagens enquanto você dorme.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Dicionário com 500+ símbolos",
    description:
      "Voar, perder dentes, água, queda, animais: tudo explicado.",
  },
  {
    number: "03",
    icon: CloudMoon,
    title: "Pesadelos desmontados",
    description:
      "Por que acontecem e o exercício de 5 minutos para transformá-los.",
  },
  {
    number: "04",
    icon: Repeat,
    title: "Sonhos recorrentes",
    description:
      "O padrão escondido e o que eles insistem em dizer sobre sua vida.",
  },
];

const LAST_CHAPTERS: Chapter[] = [
  {
    number: "05",
    icon: Anchor,
    title: "A técnica do âncora",
    description:
      "O método comprovado para lembrar 90% dos seus sonhos ao acordar.",
  },
  {
    number: "06",
    icon: Rabbit,
    title: "Sonhos com animais",
    description:
      "Da serpente ao lobo: o instinto falando com você.",
  },
  {
    number: "07",
    icon: Eye,
    title: "Sonhos premonitórios",
    description:
      "Intuição ou coincidência? O que a ciência revela.",
  },
  {
    number: "08",
    icon: Compass,
    title: "Do sonho à ação",
    description:
      "Como transformar mensagens em decisões reais na sua vida.",
  },
];

function ChapterCard({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-serif text-4xl leading-none font-bold text-amber-300/80">
          {chapter.number}
        </span>
        <span className="flex size-10 items-center justify-center rounded-full border border-amber-400/25 bg-amber-400/10 transition-colors group-hover:bg-amber-400/20">
          <chapter.icon className="size-5 text-amber-300" aria-hidden="true" />
        </span>
      </div>
      <h3 className="font-serif text-xl font-semibold text-[#f3ecff]">
        {chapter.title}
      </h3>
      <p className="text-sm leading-relaxed text-purple-200/70">
        {chapter.description}
      </p>
    </motion.article>
  );
}

export function Chapters() {
  return (
    <section
      id="conteudo"
      className="relative scroll-mt-20 overflow-hidden bg-[#1f1433] py-20 sm:py-24"
    >
      <div
        className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(245,197,66,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Dentro do livro"
          title="Um mapa completo para atravessar o mundo dos sonhos"
          subtitle="8 capítulos que levam você da curiosidade ao domínio — do primeiro sonho lembrado à interpretação profunda."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative min-h-64 overflow-hidden rounded-2xl border border-amber-400/20 lg:col-span-2"
          >
            <div
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(245,197,66,0.18)_0%,transparent_65%)]"
              aria-hidden="true"
            />
            <Image
              src="/images/open-book.png"
              alt="Livro aberto com páginas iluminadas por um brilho dourado místico"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#160d26]/90 to-transparent p-4 text-sm text-purple-100/80">
              214 páginas que transformam noites confusas em mensagens claras.
            </figcaption>
          </motion.figure>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            {FIRST_CHAPTERS.map((chapter, index) => (
              <ChapterCard key={chapter.number} chapter={chapter} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LAST_CHAPTERS.map((chapter, index) => (
            <ChapterCard
              key={chapter.number}
              chapter={chapter}
              index={index + 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
