import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { comercial } from '@/lib/comercial'
import { metaPixels } from '@/lib/pixel'
import './fonts.css'
import './styles.css'

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='13' fill='%23111111'/%3E%3Cpath d='M16 15h14c5 0 8 2 10 5 2-3 5-5 10-5v33c-5 0-8 1-10 4-2-3-5-4-10-4H16z' fill='none' stroke='%23F6C945' stroke-width='4' stroke-linejoin='round'/%3E%3Cpath d='M40 20v32' stroke='%23F6C945' stroke-width='4'/%3E%3C/svg%3E"

export const metadata: Metadata = {
  title: 'Livro dos Sonhos | Significados, bichos e números',
  description:
    'Sonhou? Consulte significados, bichos e números associados no Livro dos Sonhos. Veja páginas reais do livro antes de decidir.',
  icons: {
    icon: FAVICON,
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        {/* Meta Pixel — dois pixels com a mesma configuração:
            - principal: 1409608484604873
            - "extase":  900080772936894
            Um único fbevents.js; cada fbq('track', ...) transmite para
            os dois. PageView + ViewContent enfileirados juntos para
            garantir a ordem antes de fbevents.js carregar. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixels.principal}');
            fbq('init', '${metaPixels.extase}');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent', ${JSON.stringify({
              content_name: comercial.product,
              content_type: 'product',
              value: comercial.priceValue,
              currency: comercial.currency,
            })});`}
        </Script>
        {/* Meta Pixel — fallback para navegadores sem JavaScript (um por pixel) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${metaPixels.principal}&ev=PageView&noscript=1`}
          />
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${metaPixels.extase}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* Microsoft Clarity — sessões e mapas de calor (ID: ynmey7a3f2) */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ynmey7a3f2");`}
        </Script>
      </body>
    </html>
  )
}
