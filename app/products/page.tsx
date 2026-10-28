import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CtaBand, PageHero, ProductShowcase, SectionHead } from "@/components/Sections";
import { company, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — Denatured Anhydrous Ethanol, SDS, ENA & Molasses",
  description:
    "Denatured Anhydrous Ethanol (99.9%, HSN 22072000), Special Denatured Spirit, Extra Neutral Alcohol and Molasses — applications, buyers and key details. Bulk B2B supply across India.",
};

const FAQ = [
  { q: "Do you sell to individuals or in small quantities?", a: `No. ${company.name} is a B2B supplier. We supply in bulk to registered businesses and manufacturers only.` },
  { q: "What information do you need for a quotation?", a: "The product, required quantity, any specification or grade requirement, your delivery location and your company details. The quote form collects all of this in one go.", link: true },
  { q: "Can I enquire for more than one product at a time?", a: "Yes. You can select multiple products in a single enquiry and we will quote for all of them together." },
  { q: "Which areas do you supply?", a: "We supply across India. Delivery terms are confirmed with each quotation based on your location and quantity." },
  { q: "Do you supply ENA to any buyer?", a: "Extra Neutral Alcohol is a regulated product and is supplied only to licensed buyers, subject to applicable state excise permits." },
  { q: "Do you display prices online?", a: "Prices depend on quantity, specification, delivery location and market conditions, so we share them in a quotation rather than on the website." },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Products" }]}
        image="/media/ethanol-plant-aerial.jpg"
        title="Our products"
        lead="Four industrial raw materials from the sugar and ethanol chain, explained simply, with the details procurement teams need."
      />

      <section className="section showcase-section">
        <div className="container">
          <ProductShowcase />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container faq-wrap">
          <div className="faq-side">
            <SectionHead kicker="Buyer FAQs" title="Common questions before ordering" lead="Still unsure? Ask us directly. We usually reply fastest on WhatsApp." />
            <a className="btn btn-dark" href={waLink(`Hello ${company.name}, I have a question about your products.`)} target="_blank" rel="noopener"><Icon name="whatsapp" />Ask on WhatsApp</a>
          </div>
          <div className="faq reveal">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<Icon name="plus" /></summary>
                <p>{f.a}{f.link && <> <Link className="link-arrow" href="/quote">Open the quote form <Icon name="arrow-right" /></Link></>}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
