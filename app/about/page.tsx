import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { LazyVideo } from "@/components/Motion";
import { CtaBand, PageHero, SectionHead, VideoBand } from "@/components/Sections";
import { company, products } from "@/lib/site";

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

const RULES: { title: string; text: string }[] = [
  { title: "Say what we can supply, and supply it", text: "If a grade or quantity isn't available, you hear it from us before you plan around it." },
  { title: "Paperwork goes with the tanker", text: "GST invoice on every order, and the permits a regulated product like ENA needs." },
  { title: "Repeat buyers over one-off deals", text: "Most of our work is with plants that order again. We'd like to keep it that way." },
];

export default function AboutPage() {
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
            <h2 style={{ fontSize: "clamp(30px,3.6vw,42px)" }}>A small trading house that knows its four products well</h2>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>
              <strong style={{ color: "var(--ink)" }}>{company.founder}</strong> started {company.name} in {company.founded} in Baramati, one of
              Maharashtra&apos;s biggest sugarcane regions. It began as a local trading business. Today we supply chemical, pharmaceutical, petroleum,
              beverage and cattle-feed manufacturers across India.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>
              We stick to four products from the sugar and ethanol chain. Buyers deal with people who know the material, the specs and the
              paperwork that goes with it.
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

      <VideoBand
        video="/media/logistics-truck.mp4"
        poster="/media/logistics-truck.jpg"
        kicker="Pan-India supply"
        title="From the sugar belt to plants across India"
        text="Once you confirm the order, we handle dispatch, paperwork and delivery, so the material reaches your plant when production needs it."
      />

      <section className="section">
        <div className="container journey">
          <div className="journey-side reveal">
            <span className="kicker">Our journey</span>
            <h2>How the business has grown</h2>
            <p>From a local trading business in Baramati to a supplier for listed chemical companies and national feed brands.</p>
            <figure className="journey-photo">
              <Image src="/media/sugarcane-closeup.jpg" alt="Sugarcane growing in a field near Baramati" fill sizes="(max-width: 980px) 100vw, 480px" />
              <figcaption>Cane country, Baramati</figcaption>
            </figure>
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
          <SectionHead kicker="How we work" title="Three rules we try to keep" lead="Nothing fancy. These are the things buyers tell us they value most." />
          <div className="mv-grid">
            {RULES.map((m, i) => (
              <div className={`mv-card reveal${i ? ` reveal-d${i}` : ""}`} key={m.title}>
                <span className="mv-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead kicker="Leadership" title="The people behind the business" lead="A small business on purpose. When you call, you deal with the people who run it." />
          <div className="people">
            <article className="person reveal">
              <div className="avatar" aria-hidden="true">RS</div>
              <div>
                <div className="role">Founder · since {company.founded}</div>
                <h3>{company.founder}</h3>
                <p>Started {company.name} in {company.founded} and built its contacts across the sugar mills and distilleries around Baramati.</p>
                <p className="person-note">Those relationships are still what the business runs on.</p>
              </div>
            </article>
            <article className="person reveal reveal-d1">
              <div className="avatar g" aria-hidden="true">{company.runBy.split(" ").map((w) => w[0]).join("")}</div>
              <div>
                <div className="role">Runs the business today</div>
                <h3>{company.runBy}</h3>
                <p>Handles the day-to-day: buyers, supply and dispatch.</p>
                <p className="person-note">Speak to {company.runBy} for quotes, availability and delivery.</p>
                <a className="link-arrow" href={`tel:${company.phones[0].tel}`}>Call us: {company.phones[0].display} <Icon name="arrow-right" /></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
