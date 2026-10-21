import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { Counter } from "@/components/Effects";
import { LazyVideo } from "@/components/Motion";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { company, industries, products } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Ethanol & Molasses Trader, Baramati",
  description: `Founded in ${company.founded} in Baramati, ${company.name} is a B2B trader of ethanol, alcohol and molasses serving chemical, pharma, petroleum, beverage and cattle-feed industries across India.`,
};

const TIMELINE = [
  { tag: String(company.founded), title: "Founded in Baramati", text: `${company.founder} establishes ${company.name} to trade products from the region's sugar and distillery industry.` },
  { tag: "Growth", title: "Four-product portfolio", text: `The business builds a focused range — ${products.map((p) => p.name).join(", ").replace(/, ([^,]*)$/, " and $1")}.` },
  { tag: "Trust", title: "Supplying leading manufacturers", text: "Long-term buyers include chemical companies such as Jubilant Ingrevia, Alkyl Amines and Balaji Amines, breweries, and cattle-feed brands." },
  { tag: "Today", title: "The next generation", text: `Now run by ${company.runBy}, the company serves chemical, pharmaceutical, petroleum, beverage and cattle-feed industries across India.` },
];

const MV: { icon: IconName; title: string; text: string }[] = [
  { icon: "target", title: "Our mission", text: "To supply industry with consistent, specification-ready ethanol, alcohol and molasses — on time, with complete documentation and honest dealing." },
  { icon: "eye", title: "Our vision", text: "To be a leading trading partner in India's green-energy value chain, growing alongside our customers as ethanol's role in industry and fuel expands." },
  { icon: "heart", title: "Our values", text: "Integrity in every transaction, reliability in every delivery, and long-term relationships over one-time deals." },
];

export default function AboutPage() {
  const years = new Date().getFullYear() - company.founded;
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        image="/media/sugarcane-field.jpg"
        title={`Connecting Maharashtra's sugar belt with Indian industry — since ${company.founded}.`}
        lead={`${company.name} is a Baramati-based B2B trading company supplying ethanol, alcohol and molasses to manufacturers across India.`}
      />

      <section className="section">
        <div className="container about-grid">
          <div className="about-visual photo reveal reveal-clip">
            <span className="about-visual-inner" data-parallax="0.1">
              <Image src="/media/sugarcane-transport.jpg" alt="Sugarcane being carried from the field to the factory" fill sizes="(max-width: 980px) 100vw, 560px" />
            </span>
            <div className="logo-chip"><Image src="/img/logo-256.png" alt="Mahalakshmi Tradings logo" width={56} height={56} /></div>
            <div className="loc"><Icon name="pin" />{company.address.city}, {company.address.state}</div>
            <div className="since"><strong>{company.founded}</strong><span>Year established</span></div>
          </div>
          <div className="reveal reveal-d1">
            <span className="kicker">Who we are</span>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,42px)" }}>A focused trader of green-energy raw materials</h2>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>
              Founded in {company.founded} by <strong style={{ color: "var(--ink)" }}>{company.founder}</strong>, {company.name} began as a trading business rooted in
              Baramati — one of Maharashtra&apos;s most important sugarcane regions. Over the years it has grown into a trusted supplier for chemical,
              pharmaceutical, petroleum, beverage and cattle-feed manufacturers across India.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>
              We specialise in four products from the sugar and ethanol value chain, so our customers deal with a partner who understands the material,
              the specifications and the paperwork that comes with it.
            </p>
            <ul className="check-list">
              {products.map((p) => (
                <li key={p.id}><Icon name="check" /><span><strong>{p.name}</strong> — {p.menuNote.toLowerCase()}</span></li>
              ))}
            </ul>
            <Link className="btn btn-primary" href="/products">Explore our products <Icon name="arrow-right" /></Link>
          </div>
        </div>
      </section>

      <section className="stats" style={{ marginTop: 0 }} aria-label="Company at a glance">
        <div className="container">
          <div className="stats-grid reveal">
            <div className="stat"><span className="s-ico"><Icon name="award" /></span><div><Counter to={Math.floor(years / 5) * 5} suffix="+" /><span>Years in trading</span></div></div>
            <div className="stat"><span className="s-ico"><Icon name="layers" /></span><div><Counter to={products.length} /><span>Core products</span></div></div>
            <div className="stat"><span className="s-ico"><Icon name="factory" /></span><div><Counter to={industries.length} /><span>Industries served</span></div></div>
            <div className="stat"><span className="s-ico"><Icon name="globe" /></span><div><strong>Pan-India</strong><span>Supply network</span></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid" style={{ alignItems: "start" }}>
          <div className="reveal">
            <span className="kicker">Our journey</span>
            <h2 style={{ fontSize: "clamp(28px,3.2vw,38px)" }}>How the business has grown</h2>
            <p style={{ color: "var(--muted)" }}>From a local trading business in Baramati to a supplier trusted by listed chemical companies and national feed brands.</p>
          </div>
          <div className="timeline reveal reveal-d1">
            {TIMELINE.map((t) => (
              <div className="tl-item" key={t.title}><strong>{t.tag}</strong><h3>{t.title}</h3><p>{t.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark has-bg">
        <div className="section-bg" data-parallax="0.25">
          <LazyVideo src="/media/lab-quality.mp4" poster="/media/lab-quality.jpg" />
        </div>
        <div className="container">
          <SectionHead center kicker="What drives us" title="Mission, vision & values" />
          <div className="mv-grid">
            {MV.map((m, i) => (
              <div className={`mv-card reveal${i ? ` reveal-d${i}` : ""}`} key={m.title}>
                <div className="w-ico"><Icon name={m.icon} /></div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead kicker="Leadership" title="The people behind the business" />
          <div className="people">
            <div className="person reveal">
              <div className="avatar">RS</div>
              <div>
                <h3>{company.founder}</h3>
                <div className="role">Founder</div>
                <p>Founded {company.name} in {company.founded} and built its relationships across the sugar and distillery industry.</p>
              </div>
            </div>
            <div className="person reveal reveal-d1">
              <div className="avatar g">{company.runBy[0]}</div>
              <div>
                <h3>{company.runBy}</h3>
                <div className="role">Runs the business today</div>
                <p>Leads day-to-day operations, customer relationships and supply across India.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
