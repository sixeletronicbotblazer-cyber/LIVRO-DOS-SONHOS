'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Gift, Search, Smartphone, X } from 'lucide-react'
import { content } from '@/lib/content'
import { comercial } from '@/lib/comercial'

type SelectedPage = { src: string; title: string } | null

function Button({
  children,
  href = '#oferta',
  tone = 'gold',
}: {
  children: React.ReactNode
  href?: string
  tone?: 'gold' | 'dark'
}) {
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

function CheckoutButton() {
  if (!comercial.checkoutUrl)
    return (
      <button className="button button--checkout button--checkout-main" type="button" disabled>
        Compra disponível em breve
      </button>
    )
  return (
    <a className="button button--checkout button--checkout-main" href={comercial.checkoutUrl} rel="noopener noreferrer">
      QUERO ACESSAR O LIVRO DOS SONHOS <ArrowRight size={20} aria-hidden="true" />
    </a>
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
        <span className="floating-cta-price">{comercial.price}</span>
      </div>
      <a className="floating-cta-btn" href="#oferta" tabIndex={visible ? 0 : -1}>
        QUERO ACESSAR
      </a>
    </aside>
  )
}

export default function Page() {
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
              <Button href="#previas">Ver o livro por dentro</Button>
              <p className="hero-footnote">Confira as páginas reais antes de decidir.</p>
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
                <strong>120 PÁGINAS</strong>
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
              <p>Índice, tabela e páginas internas: cada prévia abaixo foi retirada do material real.</p>
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
              <p>
                Depois de adquirir e receber o arquivo digital, basta abrir o PDF no leitor do celular. Procure a letra do que sonhou no
                índice, vá ao verbete e amplie a página com os dedos para ler o significado, o bicho e os números.
              </p>
              <ul>
                <li>
                  <Check size={19} /> Abra o arquivo no celular quando quiser consultar.
                </li>
                <li>
                  <Check size={19} /> Amplie as páginas para ler os detalhes.
                </li>
                <li>
                  <Check size={19} /> Se preferir, imprima e encaderne por conta própria.
                </li>
              </ul>
              <p className="mobile-reading-note">
                <Smartphone size={16} aria-hidden="true" />
                Nada para carregar ou levar — o livro fica disponível no seu celular.
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
                Você recebe o arquivo digital em formato A4, com índice, tabela e verbetes para consultar. Se quiser uma cópia em papel,
                pode imprimir e encadernar por conta própria.
              </p>
              <ul>
                <li>
                  <Check size={18} />
                  <span>
                    <strong>Livro digital de 120 páginas</strong> em formato A4
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

        {/* Caixa da oferta — enxuta: promessa + visual do produto + preço.
            Os entregáveis detalhados ficam nas seções anteriores da página. */}
        <section className="section offer" id="oferta">
          <div className="container">
            <article className="offer-box">
              <header className="offer-box-head">
                <span className="offer-box-eyebrow">{content.offer.eyebrow}</span>
                <h2>
                  Leve o Livro dos Sonhos <em>completo no seu celular</em>
                </h2>
                <p>{content.offer.sub}</p>
              </header>
              <div className="offer-box-visual">
                <ProductShowcase />
              </div>
              {content.offer.bonus.length > 0 && (
                <div className="offer-block offer-bonus">
                  <h3>
                    <Gift size={17} /> Bônus inclusos
                  </h3>
                  <ul>
                    {content.offer.bonus.map((bonus) => (
                      <li key={bonus.title}>
                        <Gift size={15} />
                        <span>
                          <strong>{bonus.title}</strong> — {bonus.lead}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="offer-price-zone">
                <p className="price-label">ACESSO COMPLETO</p>
                <div className="price">
                  <strong>{comercial.price}</strong>
                  <small>Pagamento único • Sem assinatura</small>
                </div>
                <p className="price-note">Receba seu acesso digital após a compra.</p>
                <p className="offer-close-line">Tenha o Livro dos Sonhos sempre à mão para consultar quando quiser.</p>
                <CheckoutButton />
                <p className="price-microcopy">Pagamento seguro • Acesso digital</p>
              </div>
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
    </>
  )
}
