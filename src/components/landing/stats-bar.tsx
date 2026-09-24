"use client";

import { motion } from "framer-motion";
import { BookOpen, ShieldCheck, Star, Users } from "lucide-react";

const STATS = [
  {
    icon: Users,
    value: "12 mil+",
    label: "leitores",
  },
  {
    icon: BookOpen,
    value: "500+",
    label: "símbolos interpretados",
  },
  {
    icon: Star,
    value: "4.9",
    label: "avaliação média",
    starSuffix: true,
  },
  {
    icon: ShieldCheck,
    value: "7 dias",
    label: "de garantia",
  },
] as const;

export function StatsBar() {
  return (
    <section
      aria-label="Números do Livro dos Sonhos"
      className="border-y border-white/5 bg-[#1f1433]/60"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:gap-4">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
              <stat.icon className="size-5 text-amber-300" aria-hidden="true" />
            </span>
            <p className="font-serif text-2xl font-bold text-[#f3ecff] sm:text-3xl">
              {stat.value}
              {"starSuffix" in stat && stat.starSuffix ? (
                <Star
                  className="mb-1 ml-1 inline size-4 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              ) : null}
            </p>
            <p className="text-sm text-purple-200/60">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
