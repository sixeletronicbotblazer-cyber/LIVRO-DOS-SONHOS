'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Plus, Search, Star, X } from 'lucide-react'
import { content } from '@/lib/content'
import { comercial } from '@/lib/comercial'
import { trackInitiateCheckout } from '@/lib/pixel'
import { PurchaseToast } from '@/components/purchase-toast'
import { WhatsappHelp } from '@/components/whatsapp-help'

type SelectedPage = { src: string; title: string } | null

/* Preço com o cifrão colado no número: o R$ entra menor, num espaço
   fixo e curto, sempre junto do valor. Assim o preço não “flutua”
   longe do rótulo nem é espalhado pelo espaçamento dos botões. */
function Price({ value }: { value: string }) {
  const [currency, amount] = value.split(' ')
  return (
    <span className="price-val">
      <small>{currency}</small>
      {amount}
    </span>
  )
}

function Button({
  children,
  href = '#oferta',
  tone = 'gold',
  external = false,
}: {
  children: React.ReactNode
  href?: string
  tone?: 'gold' | 'dark'
  external?: boolean
}) {
  /* CTA externo: leva direto ao checkout configurado. Sem URL válida,
     o botão fica inativo (não simula compra). */
  if (external) {
    if (!comercial.checkoutUrl)
      return (
        <button className={`button button--${tone}`} type="button" disabled>
          {children}
        </button>
      )
    return (
      <a
        className={`button button--${tone}`}
        href={comercial.checkoutUrl}
        rel="noopener noreferrer"
        onClick={trackInitiateCheckout}
      >
        {children}
        <ArrowRight size={20} aria-hidden="true" />
      </a>
    )
  }
  return (
    <a className={`button button--${tone}`} href={href}>
      {children}
      <ArrowRight size={20} aria-hidden="true" />
    </a>
  )
}

function useEscapeKey(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [active, onClose])
}

/* Carrossel horizontal infinito (marquee) com arraste manual e autoplay.
   Movimento contínuo via transform/translate3d em requestAnimationFrame:
   - loop real (posição sempre módulo da largura de um conjunto de cards);
   - pausa durante drag, com modal aberto, fora da viewport e no hover (desktop);
   - retoma automática ~1,4s após o fim da interação;
   - volta completa em 18–25s, independentemente da largura. */
function MarqueeRail() {
  const track = useRef<HTMLDivElement>(null)
  const state = useRef({
    pos: 0,
    dragging: false,
    resumeAt: 0,
    lastDx: 0,
    startX: 0,
    startPos: 0,
    modalOpen: false,
    inView: true,
    mouseSeen: false,
  })
  const [selected, setSelected] = useState<SelectedPage>(null)

  useEffect(() => {
    state.current.modalOpen = !!selected
  }, [selected])

  useEscapeKey(!!selected, () => setSelected(null))

  useEffect(() => {
    const el = track.current
    if (!el) return
    const s = state.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canHover = window.matchMedia('(hover: hover)').matches
    let raf = 0
    let last = performance.now()
    let half = 1
    let lastWritten = -1

    const measure = () => {
      half = Math.max(1, el.scrollWidth / 2)
    }
    measure()
    window.addEventListener('resize', measure)

    const io = new IntersectionObserver(
      ([entry]) => {
        s.inView = entry.isIntersecting
      },
      { rootMargin: '120px 0px 120px 0px' }
    )
    io.observe(el)

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000
      last = now
      const paused = s.dragging || s.modalOpen || !s.inView || now < s.resumeAt
      const hovering = !reduced && (canHover || s.mouseSeen) && el.matches(':hover')
      if (!reduced && !paused && !hovering) {
        const duration = Math.min(25, Math.max(18, half / 80))
        s.pos = (s.pos + (half / duration) * dt) % half
      }
      if (s.pos !== lastWritten) {
        el.style.transform = `translate3d(${-s.pos}px,0,0)`
        lastWritten = s.pos
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  function onPointerEnter(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse') state.current.mouseSeen = true
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const s = state.current
    s.dragging = true
    s.startX = event.clientX
    s.startPos = s.pos
    s.lastDx = 0
    const onMove = (moveEvent: PointerEvent) => {
      const st = state.current
      if (!st.dragging) return
      const dx = moveEvent.clientX - st.startX
      st.lastDx = Math.abs(dx)
      const h = Math.max(1, (track.current?.scrollWidth ?? 2) / 2)
      st.pos = (((st.startPos - dx) % h) + h) % h
    }
    const onFinish = () => {
      const st = state.current
      if (!st.dragging) return
      st.dragging = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onFinish)
      window.removeEventListener('pointercancel', onFinish)
      st.resumeAt = performance.now() + 1400
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onFinish)
    window.addEventListener('pointercancel', onFinish)
  }

  function onDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
  }

  function openCard(src: string, title: string) {
    if (state.current.lastDx > 8) return
    setSelected({ src, title })
  }

  const cards = [...content.gallery, ...content.gallery]

  return (
    <>
      <div className="marquee" role="region" aria-label="Páginas reais do Livro dos Sonhos">
        <div
          className="marquee-track"
          ref={track}
          onPointerEnter={onPointerEnter}
          onPointerDown={onPointerDown}
          onDragStart={onDragStart}
        >
          {cards.map(([src, title, lead], index) => (
            <button
              className="preview-card"
              key={`${src}-${index}`}
              type="button"
              onClick={() => openCard(src, title)}
              aria-label={`Ampliar ${title}`}
            >
              <span className="preview-image">
                <img src={src} alt={`Página real: ${title}`} draggable={false} />
              </span>
              <span className="preview-meta">
                <strong>{title}</strong>
                <small>{lead}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
      {selected && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`Página ampliada: ${selected.title}`} onClick={() => setSelected(null)}>
          <button className="modal-close" onClick={() => setSelected(null)} aria-label="Fechar página ampliada" type="button">
            <X />
          </button>
          <img
            src={selected.src.replace('/assets/', '/assets/originais/')}
            alt={`Página ampliada: ${selected.title}`}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

/* Depoimentos — carrossel horizontal automático e infinito.
   Passagem de um cartão a outro: 1,3s com movimento suave; ~5s de
   leitura parado em cada cartão; loop sem fim e sem salto visível.
   Para o loop ser contínuo nas duas direções, os 5 depoimentos são
   repetidos 3× internamente (cópias marcadas aria-hidden) e a posição
   é renormalizada em silêncio após cada parada, sempre dentro do
   trecho central do trilho — o conteúdo se repete a cada 5 cartões,
   então a renormalização não muda nada na tela.
   Interação: arraste por dedo ou mouse, setas e pontos. Após qualquer
   interação manual, o avanço automático retoma ~7s depois. Pausas:
   fora da viewport, com a aba oculta e no hover (desktop).
   prefers-reduced-motion: sem avanço automático e deslocamentos
   instantâneos; a navegação manual continua funcionando. */
function TestimonialsCarousel() {
  const railRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const s = useRef({
    pos: 5, // posição no trilho (flutuante durante o arraste); domínio [5,10)
    step: 0, // largura do cartão + espaçamento
    center: 0, // deslocamento para centralizar o cartão em foco
    holdTimer: 0,
    patrol: 0,
    moveId: 0,
    armed: false, // pointerdown ativo (ainda sem intenção de arrastar)
    dragging: false,
    animating: false,
    inView: true,
    hover: false,
    resumeAt: 0,
    reduced: false,
    canHover: false,
    startX: 0,
    startY: 0,
    startPos: 5,
  })

  const HOLD_MS = 5000 // tempo de leitura em cada cartão
  const STEP_MS = 1300 // duração da passagem de um cartão a outro
  const RESUME_MS = 7000 // retomada do automático após interação manual
  const images = content.testimonials.images
  const n = images.length

  const apply = () => {
    const track = trackRef.current
    if (!track) return
    track.style.transform = `translate3d(${s.current.center - s.current.pos * s.current.step}px,0,0)`
    const idx = ((Math.round(s.current.pos) % n) + n) % n
    setActive((prev) => (prev === idx ? prev : idx))
  }

  /* Posição visual real do trilho (mesmo no meio de uma animação). */
  const computedPos = () => {
    const track = trackRef.current
    if (!track) return s.current.pos
    const raw = getComputedStyle(track).transform
    const x = raw === 'none' ? 0 : new DOMMatrixReadOnly(raw).m41
    return (s.current.center - x) / (s.current.step || 1)
  }

  /* Congela o movimento onde ele estiver (toque no meio da animação). */
  const freeze = () => {
    const track = trackRef.current
    if (!track) return
    s.current.pos = computedPos()
    s.current.animating = false
    track.style.transitionDuration = '0s'
    apply()
    track.getBoundingClientRect()
  }

  /* Devolve a posição ao trecho central do trilho sem mudança visual. */
  const normalize = () => {
    const track = trackRef.current
    let p = s.current.pos
    while (p >= n * 2) p -= n
    while (p < n) p += n
    if (p !== s.current.pos) {
      s.current.pos = p
      if (track) track.style.transitionDuration = '0s'
      apply()
      if (track) track.getBoundingClientRect()
    }
  }

  const advance = () => {
    const c = s.current
    if (c.reduced || c.armed || c.dragging || c.animating || !c.inView || document.hidden) {
      schedule()
      return
    }
    go(Math.round(c.pos) + 1, STEP_MS)
  }

  const schedule = () => {
    const c = s.current
    clearTimeout(c.holdTimer)
    c.holdTimer = 0
    if (c.reduced || !c.inView || document.hidden || c.hover || c.dragging || c.armed || c.animating) return
    if (performance.now() < c.resumeAt) return
    c.holdTimer = window.setTimeout(advance, HOLD_MS)
  }

  const finish = (id: number) => {
    const c = s.current
    if (c.moveId !== id || !c.animating) return
    c.animating = false
    normalize()
    schedule()
  }

  const go = (target: number, duration: number) => {
    const track = trackRef.current
    const c = s.current
    if (!track) return
    const prev = c.pos
    c.pos = target
    c.moveId += 1
    const id = c.moveId
    const moves = duration > 0 && !c.reduced && Math.abs(target - prev) > 0.001
    if (!moves) {
      track.style.transitionDuration = '0s'
      apply()
      track.getBoundingClientRect()
      c.animating = false
      normalize()
      schedule()
      return
    }
    c.animating = true
    track.style.transitionDuration = `${duration}ms`
    apply()
    /* Rede de segurança caso o transitionend não dispare. */
    window.setTimeout(() => finish(id), duration + 160)
  }

  /* Navegação manual (setas): um cartão por vez, mesma duração suave. */
  const manual = (dir: 1 | -1) => {
    const c = s.current
    if (c.armed || c.dragging) return
    if (c.animating) freeze()
    c.resumeAt = performance.now() + RESUME_MS
    clearTimeout(c.holdTimer)
    c.holdTimer = 0
    go(Math.round(c.pos) + dir, STEP_MS)
  }

  /* Navegação direta (pontos): caminho mais curto até o depoimento. */
  const manualDot = (i: number) => {
    const c = s.current
    if (c.armed || c.dragging) return
    if (c.animating) freeze()
    const view = ((Math.round(c.pos) % n) + n) % n
    let delta = (i - view) % n
    if (delta > n / 2) delta -= n
    if (delta < -n / 2) delta += n
    c.resumeAt = performance.now() + RESUME_MS
    clearTimeout(c.holdTimer)
    c.holdTimer = 0
    go(Math.round(c.pos) + delta, STEP_MS)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const c = s.current
    if (c.armed || c.dragging) return // ignora um segundo dedo durante o arraste
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if (c.animating) freeze()
    c.armed = true
    c.startX = e.clientX
    c.startY = e.clientY
    c.startPos = c.pos
    clearTimeout(c.holdTimer)
    c.holdTimer = 0
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const c = s.current
    if (!c.armed) return
    const dx = e.clientX - c.startX
    if (!c.dragging) {
      /* Só engata o arraste com intenção horizontal clara. */
      if (Math.abs(dx) < 7) return
      const dy = e.clientY - c.startY
      if (Math.abs(dx) < Math.abs(dy) && Math.abs(dy) > 4) {
        c.armed = false
        return
      }
      c.dragging = true
      const track = trackRef.current
      if (track) track.style.transitionDuration = '0s'
      railRef.current?.setPointerCapture(e.pointerId)
    }
    let p = c.startPos - dx / (c.step || 1)
    while (p >= n * 2) p -= n
    while (p < n) p += n
    c.pos = p
    apply()
  }

  const onPointerUp = () => {
    const c = s.current
    if (!c.armed) return
    c.armed = false
    if (!c.dragging) {
      schedule()
      return
    }
    c.dragging = false
    let target = Math.round(c.pos)
    while (target >= n * 2) target -= n
    while (target < n) target += n
    const dist = Math.abs(target - c.pos)
    /* Encaixe proporcional à distância restante (máx. 1,3s, mín. 0,26s). */
    const dur = Math.min(STEP_MS, Math.max(260, dist * STEP_MS))
    c.resumeAt = performance.now() + RESUME_MS
    go(target, dur)
  }

  const onPointerEnter = () => {
    if (!s.current.canHover) return
    s.current.hover = true
    schedule()
  }
  const onPointerLeave = () => {
    if (!s.current.canHover) return
    s.current.hover = false
    schedule()
  }
  const onDragStart = (e: React.DragEvent) => e.preventDefault()

  useEffect(() => {
    const rail = railRef.current
    const track = trackRef.current
    if (!rail || !track) return
    const c = s.current

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    c.reduced = mq.matches
    const onMq = (e: MediaQueryListEvent) => {
      c.reduced = e.matches
      schedule()
    }
    mq.addEventListener('change', onMq)

    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined
      const second = track.children[1] as HTMLElement | undefined
      if (!first || !second) return
      const w = first.offsetWidth
      const gap = second.offsetLeft - first.offsetLeft - w
      c.step = w + gap
      c.center = (rail.clientWidth - w) / 2
      track.style.transitionDuration = '0s'
      apply()
      track.getBoundingClientRect()
    }
    measure()
    window.addEventListener('resize', measure)

    const io = new IntersectionObserver(
      ([entry]) => {
        c.inView = entry.isIntersecting
        schedule()
      },
      { rootMargin: '140px 0px 140px 0px' }
    )
    io.observe(rail)

    const onVis = () => schedule()
    document.addEventListener('visibilitychange', onVis)

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== track || e.propertyName !== 'transform') return
      finish(c.moveId)
    }
    track.addEventListener('transitionend', onEnd)

    /* Retoma o automático quando só o tempo da interação segurar. */
    c.patrol = window.setInterval(() => {
      if (!c.holdTimer) schedule()
    }, 500)
    schedule()

    return () => {
      mq.removeEventListener('change', onMq)
      window.removeEventListener('resize', measure)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      track.removeEventListener('transitionend', onEnd)
      clearInterval(c.patrol)
      clearTimeout(c.holdTimer)
    }
  }, [])

  return (
    <div>
      <div
        className="testi-rail"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos de quem já consultou o Livro dos Sonhos"
        ref={railRef}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={onDragStart}
      >
        <div className="testi-track" ref={trackRef}>
          {[0, 1, 2].map((copy) =>
            images.map(([src, alt], i) => (
              <figure
                className={`testi-card${active === i ? ' is-active' : ''}`}
                key={`${copy}-${i}`}
                aria-hidden={copy > 0 || undefined}
              >
                <img
                  src={src}
                  alt={copy > 0 ? '' : alt}
                  width={331}
                  height={325}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))
          )}
        </div>
      </div>
      <div className="testi-controls">
        <button className="testi-arrow" type="button" aria-label="Depoimento anterior" onClick={() => manual(-1)}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <div className="testi-dots">
          {images.map(([, alt], i) => (
            <button
              key={i}
              type="button"
              className={`testi-dot${active === i ? ' is-active' : ''}`}
              aria-label={`Ver depoimento ${i + 1}: ${alt}`}
              aria-current={active === i ? 'true' : undefined}
              onClick={() => manualDot(i)}
            />
          ))}
        </div>
        <button className="testi-arrow" type="button" aria-label="Próximo depoimento" onClick={() => manual(1)}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

/* Card 1 (Livro Digital, R$ 12,90): preço e link fixos do plano 1.
   O clique não vai direto ao checkout: abre primeiro o pop-up de
   downsell oferecendo o pacote completo por R$ 19,90. */
function PlanBasicCard({ onDownsell }: { onDownsell: () => void }) {
  return (
    <article className="plan-card">
      <header className="plan-head">
        <div>
          <span className="plan-tag">{content.plans.basic.tag}</span>
          <h3 className="plan-title">{content.plans.basic.title}</h3>
        </div>
        <div className="plan-thumb" aria-hidden="true">
          <img src="/assets/capa.webp" alt="" loading="lazy" draggable={false} />
          <span className="plan-thumb-chip">PDF</span>
        </div>
      </header>
      <ol className="plan-list" aria-label="O que o plano Livro Digital entrega">
        {content.plans.basic.items.map((item, index) => (
          <li key={item}>
            <span className="plan-num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
      <div className="plan-price">
        <strong>
          <Price value={comercial.price} />
        </strong>
        <small>Pagamento único</small>
        <span className="plan-anchor">{content.plans.basic.anchor}</span>
      </div>
      {comercial.checkoutUrl ? (
        <a
          className="button button--checkout plan-cta"
          href={comercial.checkoutUrl}
          rel="noopener noreferrer"
          onClick={(event) => {
            /* Clique comum abre o downsell; o href segue válido para
               abrir em nova aba (toque longo / clique do meio). */
            event.preventDefault()
            onDownsell()
          }}
        >
          <span className="btn-label">
            {content.plans.basic.cta} <Price value={comercial.price} />
          </span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      ) : (
        <button className="button button--checkout plan-cta" type="button" disabled>
          <span className="btn-label">
            {content.plans.basic.cta} {comercial.price}
          </span>
        </button>
      )}
      <p className="cta-risk">{content.riskZero}</p>
    </article>
  )
}

/* Card 2 (Livro + Aplicativo, R$ 24,90) com selo MAIS ESCOLHIDO.
   Sem urgência, sem contador: apenas a lista do que o pacote entrega. */
function OfferPlans({ onDownsell }: { onDownsell: () => void }) {
  return (
    <div className="plans">
      <PlanBasicCard onDownsell={onDownsell} />

      <article className="plan-card plan-card--complete">
        <span className="plan-promo">
          <Star size={12} aria-hidden="true" />
          {content.plans.complete.badge}
        </span>
        <header className="plan-head">
          <div>
            <h3 className="plan-title">{content.plans.complete.title}</h3>
          </div>
          <img
            className="plan-thumb--kit"
            src="/assets/kit-completo.webp"
            alt="Prévia do pacote: capa do livro, tela do aplicativo e o cartão digital do catálogo"
            loading="lazy"
            draggable={false}
          />
        </header>
        <p className="plan-usage plan-usage--lead">
          <Plus size={13} aria-hidden="true" />
          <span>{content.plans.complete.firstLine}</span>
        </p>
        <ol className="plan-list" aria-label="O que o plano Livro + Aplicativo entrega">
          {content.plans.complete.items.map((item, index) => (
            <li key={item}>
              <span className="plan-num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <div className="plan-price">
          <strong>
            <Price value={comercial.packPrice} />
          </strong>
          <small>Pagamento único</small>
          <span className="plan-anchor">{content.plans.complete.anchor}</span>
        </div>
        {comercial.checkoutUrlApp ? (
          <a
            className="button button--checkout plan-cta"
            href={comercial.checkoutUrlApp}
            rel="noopener noreferrer"
            onClick={() => trackInitiateCheckout(comercial.packPriceValue)}
          >
            <span className="btn-label">
              {content.plans.complete.cta} <Price value={comercial.packPrice} />
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        ) : (
          <button className="button button--checkout plan-cta" type="button" disabled>
            <span className="btn-label">
              {content.plans.complete.cta} {comercial.packPrice}
            </span>
          </button>
        )}
        <p className="cta-risk">{content.riskZero}</p>
      </article>
    </div>
  )
}

function ProductShowcase() {
  const [open, setOpen] = useState(false)
  useEscapeKey(open, () => setOpen(false))
  return (
    <>
      <div className="offer-visual" aria-label="Capa, páginas reais e visualização do livro no celular">
        <img className="offer-photo" src="/assets/offer-mockup-v3.webp" alt="Livro dos Sonhos em uma composição fotográfica" loading="lazy" />
        <div className="offer-cover-mobile">
          <img src="/assets/capa.webp" alt="Capa original do Livro dos Sonhos" loading="lazy" />
        </div>
        <div className="offer-leaf offer-leaf--one">
          <img src="/assets/indice.webp" alt="" aria-hidden="true" loading="lazy" />
        </div>
        <div className="offer-leaf offer-leaf--two">
          <img src="/assets/tabela.webp" alt="" aria-hidden="true" loading="lazy" />
        </div>
        <button className="phone" type="button" onClick={() => setOpen(true)} aria-label="Ampliar página real mostrada no celular">
          <span className="phone-speaker" aria-hidden="true" />
          <span className="phone-screen">
            <img src="/assets/verbete-a.webp" alt="Página real de verbete exibida no celular" loading="lazy" />
          </span>
          <span className="phone-hint">TOQUE PARA AMPLIAR</span>
        </button>
      </div>
      {open && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Verbete ampliado" onClick={() => setOpen(false)}>
          <button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Fechar verbete ampliado">
            <X />
          </button>
          <img src="/assets/originais/verbete-a.webp" alt="Página real de verbete ampliada" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  )
}

function ReadingPhone() {
  const [open, setOpen] = useState(false)
  useEscapeKey(open, () => setOpen(false))
  return (
    <>
      <button className="reading-phone" type="button" onClick={() => setOpen(true)} aria-label="Ampliar a página real mostrada no celular">
        <img className="reading-phone-frame" src="/assets/phone-frame-v1.webp" alt="" aria-hidden="true" loading="lazy" />
        <span className="reading-phone-page">
          <img src="/assets/verbete-a.webp" alt="" loading="lazy" />
        </span>
      </button>
      {open && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Página do livro ampliada" onClick={() => setOpen(false)}>
          <button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Fechar página ampliada">
            <X />
          </button>
          <img
            src="/assets/originais/verbete-a.webp"
            alt="Página real do Livro dos Sonhos com interpretações, bichos e números"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

/* Barra CTA fixa — apenas mobile. Aparece após o hero e some na oferta/rodapé. */
function FloatingCta() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero')
    const offer = document.getElementById('oferta')
    const footer = document.querySelector('footer')
    if (!hero || !offer || !footer) return
    let pastHero = false
    let offerNear = false
    let footerNear = false
    const update = () => setVisible(pastHero && !offerNear && !footerNear)
    const observe = (el: Element, setter: (value: boolean) => void) => {
      const io = new IntersectionObserver(([entry]) => {
        setter(entry.isIntersecting)
        update()
      })
      io.observe(el)
      return io
    }
    const ioHero = observe(hero, (v) => (pastHero = !v))
    const ioOffer = observe(offer, (v) => (offerNear = v))
    const ioFooter = observe(footer, (v) => (footerNear = v))
    return () => {
      ioHero.disconnect()
      ioOffer.disconnect()
      ioFooter.disconnect()
    }
  }, [])
  return (
    <aside className={`floating-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <div className="floating-cta-info">
        <span className="floating-cta-name">Livro dos Sonhos</span>
        <span className="floating-cta-price">
          <Price value={comercial.price} />
        </span>
      </div>
      <a className="floating-cta-btn" href="#oferta" tabIndex={visible ? 0 : -1}>
        QUERO ACESSAR
      </a>
    </aside>
  )
}

/* Downsell: pop-up que abre quando a pessoa clica no plano do livro
   (R$ 12,90). Copy persuasiva oferecendo o pacote completo (R$ 24,90)
   por R$ 19,90, com o desconto ressaltado; o link pequeno de recusa
   segue para o checkout do livro sozinho. Fecha com ESC, X ou clique
   fora. O rastreamento dispara só nos botões que levam ao checkout. */
function DownsellModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEscapeKey(open, onClose)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
  if (!open) return null
  return (
    <div
      className="downsell"
      role="dialog"
      aria-modal="true"
      aria-labelledby="downsell-title"
      onClick={onClose}
    >
      <div className="downsell-card" onClick={(event) => event.stopPropagation()}>
        <button className="downsell-close" type="button" onClick={onClose} aria-label="Fechar oferta especial">
          <X size={18} aria-hidden="true" />
        </button>
        <span className="downsell-eyebrow">{content.downsell.eyebrow}</span>
        <h3 id="downsell-title">{content.downsell.title}</h3>
        <p className="downsell-lead">{content.downsell.lead}</p>
        <ul className="downsell-list">
          {content.downsell.items.map((item) => (
            <li key={item}>
              <Check size={15} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="downsell-price">
          <span className="downsell-pack">{content.downsell.packLabel}</span>
          <span className="downsell-old">
            {content.downsell.fromLabel} <Price value={comercial.packPrice} />
          </span>
          <strong className="downsell-new">
            <Price value={comercial.downsellPrice} />
          </strong>
          <span className="downsell-more">{content.downsell.more}</span>
          <span className="downsell-saving">{content.downsell.saving}</span>
        </div>
        {comercial.checkoutUrlDownsell ? (
          <a
            className="button button--gold downsell-cta"
            href={comercial.checkoutUrlDownsell}
            rel="noopener noreferrer"
            onClick={() => trackInitiateCheckout(comercial.downsellPriceValue)}
          >
            <span className="btn-label">
              {content.downsell.cta} <Price value={comercial.downsellPrice} />
            </span>
            <ArrowRight size={20} aria-hidden="true" />
          </a>
        ) : (
          <button className="button button--gold downsell-cta" type="button" disabled>
            <span className="btn-label">
              {content.downsell.cta} {comercial.downsellPrice}
            </span>
          </button>
        )}
        <p className="downsell-urgency">{content.downsell.urgency}</p>
        <a
          className="downsell-skip"
          href={comercial.checkoutUrl}
          rel="noopener noreferrer"
          onClick={() => trackInitiateCheckout(comercial.priceValue)}
        >
          {content.downsell.skip}
        </a>
        <p className="downsell-micro">{content.downsell.micro}</p>
      </div>
    </div>
  )
}

export default function Page() {
  const [downsellOpen, setDownsellOpen] = useState(false)
  return (
    <>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">{content.name.toUpperCase()}</p>
              <h1 id="hero-title">
                Acordou lembrando do sonho? <em>Veja o bicho e os números</em> antes de jogar.
              </h1>
              <p className="hero-lead">{content.subheadline}</p>
              <ul className="hero-bullets">
                {content.bullets.map((item) => (
                  <li key={item}>
                    <Check size={19} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {/* CTA do hero leva ao bloco da oferta (dois planos),
                 sem preço no botão: o valor aparece só nos cards. */}
              <Button href="#oferta">
                <span className="btn-label">QUERO ACESSO AO LIVRO DOS SONHOS</span>
              </Button>
              <p className="hero-footnote">
                <a href="#previas">Confira as páginas reais antes de decidir.</a>
              </p>
            </div>
            <div className="hero-media" aria-label="Capa e páginas reais do Livro dos Sonhos">
              <div className="hero-stage">
                <img
                  className="hero-art"
                  src="/assets/hero-mockup-v3.webp"
                  alt="Mockup do Livro dos Sonhos com a capa do tigre, índice e um celular para consulta"
                  fetchPriority="high"
                />
                <div className="hero-screen" aria-hidden="true">
                  <img src="/assets/verbete-a.webp" alt="" />
                </div>
              </div>
              <div className="page-marker">
                <strong>LIVRO DIGITAL</strong>
                <span>FORMATO A4</span>
              </div>
            </div>
          </div>
        </section>

        <section className="facts" aria-label="Conteúdo do produto">
          <div className="container facts-inner">
            {content.facts.map((item) => (
              <div key={item}>
                <Check size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section pain">
          <div className="container center narrow">
            <span className="section-kicker">DO SONHO À CONSULTA</span>
            <h2>Sonhou com um animal, uma pessoa ou uma situação e quer saber o que consultar?</h2>
            <p>
              Procure o que apareceu no sonho pelo índice. No verbete, você encontra a interpretação e as associações de bicho e números
              registradas no livro para consultar antes da sua jogada.
            </p>
            <div className="pain-chips">
              <span>O que meu sonho significa?</span>
              <span>Qual bicho aparece?</span>
              <span>Quais são os números?</span>
            </div>
            <p className="pain-bridge">Abra o índice. Ache a palavra. Consulte o verbete.</p>
          </div>
        </section>

        <section className="section previews" id="previas">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">OLHE POR DENTRO</span>
              <h2>
                Veja o livro <em>de verdade</em> antes de comprar.
              </h2>
              <p>Veja o índice, encontre um verbete e confira como os números aparecem no livro.</p>
            </div>
            <p className="marquee-hint">São páginas do arquivo real. Deslize para conferir.</p>
            <MarqueeRail />
            <div className="center preview-action">
              <Button href="#oferta" tone="dark">
                Quero consultar meus sonhos
              </Button>
            </div>
          </div>
        </section>

        <section className="section method">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">SIMPLES DE CONSULTAR</span>
              <h2>Do sonho ao verbete em três passos.</h2>
            </div>
            <div className="steps">
              {content.steps.map(([number, title, lead]) => (
                <article key={number}>
                  <span className="step-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{lead}</p>
                </article>
              ))}
            </div>
            <p className="method-close">
              <Search size={24} /> O caminho está no índice. As associações estão nos verbetes.
            </p>
          </div>
        </section>

        <section className="section mobile-reading" aria-labelledby="mobile-reading-title">
          <div className="container mobile-reading-grid">
            <div className="mobile-reading-copy">
              <span className="section-kicker">CONSULTE PELO CELULAR</span>
              <h2 id="mobile-reading-title">
                Seu Livro dos Sonhos vai <em>com você no telefone</em>.
              </h2>
              <p className="mobile-reading-lead">Comprou, abriu no celular e consultou quando quiser.</p>
              <p className="mobile-reading-note">
                Livro digital em PDF: amplie a página na tela do celular ou, se preferir, imprima em A4 e encaderne por conta própria.
              </p>
              <Button href="#oferta" tone="dark">
                Ver o livro digital
              </Button>
            </div>
            <div className="mobile-reading-visual">
              <ReadingPhone />
              <span className="mobile-reading-caption">Página real do livro na tela. Toque para ampliar.</span>
            </div>
          </div>
        </section>

        <section className="section inside">
          <div className="container inside-grid">
            <div className="inside-media">
              <img src="/assets/tabela.webp" alt="Página real da tabela dos 25 bichos, grupos e dezenas" loading="lazy" />
              <img src="/assets/verbete-b.webp" alt="Página real com verbetes e números do Livro dos Sonhos" loading="lazy" />
            </div>
            <div className="inside-copy">
              <span className="section-kicker">UM LIVRO PARA CONSULTAR</span>
              <h2>O que vem no livro?</h2>
              <p>
                O arquivo digital em formato A4, com índice, tabela e verbetes para consultar. Para ter em papel, basta imprimir e
                encadernar por conta própria.
              </p>
              <ul>
                <li>
                  <Check size={18} />
                  <span>
                    <strong>Livro digital</strong> em formato A4
                  </span>
                </li>
                <li>
                  <Check size={18} />
                  <span>
                    <strong>Índice alfabético</strong> para localizar os verbetes
                  </span>
                </li>
                <li>
                  <Check size={18} />
                  <span>
                    <strong>Tabela dos 25 bichos</strong>, grupos e dezenas
                  </span>
                </li>
                <li>
                  <Check size={18} />
                  <span>
                    <strong>Interpretações</strong> com números associados
                  </span>
                </li>
                <li>
                  <Check size={18} />
                  <span>
                    Abra no celular ou <strong>imprima e encaderne</strong> por conta própria
                  </span>
                </li>
              </ul>
              <Button href="#oferta" tone="dark">
                Ver o valor do livro
              </Button>
            </div>
          </div>
        </section>

        {/* Depoimentos — pausa de confiança antes da oferta: 5 mensagens
            reais de clientes em carrossel automático e infinito. */}
        <section className="section testimonials" aria-labelledby="testimonials-title">
          <div className="container">
            <div className="section-heading">
              <h2 id="testimonials-title">
                {content.testimonials.titleLead} <em>{content.testimonials.titleEm}</em>
              </h2>
              <p>{content.testimonials.sub}</p>
            </div>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Caixa da oferta — dois planos: livro digital (R$ 12,90) e
            livro + aplicativo (R$ 24,90), cada um com seu botão e seu
            link de checkout. */}
        <section className="section offer" id="oferta">
          <div className="container">
            <article className="offer-box">
              <header className="offer-box-head">
                <span className="offer-box-eyebrow">{content.plans.eyebrow}</span>
                <h2>
                  {content.plans.titleLead} <em>{content.plans.titleEm}</em>
                </h2>
                <p>{content.plans.sub}</p>
              </header>
              <div className="offer-box-visual">
                <ProductShowcase />
              </div>
              <OfferPlans onDownsell={() => setDownsellOpen(true)} />
              <p className="offer-trust">{content.plans.trust}</p>
            </article>
          </div>
        </section>

        <section className="section faq">
          <div className="container narrow">
            <div className="section-heading">
              <span className="section-kicker">DÚVIDAS FREQUENTES</span>
              <h2>Antes de decidir, confira.</h2>
            </div>
            <div className="faq-list">
              {content.faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <strong>LIVRO DOS SONHOS</strong>
          <p>Material digital de consulta. As associações apresentadas no livro não preveem resultados.</p>
        </div>
      </footer>
      <FloatingCta />
      <PurchaseToast />
      <WhatsappHelp />
      <DownsellModal open={downsellOpen} onClose={() => setDownsellOpen(false)} />
    </>
  )
}
