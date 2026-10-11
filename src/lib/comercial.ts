export const comercial = {
  /* Plano 1 — Livro digital R$ 12,90 (checkout Cakto ativo).
     Todos os CTAs de "livro" apontam para este link. */
  price: 'R$ 12,90',
  priceValue: 12.9, // apenas para eventos de rastreamento (Meta Pixel)
  currency: 'BRL',
  product: 'Livro dos Sonhos',
  checkoutUrl: 'https://pay.cakto.com.br/s859tjs_1137379',
  /* Plano 2 — Livro + Aplicativo R$ 24,90 (checkout Cakto ativo).
     Todos os CTAs de "pacote/aplicativo" apontam para este link. */
  checkoutUrlApp: 'https://pay.cakto.com.br/abm46ub',
  packPrice: 'R$ 24,90',
  packPriceValue: 24.9,
  /* Downsell — pop-up do plano do livro: pacote completo por R$ 19,90.
     Link oficial da Cakto: "Oferta Bonus" (ativo), cobrando R$ 19,90. */
  downsellPrice: 'R$ 19,90',
  downsellPriceValue: 19.9,
  checkoutUrlDownsell: 'https://pay.cakto.com.br/h5rkmfh',
  /* Atendimento por WhatsApp — ajuda para concluir o pagamento.
     Apenas código do país + DDD + número, só dígitos (ex.: 55 61...).
     Vazio = o botão de ajuda não é exibido. */
  whatsappNumber: '5561996292397',
  access: '',
  guarantee: '',
  supportEmail: '',
  company: '',
}
