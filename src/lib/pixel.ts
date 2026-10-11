/* Meta Pixel — dois pixels ativos no site:
   - principal: 1409608484604873
   - "extase":  900080772936894 (marcado como extase)

   Ambos recebem exatamente os mesmos eventos: PageView + ViewContent
   no carregamento (snippet base no layout) e InitiateCheckout nos CTAs
   de checkout — fbq('track', ...) transmite para todos os pixels
   inicializados no mesmo fbevents.js. */

import { comercial } from '@/lib/comercial'

export const metaPixels = {
  principal: '1409608484604873',
  extase: '900080772936894',
} as const

type Fbq = (command: string, event?: string, data?: Record<string, unknown>) => void

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

/* Dispara um evento padrão do pixel (ex.: 'InitiateCheckout').
   Silenciosamente ignorado se o pixel ainda não carregou — em cliques de
   compra isso não ocorre na prática (o pixel carrega junto da página). */
export function trackPixel(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', event, data)
}

/* Visitante clicou em um CTA que leva ao checkout externo.
   Valor opcional por plano (12,90 básico / 19,90 recuperação / 24,90
   pacote); o tipo numérico evita capturar acidentalmente o evento
   do onClick passado por referência direta. */
export function trackInitiateCheckout(value?: number) {
  const numeric = typeof value === 'number' ? value : comercial.priceValue
  trackPixel('InitiateCheckout', {
    content_name: comercial.product,
    content_type: 'product',
    value: numeric,
    currency: comercial.currency,
  })
}
