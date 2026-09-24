"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function Guarantee() {
  return (
    <section
      aria-label="Garantia do Livro dos Sonhos"
      className="bg-[#1f1433] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:flex-row sm:gap-10 sm:p-10"
        >
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(245,197,66,0.35)_0%,transparent_70%)] blur-md"
              aria-hidden="true"
            />
            <span className="relative flex size-20 items-center justify-center rounded-full border border-amber-400/40 bg-[#160d26] sm:size-24">
              <ShieldCheck
                className="size-10 text-amber-300 sm:size-12"
                aria-hidden="true"
              />
            </span>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-serif text-2xl font-semibold text-[#f3ecff] sm:text-3xl">
              Garantia incondicional de 7 dias
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-purple-100/80 sm:text-base">
              Leia, aplique, decifre seus sonhos. Se em até 7 dias você sentir
              que o livro não é para você, devolvemos 100% do valor — sem
              perguntas, sem burocracia.{" "}
              <strong className="font-semibold text-amber-200">
                O risco é todo nosso.
              </strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
