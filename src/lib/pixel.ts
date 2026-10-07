/* Meta Pixel — ID 1409608484604873.
   O código base (init + PageView + ViewContent) é carregado no layout via
   next/script; este helper dispara eventos de clique a partir dos
   componentes cliente. */

import { comercial } from '@/lib/comercial'

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

/* Visitante clicou em um CTA que leva ao checkout externo. */
export function trackInitiateCheckout() {
  trackPixel('InitiateCheckout', {
    content_name: comercial.product,
    content_type: 'product',
    value: comercial.priceValue,
    currency: comercial.currency,
  })
}
