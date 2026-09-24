'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
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

function PreviewRail() {
  const rail = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<SelectedPage>(null)
  useEffect(() => {
    if (!selected) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [selected])
  function scroll(direction: number) {
    rail.current?.scrollBy({ left: direction * Math.min(340, rail.current.clientWidth * 0.8), behavior: 'smooth' })
  }
  return (
    <>
      <div className="rail-controls">
        <p>São páginas do arquivo real. Deslize para conferir.</p>
        <div>
          <button type="button" onClick={() => scroll(-1)} aria-label="Ver página anterior">
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Ver próxima página">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="preview-rail" ref={rail} aria-label="Páginas reais do Livro dos Sonhos" tabIndex={0}>
        {content.gallery.map(([src, title, lead]) => (
          <button className="preview-card" key={src} type="button" onClick={() => setSelected({ src, title })} aria-label={`Ampliar ${title}`}>
            <span className="preview-image">
              <img src={src} alt={`Página real: ${title}`} loading="lazy" />
            </span>
            <span className="preview-meta">
              <strong>{title}</strong>
              <small>{lead}</small>
            </span>
          </button>
        ))}
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
      <button className="button button--checkout" type="button" disabled>
        Compra disponível em breve
      </button>
    )
  return (
    <a className="button button--checkout" href={comercial.checkoutUrl} rel="noopener noreferrer">
      Quero meu Livro dos Sonhos <ArrowRight size={20} aria-hidden="true" />
    </a>
  )
}

function ProductShowcase() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])
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
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])
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
              <h2>Veja o livro de verdade antes de comprar.</h2>
              <p>Índice, tabela e páginas internas: cada prévia abaixo foi retirada do material real.</p>
            </div>
            <PreviewRail />
            <div className="center preview-action">
              <Button href="#oferta" tone="dark">
                Ver o valor do livro
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
              <h2 id="mobile-reading-title">Seu Livro dos Sonhos vai com você no telefone.</h2>
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
                {content.included.map((item) => (
                  <li key={item}>
                    <Check size={18} />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="#oferta" tone="dark">
                Ver o valor do livro
              </Button>
            </div>
          </div>
        </section>

        <section className="section offer" id="oferta">
          <div className="container offer-grid">
            <div className="offer-copy">
              <span className="section-kicker">LIVRO DOS SONHOS</span>
              <h2>O sonho ficou na memória? Consulte o verbete antes de escolher sua jogada.</h2>
              <p>
                Receba o livro digital, abra no celular e procure o que sonhou no índice. Veja a interpretação, o bicho e os números
                associados que o livro registra. As páginas A4 também podem ser impressas por você.
              </p>
              <div className="offer-inclusions">
                <span>
                  <BookOpen size={19} /> 120 páginas para consultar
                </span>
                <span>
                  <Search size={19} /> Índice de A a Z
                </span>
                <span>
                  <Check size={19} /> Tabela dos 25 bichos
                </span>
              </div>
            </div>
            <div className="offer-right">
              <ProductShowcase />
              <article className="price-card">
                <p className="price-label">LIVRO DIGITAL COMPLETO</p>
                <h3>Livro dos Sonhos</h3>
                <p className="price-description">Arquivo digital para abrir e ampliar no celular. Também pode ser impresso por conta própria.</p>
                <ul className="price-details">
                  <li>120 páginas em formato A4</li>
                  <li>Índice alfabético e tabela dos 25 bichos</li>
                  <li>Interpretações e números associados</li>
                </ul>
                <div className="price">
                  <small>Pagamento único</small>
                  <strong>{comercial.price}</strong>
                </div>
                <CheckoutButton />
              </article>
            </div>
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
    </>
  )
}
