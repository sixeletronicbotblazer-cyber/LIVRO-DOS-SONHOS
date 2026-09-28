/* Notificações de compras recentes — prova social flutuante.
   Formato exibido: PRIMEIRO NOME + "acabou de comprar" + CIDADE, UF
   (sem sobrenome, sem preço, sem foto).

   Quando houver dados reais de compra disponíveis (ex.: webhook/API da
   Cakto), basta substituir/subscrever a lista abaixo mantendo o mesmo
   formato { name, city } — o componente consome qualquer quantidade
   de registros. */
export const recentPurchases: { name: string; city: string }[] = [
  { name: 'Mariana', city: 'Recife, PE' },
  { name: 'Lucas', city: 'São Paulo, SP' },
  { name: 'Fernanda', city: 'Brasília, DF' },
  { name: 'Carlos', city: 'Belo Horizonte, MG' },
  { name: 'Juliana', city: 'Curitiba, PR' },
  { name: 'Rafael', city: 'João Pessoa, PB' },
  { name: 'Amanda', city: 'Goiânia, GO' },
  { name: 'Pedro', city: 'Porto Alegre, RS' },
  { name: 'Camila', city: 'Salvador, BA' },
  { name: 'Bruno', city: 'Rio de Janeiro, RJ' },
  { name: 'Letícia', city: 'Fortaleza, CE' },
  { name: 'Thiago', city: 'Campinas, SP' },
  { name: 'Gabriela', city: 'Natal, RN' },
  { name: 'André', city: 'Niterói, RJ' },
  { name: 'Patrícia', city: 'Maceió, AL' },
  { name: 'Felipe', city: 'Cuiabá, MT' },
]
