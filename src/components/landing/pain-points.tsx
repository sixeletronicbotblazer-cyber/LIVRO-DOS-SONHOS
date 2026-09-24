"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/landing/section-heading";
import { Divider } from "@/components/landing/divider";

const PAIN_POINTS = [
  "Acordo sobressaltado(a) com sonhos que parecem reais demais — e fico o dia inteiro pensando no que significam.",
  "Tenho o mesmo sonho recorrente há anos e ninguém nunca conseguiu me explicar o que ele quer dizer.",
  "Pesadelos antigos voltam sem aviso. Será que é só stress — ou existe uma mensagem por trás deles?",
];

export function PainPoints() {
  return (
    <section className="relative overflow-hidden bg-[#160d26] py-20 sm:py-24">
      <div
        className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(36,22,64,0.9)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Você não está sozinho(a)"
          title="Seus sonhos estão tentando te dizer algo"
          subtitle="Cada noite, sua mente escreve mensagens em uma linguagem que ninguém te ensinou a ler. E essas mensagens insistem — até você entendê-las."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PAIN_POINTS.map((pain, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20"
            >
              <span
                className="font-serif text-6xl leading-none text-amber-400/30 transition-colors group-hover:text-amber-400/50"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="-mt-6 font-serif text-lg leading-relaxed text-purple-100/90 italic">
                {pain}
              </blockquote>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          <Divider />
          <p className="font-serif text-2xl leading-snug font-semibold text-amber-300 sm:text-3xl md:text-4xl">
            Não são apenas sonhos. São mensagens — e elas podem mudar a forma
            como você vive.
          </p>
          <Divider />
        </motion.div>
      </div>
    </section>
  );
}
