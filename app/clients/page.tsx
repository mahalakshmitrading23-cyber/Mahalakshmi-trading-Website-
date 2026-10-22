import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { CtaBand, IndustryGrid, PageHero, SectionHead } from "@/components/Sections";
import { allClients, clientGroups, company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Clients",
  description: `${company.name} supplies ethanol, alcohol and molasses to Jubilant Ingrevia, Alkyl Amines, Balaji Amines, Laxmi Organics, GM Breweries, Godrej and Amul cattle feed and more.`,
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Clients" }]}
        image="/media/product-ena.jpg"
        title="Trusted by leading Indian manufacturers"
        lead="From listed chemical companies to breweries and national cattle-feed brands. Here are some of the businesses we supply."
      />

      <section className="section">
        <div className="container">
          <div className="book-head reveal">
            <SectionHead kicker="Our order book" title="Who buys what from us" lead="Grouped by the product they buy. Most of these are repeat buyers." />
            <div className="book-total"><strong>{allClients.length}+</strong><span>manufacturers across {clientGroups.length} product lines</span></div>
          </div>
          <div className="book">
            {clientGroups.map((g, gi) => (
              <div className={`book-row reveal${gi ? ` reveal-d${gi}` : ""}`} key={g.title}>
                <div className="book-group">
                  <span className="pc-ico"><Icon name={g.icon} /></span>
                  <div>
                    <h3>{g.title}</h3>
                    <small>{g.sub} · {g.clients.length} {g.clients.length === 1 ? "buyer" : "buyers"}</small>
                  </div>
                </div>
                <ul className="book-names">
                  {g.clients.map((c) => (
                    <li key={c.name}><strong>{c.name}</strong><small>{c.sector}</small></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead kicker="Industries served" title="Where our products go to work" lead="Five industries buy from us. Hover a tile to see which products each one uses." />
          <IndustryGrid brief />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
