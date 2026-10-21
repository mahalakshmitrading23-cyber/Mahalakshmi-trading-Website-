import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RevealObserver } from "@/components/Effects";
import { MotionController } from "@/components/Motion";
import { company, products, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahalakshmi Tradings | Bulk Ethanol, Alcohol & Molasses Supplier — Baramati, India",
    template: "%s | Mahalakshmi Tradings",
  },
  description:
    "Mahalakshmi Tradings is a B2B trader (since 2010) supplying Denatured Anhydrous Ethanol (99.9%), Special Denatured Spirit, Extra Neutral Alcohol and Molasses to chemical, pharma, petroleum, beverage and cattle-feed manufacturers across India.",
  keywords: [
    "denatured anhydrous ethanol supplier", "special denatured spirit", "extra neutral alcohol supplier", "ENA",
    "molasses supplier", "ethanol trader Maharashtra", "Baramati", "HSN 22072000",
  ],
  openGraph: {
    type: "website",
    siteName: company.name,
    title: "Mahalakshmi Tradings — Ethanol, Alcohol & Molasses for Industry",
    description: "B2B supplier of Denatured Anhydrous Ethanol (99.9%), SDS, ENA and Molasses. Pan-India supply since 2010.",
    images: ["/img/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahalakshmi Tradings — Bulk Ethanol, Alcohol & Molasses",
    description: "B2B supplier of Denatured Anhydrous Ethanol (99.9%), SDS, ENA and Molasses. Pan-India supply since 2010.",
    images: ["/img/logo.png"],
  },
};

export const viewport: Viewport = { themeColor: "#17191c" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  slogan: company.tagline,
  foundingDate: String(company.founded),
  url: siteUrl,
  logo: `${siteUrl}/img/logo.png`,
  email: company.email,
  telephone: company.phones[0].tel,
  taxID: company.gstin,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.line1,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    addressCountry: "IN",
  },
  areaServed: "IN",
  makesOffer: products.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: p.name } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <MotionController />
      </body>
    </html>
  );
}
