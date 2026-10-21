import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { LazyVideo } from "@/components/Motion";
import { allClients, company, industries, products, waLink, type Product } from "@/lib/site";

export function HeroRing() {
  return (
    <svg className="hero-ring" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="88" fill="none" stroke="#ef8a1e" strokeWidth="12" strokeDasharray="330 600" transform="rotate(120 100 100)" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#ffffff" strokeWidth="12" strokeDasharray="180 600" transform="rotate(-20 100 100)" />
    </svg>
  );
}

export function PageHero({
  title, lead, crumbs, image,
}: { title: string; lead: string; crumbs: { href?: string; label: string }[]; image?: string }) {
  return (
    <section className={`page-hero${image ? " has-media" : ""}`}>
      {image && (
        <div className="page-hero-media" data-parallax="0.3">
          <Image src={image} alt="" fill priority sizes="100vw" />
        </div>
      )}
      <HeroRing />
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} style={{ display: "contents" }}>
              <span aria-hidden="true">/</span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}

export function SectionHead({ kicker, title, lead, center }: { kicker: string; title: string; lead?: string; center?: boolean }) {
  return (
    <div className={`section-head reveal${center ? " center" : ""}`}>
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="cta-band reveal">
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2>Need ethanol, alcohol or molasses for your plant?</h2>
            <p>Send us your requirement — product, quantity and delivery location — and get a quotation from our team.</p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-dark" href="/quote">Request a Quote <Icon name="arrow-right" /></Link>
            <a className="btn btn-white" href={`tel:${company.phones[0].tel}`}><Icon name="phone" />{company.phones[0].display}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Decorative orange/grey arc echoing the circle in the MT logo. */
export function RingArc({ className = "" }: { className?: string }) {
  return (
    <svg className={`ring-arc ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="90" fill="none" stroke="var(--orange)" strokeWidth="7" strokeDasharray="300 600" strokeLinecap="round" transform="rotate(110 100 100)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="var(--grey)" strokeWidth="7" strokeDasharray="170 600" strokeLinecap="round" transform="rotate(-40 100 100)" />
    </svg>
  );
}

/** Home page: photo-led bento grid — flagship product large, the rest as image tiles. */
export function ProductBento() {
  return (
    <div className="bento">
      {products.map((p, i) => (
        <article key={p.id} className={`bento-tile bento-${p.id} reveal reveal-clip${i ? ` reveal-d${Math.min(i, 3)}` : ""}`}>
          <span className="bento-img" data-parallax={p.highlight ? "0.08" : "0.05"}>
            <Image src={p.image} alt={p.imageAlt} fill sizes={p.highlight ? "(max-width: 980px) 100vw, 780px" : "(max-width: 980px) 100vw, 400px"} />
          </span>
          {p.highlight && <RingArc className="bento-ring" />}
          {p.highlight && <span className="bento-flag">Main product</span>}
          <div className="bento-body">
            <span className="bento-code"><Icon name={p.icon} />{p.code}</span>
            <h3>{p.name}</h3>
            <p>{p.highlight ? p.cardText : p.menuNote}</p>
            {p.highlight && (
              <div className="bento-stats">
                {p.cardSpecs.map(([k, v]) => <span key={k}><small>{k}</small><strong>{v}</strong></span>)}
              </div>
            )}
            <div className="bento-actions">
              <Link className="btn btn-primary btn-sm" href={`/quote?product=${p.id}`}>Get Quote</Link>
              <Link className="bento-more" href={`/products/${p.slug}`}>Details <Icon name="arrow-right" /></Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Products page: alternating editorial rows with large photos and overlapping detail cards. */
export function ProductShowcase() {
  return (
    <div className="showcase">
      {products.map((p, i) => (
        <article key={p.id} className={`show-row${i % 2 ? " flip" : ""}`}>
          <div className="show-media">
            <RingArc className="show-ring" />
            <figure className="show-figure reveal reveal-clip">
              <span className="show-img" data-parallax="0.1">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 980px) 100vw, 680px" />
              </span>
            </figure>
            <div className="show-chip-wrap" data-parallax="-0.2">
              <div className="show-chip reveal reveal-d2">
                <span className="pc-ico"><Icon name={p.icon} /></span>
                <span><small>{p.cardSpecs[0][0]}</small><strong>{p.cardSpecs[0][1]}</strong></span>
              </div>
            </div>
          </div>
          <div className="show-card reveal reveal-d1">
            <span className="show-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="pc-code">{p.code}</span>
            <h2>{p.name}</h2>
            <p>{p.cardText}</p>
            <div className="chips">{p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
            <div className="pc-actions">
              <Link className="link-arrow" href={`/products/${p.slug}`}>Full product details <Icon name="arrow-right" /></Link>
              <Link className="btn btn-primary btn-sm" href={`/quote?product=${p.id}`}>Get Quote</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function IndustryGrid({ brief = false }: { brief?: boolean }) {
  return (
    <div className="ind-tiles">
      {industries.map((ind, i) => (
        <div className={`ind-tile reveal reveal-clip${i ? ` reveal-d${Math.min(i, 4)}` : ""}`} key={ind.title} tabIndex={0}>
          <Image src={ind.image} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 33vw, 260px" />
          <div className="ind-body">
            <span className="ind-ico"><Icon name={ind.icon} /></span>
            <h3>{ind.title}</h3>
            <div className="ind-more">
              <p>{brief ? ind.short : ind.text}</p>
              <span className="ind-products">{ind.products}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export type GalleryPanel = { image: string; alt: string; title: string; text: string; ours?: boolean };

/**
 * Pinned horizontal gallery: on desktop the section sticks while vertical scrolling slides the
 * panels sideways (driven by MotionController via data-hscroll). Elsewhere it is a swipe carousel.
 */
export function HorizontalGallery({
  kicker, title, lead, panels, children,
}: { kicker: string; title: string; lead: string; panels: GalleryPanel[]; children?: React.ReactNode }) {
  return (
    <section className="hscroll" data-hscroll>
      <div className="hscroll-sticky">
        <div className="hscroll-track">
          <div className="hscroll-intro">
            <span className="kicker">{kicker}</span>
            <h2>{title}</h2>
            <p>{lead}</p>
            <span className="hscroll-hint"><Icon name="arrow-right" />Scroll to follow the journey</span>
          </div>
          {panels.map((p, i) => (
            <figure className="hpanel" key={p.title}>
              <span className="hpanel-img">
                <Image src={p.image} alt={p.alt} fill sizes="(max-width: 980px) 85vw, 46vw" />
              </span>
              <span className="hpanel-num">{String(i + 1).padStart(2, "0")}</span>
              <figcaption>
                {p.ours && <span className="tag">We supply</span>}
                <strong>{p.title}</strong>
                <span>{p.text}</span>
              </figcaption>
            </figure>
          ))}
          {children && <div className="hscroll-end">{children}</div>}
        </div>
        <div className="hscroll-bar" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}

const TONES = ["o", "", "d"];

export function Monogram({ initials, i }: { initials: string; i: number }) {
  return <span className={`monogram ${TONES[i % 3]}`}>{initials}</span>;
}

export function ClientMarquee() {
  // Rendered twice so the CSS translateX(-50%) loop is seamless.
  const loop = [...allClients, ...allClients];
  return (
    <div className="marquee reveal" aria-label="Our clients">
      <div className="marquee-track">
        {loop.map((c, i) => (
          <div className="client-chip" key={i} aria-hidden={i >= allClients.length || undefined}>
            <Monogram initials={c.initials} i={i} />
            <span><strong>{c.name}</strong><small>{c.product}</small></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductDetail({ p }: { p: Product }) {
  return (
    <section className="prod-detail">
      <div className="container prod-layout">
        <div className="prod-body reveal">
          <div className="prod-head">
            <span className="pc-ico"><Icon name={p.icon} /></span>
            <div><span className="pc-code">{p.tagline}</span><h2>{p.name}</h2></div>
          </div>
          <p className="prod-lead">{p.lead}</p>
          <p><strong>In simple terms:</strong> {p.simple}</p>
          <p>{p.detail}</p>

          <figure className="prod-figure reveal reveal-clip">
            <span className="prod-figure-inner" data-parallax="0.12">
              <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 980px) 100vw, 640px" />
            </span>
          </figure>

          <h3 className="prod-sub">Applications</h3>
          <div className="app-grid">
            {p.applications.map((a) => (
              <div className="app-item" key={a.title}>
                <Icon name={a.icon} />
                <div><strong>{a.title}</strong><span>{a.text}</span></div>
              </div>
            ))}
          </div>

          <h3 className="prod-sub">Typical buyers</h3>
          <div className="chips">{p.buyers.map((b) => <span className="chip chip-grey" key={b}>{b}</span>)}</div>
        </div>
        <aside className="spec-card reveal reveal-d1" aria-label={`${p.name} key details`}>
          <div className="spec-card-head"><small>Key details</small><strong>{p.short}</strong></div>
          <table className="spec-table">
            <tbody>
              {p.specs.map(([k, v], i) => <tr key={k}><th>{k}</th><td className={i === 0 && p.highlight ? "hl" : undefined}>{v}</td></tr>)}
            </tbody>
          </table>
          <div className="spec-card-foot">
            <Link className="btn btn-primary btn-block" href={`/quote?product=${p.id}`}>Request a Quote</Link>
            <a className="btn btn-ghost-light btn-block" href={waLink(`Hello, I need a quotation for ${p.name}.`)} target="_blank" rel="noopener">
              <Icon name="whatsapp" />Ask on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

/** Oversized outline text that slides sideways as the page scrolls. */
export function ScrollTextStrip({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <section className="text-strip" aria-hidden="true">
      <div className="text-strip-row" data-scroll-x="-0.6">
        {row.map((t, i) => <span key={i} className={i % 2 ? "solid" : undefined}>{t}<i>✦</i></span>)}
      </div>
      <div className="text-strip-row" data-scroll-x="0.6">
        {row.map((t, i) => <span key={i} className={i % 2 ? undefined : "solid"}>{t}<i>✦</i></span>)}
      </div>
    </section>
  );
}

/** Full-width section with a parallax background video, dark overlay and content on top. */
export function VideoBand({
  video, poster, kicker, title, text, points, children,
}: {
  video: string; poster: string; kicker: string; title: string; text: string;
  points?: { icon: IconName; title: string; text: string }[]; children?: React.ReactNode;
}) {
  return (
    <section className="video-band">
      <div className="video-band-media" data-parallax="0.25">
        <LazyVideo src={video} poster={poster} />
      </div>
      <div className="container video-band-body">
        <div className="reveal">
          <span className="kicker">{kicker}</span>
          <h2>{title}</h2>
          <p>{text}</p>
          {children}
        </div>
        {points && (
          <div className="video-band-points">
            {points.map((pt, i) => (
              <div className={`vb-point reveal${i ? ` reveal-d${i}` : ""}`} key={pt.title}>
                <span className="vb-ico"><Icon name={pt.icon} /></span>
                <div><strong>{pt.title}</strong><span>{pt.text}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
