'use client'

/* Botão flutuante discreto de ajuda por WhatsApp — alternativa para quem
   teve dificuldade no pagamento; NÃO substitui o checkout (o CTA principal
   segue levando direto à Cakto).
   - Aparece ~5s após o carregamento, com uma única entrada suave
     (fade + slide), sem piscar e sem abrir conversa automaticamente.
   - Cápsula verde #25D366 com ícone + "Precisa de ajuda para comprar?";
     o X fecha apenas o texto e deixa só o ícone clicável.
   - Toque abre o WhatsApp em nova aba com mensagem pré-preenchida.
   - Número vem de comercial.whatsappNumber (config única; se vazio, o
     botão não é renderizado — nunca um link quebrado).
   - No mobile, sobe acima da barra CTA fixa e do popup de compras
     recentes para nunca cobrir elemento importante do funil. */

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { comercial } from '@/lib/comercial'

const WHATSAPP_MESSAGE =
  'Olá! Estou tentando comprar o Livro dos Sonhos e preciso de ajuda para concluir o pagamento.'

/* Ícone oficial do WhatsApp (glifo da marca), inline para não depender
   de biblioteca externa de ícones de marca. */
function WhatsAppIcon({ size = 23 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function WhatsappHelp() {
  const [visible, setVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [liftedCta, setLiftedCta] = useState(false)
  const [liftedToast, setLiftedToast] = useState(false)

  const digits = comercial.whatsappNumber.replace(/\D/g, '')
  const href = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : ''

  /* Entrada única após ~5s; adiada enquanto a aba estiver oculta. */
  useEffect(() => {
    let cancelled = false
    const timers = new Set<ReturnType<typeof setTimeout>>()
    const schedule = (ms: number) => {
      const t = setTimeout(() => {
        timers.delete(t)
        if (cancelled) return
        if (document.hidden) schedule(800)
        else setVisible(true)
      }, ms)
      timers.add(t)
    }
    schedule(5000)
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])

  /* Sobe acima da barra CTA fixa (mobile) enquanto ela estiver visível. */
  useEffect(() => {
    const cta = document.querySelector('.floating-cta')
    if (!cta) return
    const sync = () => setLiftedCta(cta.classList.contains('is-visible'))
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(cta, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  /* Sobre o popup de compras recentes enquanto ele aparece (mobile),
     para os dois nunca se sobreporem. */
  useEffect(() => {
    const toast = document.querySelector('.purchase-toast')
    if (!toast) return
    const sync = () => setLiftedToast(toast.getAttribute('data-phase') === 'show')
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(toast, { attributes: true, attributeFilter: ['data-phase'] })
    return () => mo.disconnect()
  }, [])

  /* Sem número configurado, nada é renderizado — nunca link quebrado. */
  if (!digits) return null

  return (
    <aside
      className={
        'whatsapp-help' +
        (visible ? ' is-visible' : '') +
        (liftedCta ? ' is-lifted-cta' : '') +
        (liftedToast ? ' is-lifted-toast' : '') +
        (collapsed ? ' is-collapsed' : '')
      }
      aria-hidden={!visible}
    >
      <a
        className="whatsapp-pill"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-label="Pedir ajuda pelo WhatsApp para concluir a compra"
      >
        <WhatsAppIcon />
        <span className="whatsapp-text">Precisa de ajuda para comprar?</span>
      </a>
      <button
        type="button"
        className="whatsapp-close"
        onClick={() => setCollapsed(true)}
        aria-label="Fechar mensagem de ajuda"
        tabIndex={visible ? 0 : -1}
      >
        <X size={13} strokeWidth={3} aria-hidden="true" />
      </button>
    </aside>
  )
}
