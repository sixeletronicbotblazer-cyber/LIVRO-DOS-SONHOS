'use client'

/* Popup flutuante de compras recentes (prova social), estilo InfoApp.
   - Primeiro nome + "acabou de comprar" + cidade/UF; discreto, canto
     inferior esquerdo, sem som e nunca dois ao mesmo tempo.
   - Primeira aparição ~8s; visível ~5s; próxima entre 15–22s, com
     pequenas variações para não parecer mecânico.
   - Altera os registros em src/lib/social-proof.ts (pronto para
     receber dados reais de compra depois). */

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { recentPurchases } from '@/lib/social-proof'

type Purchase = { name: string; city: string }
type Phase = 'idle' | 'show' | 'hide'

/* Tempos (ms) com variação aleatória leve. */
const firstDelay = () => 7600 + Math.random() * 800 // ~8s
const visibleFor = () => 4800 + Math.random() * 900 // ~5s
const nextIn = () => 15000 + Math.random() * 7000 // 15–22s
const EXIT_MS = 420

function shuffle(list: Purchase[]): Purchase[] {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function PurchaseToast() {
  const [toast, setToast] = useState<Purchase | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timers = new Set<ReturnType<typeof setTimeout>>()

    /* Espera; se a aba estiver oculta, adia para não "acumular"
       notificações invisíveis. */
    const wait = (ms: number, fn: () => void) => {
      const t = setTimeout(() => {
        timers.delete(t)
        if (cancelled) return
        if (document.hidden) wait(1000, fn)
        else fn()
      }, ms)
      timers.add(t)
    }

    const order = shuffle(recentPurchases)
    let cursor = 0

    const pick = () => {
      if (cursor >= order.length) {
        /* Novo ciclo: embaralha garantindo que o primeiro registro
           não repita imediatamente o último exibido. */
        let reshuffled = shuffle(recentPurchases)
        if (reshuffled[0] === order[order.length - 1]) {
          reshuffled = [...reshuffled.slice(1), reshuffled[0]]
        }
        order.length = 0
        order.push(...reshuffled)
        cursor = 0
      }
      const record = order[cursor]
      cursor += 1
      setToast(record)
      setPhase('idle')
      /* Dois frames para o navegador pintar o estado inicial antes
         da transição de entrada (fade + slide de baixo para cima). */
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('show')))
      wait(visibleFor(), hide)
    }

    const hide = () => {
      setPhase('hide')
      wait(EXIT_MS, () => {
        setToast(null)
        setPhase('idle')
        wait(nextIn(), pick)
      })
    }

    wait(firstDelay(), pick)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])

  /* No mobile, sobe acima da barra CTA fixa quando ela está visível,
     para nunca cobrir um CTA importante. */
  useEffect(() => {
    const cta = document.querySelector('.floating-cta')
    if (!cta) return
    const sync = () => setLifted(cta.classList.contains('is-visible'))
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(cta, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  return (
    <aside
      className={`purchase-toast${lifted ? ' is-lifted' : ''}`}
      data-phase={phase}
      aria-hidden="true"
    >
      {toast && (
        <div className="purchase-toast-card">
          <span className="purchase-toast-check">
            <Check size={12} strokeWidth={3.2} aria-hidden="true" />
          </span>
          <span className="purchase-toast-text">
            <span className="purchase-toast-line">
              <strong>{toast.name}</strong> acabou de comprar
            </span>
            <small>{toast.city}</small>
          </span>
        </div>
      )}
    </aside>
  )
}
