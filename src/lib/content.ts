export const content = {
  name: 'Livro dos Sonhos',
  headline: 'Acordou lembrando do sonho? Veja o bicho e os números antes de jogar.',
  subheadline:
    'Sonhou com um animal, pessoa ou situação? Procure o que apareceu no índice de A a Z e consulte o significado, o bicho e os números associados no verbete. Tudo à mão no celular.',
  bullets: [
    'Abra o livro no celular e ache o que sonhou pelo índice.',
    'Leia a interpretação direto no verbete.',
    'Consulte o bicho e os números associados antes de jogar.',
  ],
  facts: ['120 páginas A4', 'Índice alfabético', 'Tabela dos 25 bichos', 'Livro digital para celular'],
  gallery: [
    ['/assets/indice.webp', 'Índice alfabético', 'Encontre a letra inicial do que apareceu no sonho.'],
    ['/assets/tabela.webp', 'Tabela dos 25 bichos', 'Veja os grupos e as dezenas correspondentes.'],
    ['/assets/verbete-a.webp', 'Verbetes da letra A', 'Interpretações e números no mesmo verbete.'],
    ['/assets/verbete-b.webp', 'Verbetes da letra B', 'Páginas reais do material entregue.'],
    ['/assets/verbete-l.webp', 'Outros verbetes', 'Uma consulta visual e organizada.'],
    ['/assets/verbete-s.webp', 'Verbetes da letra S', 'Percorra o livro de A a Z.'],
  ] as [string, string, string][],
  steps: [
    ['01', 'Lembre do elemento', 'Pense no animal, objeto, pessoa ou situação que ficou na memória.'],
    ['02', 'Ache a palavra', 'Use o índice para ir à letra e procure o verbete na sequência alfabética.'],
    ['03', 'Consulte antes de jogar', 'Leia a interpretação e veja o bicho e os números registrados no verbete.'],
  ] as [string, string, string][],
  included: [
    'Livro digital de 120 páginas em formato A4',
    'Índice alfabético para localizar os verbetes',
    'Tabela dos 25 bichos, grupos e dezenas',
    'Interpretações com números associados',
    'Abra no celular ou imprima e encaderne por conta própria',
  ],
  /* Caixa da oferta — copy de fechamento (estilo InfoApp).
     Os textos seguem apenas o que a página já afirma sobre o produto. */
  offer: {
    eyebrow: 'ACESSO IMEDIATO',
    sub: 'Consulte rapidamente o significado dos seus sonhos sempre que quiser, de forma prática e organizada.',
    receives: [
      'Livro dos Sonhos digital completo',
      '120 páginas A4 para consulta',
      'Interpretações com bichos e números associados',
      'Índice alfabético organizado para encontrar com facilidade',
      'Consulta prática direto pelo celular',
      'Acesso digital após a compra',
    ],
    findLead: 'Sonhos com pessoas, animais, objetos, lugares e situações do dia a dia. Alguns exemplos:',
    findTags: ['Água', 'Dentes', 'Bebê', 'Cobra', 'Casa', 'Dinheiro', 'Morte', 'Casamento', 'Gravidez', 'Viagem', 'Perseguição'],
    findMore: 'E muitos outros significados para consultar.',
    why: [
      'Tudo em um só material, sem ficar pesquisando em vários lugares',
      'Acesso direto do celular, sempre que precisar',
      'Encontra o que procura com mais rapidez',
      'Ideal para conferir assim que acordar curioso com o sonho',
    ],
    // Estrutura pronta: adicione itens aqui para exibir o bloco "Bônus inclusos" na oferta.
    // Ex.: { title: 'Diário dos Sonhos — 30 dias', lead: 'para registrar e acompanhar seus sonhos' }
    bonus: [] as { title: string; lead: string }[],
  },
  faqs: [
    ['O que recebo?', 'O Livro dos Sonhos em arquivo digital PDF de 120 páginas A4, com capa, índice, tabela dos 25 bichos e verbetes alfabéticos.'],
    ['Posso ler no celular?', 'Sim. Depois de receber o arquivo digital, abra o PDF em um leitor no celular. Você pode ampliar as páginas com os dedos para ler os detalhes.'],
    ['O livro é físico?', 'O produto é digital. Se preferir uma cópia em papel, você pode imprimir as páginas A4 e encaderná-las em uma gráfica por conta própria.'],
    ['Como encontro um sonho específico?', 'Comece pelo índice alfabético, vá à letra correspondente e procure o verbete.'],
    ['Os números garantem algum resultado?', 'Não. O livro apresenta as associações registradas nos verbetes. A consulta não prevê resultados nem altera probabilidades.'],
  ] as [string, string][],
}
