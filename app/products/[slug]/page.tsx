import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { CtaBand, PageHero, ProductDetail } from "@/components/Sections";
import { company, productBySlug, products, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} Supplier — Bulk B2B Supply in India`,
    description: `${p.lead} ${company.name}, Baramati — bulk supply across India. Request a quotation.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  const others = products.filter((o) => o.id !== p.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.lead,
    category: "Industrial raw material",
    brand: { "@type": "Organization", name: company.name },
    url: `${siteUrl}/products/${p.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero crumbs={[{ href: "/products", label: "Products" }, { label: p.name }]} title={p.name} lead={p.cardText} image={p.image} />
      <ProductDetail p={p} />

      <section className="section section-soft">
        <div className="container">
          <h2 className="reveal" style={{ fontSize: 26, marginBottom: 24 }}>Other products we supply</h2>
          <div className="other-products">
            {others.map((o, i) => (
              <Link key={o.id} href={`/products/${o.slug}`} className={`other-product reveal${i ? ` reveal-d${i}` : ""}`}>
                <span className="pc-ico"><Icon name={o.icon} /></span>
                <span><strong>{o.name}</strong><small>{o.menuNote}</small></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
