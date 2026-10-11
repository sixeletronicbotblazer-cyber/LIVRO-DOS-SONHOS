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
  /* Depoimentos — 5 mensagens reais de clientes (capturas 331×325),
     na ordem dos arquivos enviados, usadas como vieram: sem estrelas,
     números de vendas ou frases inventadas. Pausa de confiança entre
     a apresentação do livro/aplicativo e a caixa da oferta. */
  testimonials: {
    titleLead: 'Quem recebeu o material',
    titleEm: 'conta como foi',
    sub: 'Veja as mensagens de quem já consultou o Livro dos Sonhos.',
    hint: 'Use as setas ou deslize · toque na mensagem para ampliar',
    /* Alt serve apenas para leitores de tela (não é etiqueta visível). */
    images: [
      ['/assets/depoimentos/01_cavalo.png', 'Mensagem de cliente sobre um sonho com cavalo'],
      ['/assets/depoimentos/02_livro_da_familia.png', 'Mensagem de cliente sobre o livro e a família'],
      ['/assets/depoimentos/03_presente_para_o_pai.png', 'Mensagem de cliente sobre o acesso para o pai'],
      ['/assets/depoimentos/04_busca_pelo_sonho.png', 'Mensagem de cliente sobre a busca pelo que sonhou'],
      ['/assets/depoimentos/05_consulta_no_celular.png', 'Mensagem de cliente sobre a consulta no celular'],
    ] as [string, string][],
  },
  /* Risco zero — linha curta abaixo do botão de cada plano. */
  riskZero: 'Risco zero: 7 dias de garantia. Não gostou, devolvemos o valor.',

  /* Downsell: pop-up que abre quando a pessoa clica no plano do livro
     (R$ 12,90). Oferece o pacote completo (Livro + Aplicativo, R$ 24,90)
     por R$ 19,90, ressaltando a economia de R$ 5,00 e os R$ 7,00 a mais
     sobre o livro sozinho. O link pequeno de recusa segue para o
     checkout do plano 1. */
  downsell: {
    eyebrow: 'OFERTA ESPECIAL SÓ NESTA TELA',
    title: 'Espere! Que tal levar o aplicativo junto?',
    lead: 'No livro, você acha o sonho pelo índice. No aplicativo, você digita o que sonhou e o verbete abre na hora, com o bicho e os números prontos para consultar.',
    items: [
      'Digita o que sonhou e o verbete abre na hora',
      'Gerador de combinações por grupo',
      'Catálogo digital de centenas e milhares',
    ],
    packLabel: 'PACOTE LIVRO + APLICATIVO',
    fromLabel: 'de',
    more: 'Só R$ 7,00 a mais que o livro sozinho',
    saving: 'Você economiza R$ 5,00 agora',
    urgency: 'Essa condição só aparece nesta tela. Fechou, o pacote volta aos R$ 24,90 do site.',
    cta: 'SIM, QUERO LEVAR O PACOTE POR',
    skip: 'Não, obrigado. Quero seguir só com o livro por R$ 12,90',
    micro: 'Pagamento único pela Cakto. 7 dias de garantia.',
  },

  /* Caixa da oferta — dois planos: o livro digital por R$ 12,90 e o
     pacote livro + aplicativo por R$ 24,90, cada um com seu botão e
     seu link de checkout. A oferta do aplicativo para quem clica no
     plano do livro acontece no checkout, não na página. */
  plans: {
    eyebrow: 'ESCOLHA SEU PLANO',
    titleLead: 'Dois jeitos de consultar.',
    titleEm: 'Escolha o seu.',
    sub: 'Leve só o livro digital ou o pacote com o aplicativo. O acesso chega no seu e-mail logo após a confirmação do pagamento.',
    trust: 'Pagamento seguro pela Cakto. Acesso liberado após a confirmação. Sem assinatura, sem mensalidade.',
    basic: {
      tag: 'E-BOOK EM PDF',
      title: 'Livro Digital',
      items: [
        'Livro completo em PDF',
        'Índice A a Z e verbetes',
        'Interpretações com números associados',
        'Tabela dos 25 bichos',
        'Opção de imprimir em A4',
      ],
      /* Âncora de preço (algo do cotidiano) abaixo do R$ 12,90. */
      anchor: 'Menos que um lanche. E o livro fica com você para sempre.',
      cta: 'QUERO O LIVRO POR',
    },
    complete: {
      badge: 'MAIS ESCOLHIDO',
      title: 'Livro + Aplicativo',
      firstLine: 'Tudo do plano Livro Digital, mais:',
      items: [
        'Busca por digitação: escreve o que sonhou e o app abre o verbete na hora, sem folhear',
        'Gerador de combinações por grupo',
        'Catálogo digital de centenas e milhares',
        'Mesmo conteúdo do livro, num app feito para o celular',
      ],
      /* Âncora de preço abaixo do R$ 24,90. */
      anchor: 'Só R$ 12,00 a mais e você troca folhear por digitar e achar.',
      cta: 'QUERO O PACOTE POR',
    },
  },
  faqs: [
    ['Como recebo o livro depois da compra?', 'Assim que o pagamento é confirmado pela Cakto, o acesso ao arquivo digital do livro é liberado para você.'],
    ['Posso ler no celular?', 'Sim. O livro é um arquivo PDF: abra em qualquer leitor no celular e amplie a página com os dedos para ler os detalhes.'],
    ['O livro é físico ou digital?', 'É digital (PDF). Se quiser uma cópia em papel, você mesmo pode imprimir as páginas A4 e encaderná-las por conta própria.'],
    ['O que encontro dentro dele?', 'Índice alfabético, verbetes com interpretações, tabela dos 25 bichos com grupos e dezenas, e os números associados a cada tema.'],
    ['Posso imprimir?', 'Sim. As páginas são em formato A4 e podem ser impressas e encadernadas por conta própria, quando e quantas vezes quiser.'],
    ['Como encontro um sonho específico?', 'Comece pelo índice alfabético, vá à letra correspondente e procure o verbete.'],
    ['Qual a diferença entre os dois planos?', 'O plano Livro traz o PDF completo para consultar pelo índice. O plano Livro + Aplicativo traz o PDF e também o aplicativo, com busca por digitação, gerador de combinações por grupo e catálogo de centenas e milhares.'],
    ['Os números garantem algum resultado?', 'Não. O livro apresenta as associações registradas nos verbetes. A consulta não prevê resultados nem altera probabilidades.'],
  ] as [string, string][],
}
