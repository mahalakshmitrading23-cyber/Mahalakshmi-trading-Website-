import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { CtaBand, IndustryGrid, Monogram, PageHero, SectionHead } from "@/components/Sections";
import { clientGroups, company } from "@/lib/site";

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
        lead="From listed chemical companies to breweries and national cattle-feed brands — here are some of the businesses we supply."
      />

      <section className="section">
        <div className="container">
          <div className="client-groups">
            {clientGroups.map((g, gi) => (
              <div className={`client-group reveal${gi ? ` reveal-d${gi}` : ""}`} key={g.title}>
                <div className="client-group-head">
                  <span className="pc-ico"><Icon name={g.icon} /></span>
                  <div><h3>{g.title}</h3><small>{g.sub}</small></div>
                </div>
                <ul className="client-list">
                  {g.clients.map((c, i) => (
                    <li key={c.name}><Monogram initials={c.initials} i={i} /><div><strong>{c.name}</strong><small>{c.sector}</small></div></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead center kicker="Industries served" title="Where our products go to work" />
          <IndustryGrid brief />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
