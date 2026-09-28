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
  facts: ['Livro digital em A4', 'Índice alfabético', 'Tabela dos 25 bichos', 'Consulta pelo celular'],
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
    'Livro digital em formato A4',
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
    // Entregáveis verificados no material real (sem contagem de páginas — confirmar no PDF final antes de exibir).
    included: [
      'Livro digital',
      'Índice alfabético',
      'Tabela dos 25 bichos',
      'Interpretações e números associados',
      'Leitura no celular',
      'Opção de imprimir em A4',
    ],
    // Mecanismo resumido exibido sob o preço.
    mechanism:
      'Lembrou do sonho? Procure no índice, abra o verbete e veja o significado, o bicho e os números associados.',
    // Estrutura pronta: adicione itens aqui para exibir o bloco "Bônus inclusos" na oferta.
    // Ex.: { title: 'Diário dos Sonhos — 30 dias', lead: 'para registrar e acompanhar seus sonhos' }
    bonus: [] as { title: string; lead: string }[],
  },
  faqs: [
    ['Como recebo o livro depois da compra?', 'Assim que o pagamento é confirmado pela Cakto, o acesso ao arquivo digital do livro é liberado para você.'],
    ['Posso ler no celular?', 'Sim. O livro é um arquivo PDF: abra em qualquer leitor no celular e amplie a página com os dedos para ler os detalhes.'],
    ['O livro é físico ou digital?', 'É digital (PDF). Se quiser uma cópia em papel, você mesmo pode imprimir as páginas A4 e encaderná-las por conta própria.'],
    ['O que encontro dentro dele?', 'Índice alfabético, verbetes com interpretações, tabela dos 25 bichos com grupos e dezenas, e os números associados a cada tema.'],
    ['Posso imprimir?', 'Sim. As páginas são em formato A4 e podem ser impressas e encadernadas por conta própria, quando e quantas vezes quiser.'],
    ['Como encontro um sonho específico?', 'Comece pelo índice alfabético, vá à letra correspondente e procure o verbete.'],
    ['Os números garantem algum resultado?', 'Não. O livro apresenta as associações registradas nos verbetes. A consulta não prevê resultados nem altera probabilidades.'],
  ] as [string, string][],
}
