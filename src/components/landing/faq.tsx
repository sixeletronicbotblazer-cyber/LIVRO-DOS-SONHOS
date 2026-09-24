"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/landing/section-heading";

const FAQ_ITEMS = [
  {
    question: "Como recebo o livro após a compra?",
    answer:
      "O acesso é imediato. Assim que o pagamento é confirmado, você recebe um e-mail com o link para baixar o e-book em PDF e acessar os bônus.",
  },
  {
    question: "Funciona no celular?",
    answer:
      "Sim! O PDF é otimizado para leitura em celular, tablet, computador e Kindle.",
  },
  {
    question: "Nunca estudei nada sobre sonhos. Vou conseguir aplicar?",
    answer:
      "O livro foi escrito para iniciantes. Cada conceito é explicado do zero, com exercícios práticos ao fim de cada capítulo.",
  },
  {
    question: "A interpretação dos sonhos tem base científica?",
    answer:
      "O livro combina psicologia junguiana, neurociência do sono e tradições simbólicas, sempre indicando o que vem de cada abordagem.",
  },
  {
    question: "E se eu não gostar do livro?",
    answer:
      "Você tem 7 dias de garantia incondicional. Basta enviar um e-mail e devolvemos 100% do valor.",
  },
  {
    question: "O pagamento é seguro?",
    answer:
      "Sim. O processamento é feito em ambiente criptografado e seus dados nunca ficam armazenados conosco.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-20 overflow-hidden bg-[#160d26] py-20 sm:py-24"
    >
      <div
        className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(36,22,64,0.9)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="Tudo o que você precisa saber"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10"
        >
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur sm:px-8"
          >
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b border-white/10 last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-base font-semibold text-[#f3ecff] hover:text-amber-200 hover:no-underline sm:text-lg [&>svg]:text-amber-300">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-purple-100/75 sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
