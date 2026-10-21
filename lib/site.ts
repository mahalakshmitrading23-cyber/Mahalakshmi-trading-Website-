import type { IconName } from "@/components/Icon";

/* Single source of truth for business details and product content.
   Edit here and every page, the footer, the enquiry form and the API update together. */

export const company = {
  name: "Mahalakshmi Tradings",
  tagline: "Growing with green energy",
  founded: 2010,
  founder: "Ratanraj Ganpat Salunkhe",
  runBy: "Prathmesh",
  gstin: "27BQJPS3525C1ZU",
  email: "mahalaxmitrading0101@gmail.com",
  phones: [
    { display: "+91 93232 89696", tel: "+919323289696" },
    { display: "+91 94058 47621", tel: "+919405847621" },
  ],
  whatsapp: { display: "+91 93232 89696", number: "919323289696" },
  address: { line1: "Deshpande Estate", city: "Baramati", state: "Maharashtra", country: "India" },
  mapQuery: "Deshpande Estate, Baramati, Maharashtra",
  googleLinks: {
    location: "https://share.google/w4FeGLxve9zVTQhGo",
    profile: "https://share.google/7Dx5qEqYldFos1dHY",
  },
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function waLink(text?: string) {
  return `https://wa.me/${company.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export type ProductId = "dae" | "sds" | "ena" | "molasses";

export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  short: string;
  code: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  tagline: string;
  cardText: string;
  cardSpecs: [string, string][];
  chips: string[];
  lead: string;
  simple: string;
  detail: string;
  applications: { icon: IconName; title: string; text: string }[];
  buyers: string[];
  specs: [string, string][];
  highlight?: boolean;
  menuNote: string;
};

export const products: Product[] = [
  {
    id: "dae",
    image: "/media/product-dae.jpg",
    imageAlt: "Ethanol plant with large steel storage tanks",
    slug: "denatured-anhydrous-ethanol",
    name: "Denatured Anhydrous Ethanol",
    short: "DAE",
    code: "DAE · HSN 22072000",
    icon: "drop",
    tagline: "Our main product",
    menuNote: "99.9% purity · HSN 22072000",
    highlight: true,
    cardText:
      "Ethanol with virtually all water removed, then denatured so it can only be used industrially. A high-purity feedstock and solvent for chemical and pharma plants.",
    cardSpecs: [["Purity", "99.9%"], ["Supply", "Bulk · Pan-India"]],
    chips: ["Chemical synthesis", "Industrial solvent", "Pharma processing", "Fuel blending"],
    lead: "Ethanol that is 99.9% pure, with virtually all water removed — and denatured so it is suitable only for industrial use.",
    simple:
      "Regular ethanol contains some water. Anhydrous means “without water”, so this grade is almost pure ethanol. Denatured means a small amount of an additive has been mixed in to make it undrinkable, which allows it to be traded and used as an industrial chemical.",
    detail:
      "Manufacturers choose anhydrous ethanol when water content matters — in chemical reactions, as a high-grade solvent, and in fuel-grade applications. It is a core raw material for many of India's chemical and pharmaceutical producers.",
    applications: [
      { icon: "chemical", title: "Chemical synthesis", text: "Feedstock for producing ethyl-based chemicals and intermediates." },
      { icon: "flask", title: "Industrial solvent", text: "High-purity solvent for extraction, processing and formulations." },
      { icon: "pill", title: "Pharmaceutical processing", text: "Used as a process solvent in drug manufacturing." },
      { icon: "fuel", title: "Fuel & petroleum", text: "Fuel-grade ethanol for blending applications." },
    ],
    buyers: ["Chemical manufacturers", "Pharmaceutical companies", "Petroleum & fuel sector", "Solvent users"],
    specs: [
      ["Purity", "99.9%"],
      ["HSN code", "2207 20 00"],
      ["Type", "Anhydrous, denatured"],
      ["Supply", "Bulk · Pan-India"],
      ["Specifications", "Shared on enquiry"],
    ],
  },
  {
    id: "sds",
    image: "/media/product-sds.jpg",
    imageAlt: "Laboratory flasks and test tubes holding coloured solvents",
    slug: "special-denatured-spirit",
    name: "Special Denatured Spirit",
    short: "SDS",
    code: "SDS · HSN 22072000",
    icon: "flask",
    tagline: "Industrial solvent",
    menuNote: "Industrial solvent grade",
    cardText:
      "Ethyl alcohol treated with approved denaturing agents, making it a cost-effective, versatile solvent for manufacturing and processing.",
    cardSpecs: [["Type", "Denatured spirit"], ["Specification", "As per requirement"]],
    chips: ["Solvents", "Paints & coatings", "Printing inks", "Chemicals"],
    lead: "Ethyl alcohol treated with approved denaturing agents — a cost-effective, versatile solvent for manufacturing.",
    simple:
      "Special Denatured Spirit (SDS) is alcohol that has been made unfit for drinking by adding specific denaturants. This lets industries use it freely as a solvent and processing chemical.",
    detail:
      "The type of denaturant can differ depending on how the spirit will be used. Share your specification or end use with us and we will confirm the grade available for your requirement.",
    applications: [
      { icon: "flask", title: "Industrial solvent", text: "General-purpose solvent across manufacturing processes." },
      { icon: "layers", title: "Paints, coatings & inks", text: "Thinner and solvent for varnishes, lacquers and printing inks." },
      { icon: "chemical", title: "Chemical manufacturing", text: "Process solvent and raw material in chemical plants." },
      { icon: "shield", title: "Cleaning & preparation", text: "Industrial cleaning and surface-preparation uses." },
    ],
    buyers: ["Chemical plants", "Paint & coating makers", "Ink manufacturers", "Industrial processors"],
    specs: [
      ["Product", "Denatured ethyl alcohol"],
      ["HSN code", "2207 20 00"],
      ["Grade", "As per requirement"],
      ["Supply", "Bulk · Pan-India"],
      ["Specifications", "Shared on enquiry"],
    ],
  },
  {
    id: "ena",
    image: "/media/product-ena.jpg",
    imageAlt: "Multi-column distillation towers at a distillery",
    slug: "extra-neutral-alcohol",
    name: "Extra Neutral Alcohol",
    short: "ENA",
    code: "ENA",
    icon: "bottle",
    tagline: "High-purity spirit",
    menuNote: "High-purity neutral spirit",
    cardText:
      "A highly refined ethyl alcohol with no residual taste or odour — the base spirit for alcoholic beverages and an ingredient in pharma and cosmetic formulations.",
    cardSpecs: [["Grade", "High-purity neutral"], ["Buyers", "Licensed only"]],
    chips: ["Beverages", "Pharmaceuticals", "Perfumery"],
    lead: "A highly refined ethyl alcohol with no residual taste or smell — the base spirit for beverages and an ingredient in pharma and cosmetics.",
    simple:
      "Extra Neutral Alcohol (ENA) is alcohol that has been distilled and purified until it is “neutral” — it carries no flavour or odour of its own. That makes it the starting point for many alcoholic drinks and a clean ingredient for formulated products.",
    detail: "ENA is a regulated product. We supply it to licensed buyers, subject to the applicable state excise permits.",
    applications: [
      { icon: "glass", title: "Alcoholic beverages", text: "Base spirit for licensed liquor producers and breweries." },
      { icon: "pill", title: "Pharmaceuticals", text: "Used in syrups, tinctures and other formulations." },
      { icon: "drop", title: "Perfumery & cosmetics", text: "Carrier for fragrances and personal-care products." },
      { icon: "flask", title: "Flavours & extracts", text: "Neutral base for flavour and extract preparation." },
    ],
    buyers: ["Breweries & distillers", "Liquor bottlers", "Pharma companies", "Fragrance makers"],
    specs: [
      ["Product", "Extra Neutral Alcohol"],
      ["Grade", "High-purity, neutral"],
      ["Buyers", "Licensed buyers only"],
      ["Supply", "Bulk · Pan-India"],
      ["Specifications", "Shared on enquiry"],
    ],
  },
  {
    id: "molasses",
    image: "/media/product-molasses.jpg",
    imageAlt: "Thick dark molasses pouring from a spoon",
    slug: "molasses",
    name: "Molasses",
    short: "Molasses",
    code: "Cane molasses",
    icon: "cane",
    tagline: "Sugarcane by-product",
    menuNote: "Sugarcane by-product",
    cardText:
      "The thick, sugar-rich syrup left after sugar is extracted from cane. A key fermentation feedstock for distilleries and an energy ingredient in cattle feed.",
    cardSpecs: [["Source", "Sugarcane"], ["Supply", "Bulk · Pan-India"]],
    chips: ["Distilleries", "Cattle feed", "Fermentation"],
    lead: "The thick, dark, sugar-rich syrup left after sugar is extracted from sugarcane juice.",
    simple:
      "When sugar mills turn cane juice into sugar crystals, the syrup that remains is molasses. It is still full of fermentable sugars, which makes it valuable for distilleries — and its energy content and taste make it a popular ingredient in cattle feed.",
    detail: "Baramati sits in the heart of Maharashtra's sugarcane belt, keeping us close to the mills where molasses is produced.",
    applications: [
      { icon: "tank", title: "Distillery feedstock", text: "Fermented to produce ethanol and ENA." },
      { icon: "wheat", title: "Cattle feed", text: "Energy source, palatability enhancer and pellet binder." },
      { icon: "flask", title: "Fermentation industries", text: "Raw material for yeast and other fermentation processes." },
      { icon: "leaf", title: "Agro industries", text: "Used across agro-based processing applications." },
    ],
    buyers: ["Distilleries", "Cattle-feed manufacturers", "Agro companies"],
    specs: [
      ["Source", "Sugarcane"],
      ["Grade", "As per requirement"],
      ["Origin", "Maharashtra sugar belt"],
      ["Supply", "Bulk · Pan-India"],
      ["Specifications", "Shared on enquiry"],
    ],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);
export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export type ClientGroup = {
  title: string;
  sub: string;
  icon: IconName;
  clients: { name: string; initials: string; sector: string }[];
};

export const clientGroups: ClientGroup[] = [
  {
    title: "Ethanol",
    sub: "Chemical & pharmaceutical",
    icon: "drop",
    clients: [
      { name: "Jubilant Ingrevia Ltd.", initials: "JI", sector: "Chemicals" },
      { name: "Alkyl Amines Ltd.", initials: "AA", sector: "Chemicals" },
      { name: "Balaji Amines Ltd.", initials: "BA", sector: "Chemicals" },
      { name: "Accordd Organics Pvt. Ltd.", initials: "AO", sector: "Chemicals" },
      { name: "Laxmi Organics", initials: "LO", sector: "Chemicals" },
      { name: "SHK Chemtech", initials: "SC", sector: "Chemicals" },
    ],
  },
  {
    title: "Alcohol",
    sub: "Beverages",
    icon: "bottle",
    clients: [
      { name: "GM Breweries", initials: "GM", sector: "Beverages" },
      { name: "Tango India", initials: "TI", sector: "Beverages" },
    ],
  },
  {
    title: "Molasses",
    sub: "Cattle feed & agro",
    icon: "cane",
    clients: [
      { name: "Godrej Cattle Feed", initials: "GC", sector: "Animal feed" },
      { name: "Amul Cattle Feed", initials: "AC", sector: "Animal feed" },
      { name: "Kanhaiyya Agro", initials: "KA", sector: "Agro" },
    ],
  },
];

export const allClients = clientGroups.flatMap((g) => g.clients.map((c) => ({ ...c, product: g.title })));

export const industries: { icon: IconName; title: string; text: string; short: string; products: string; image: string }[] = [
  { icon: "chemical", title: "Chemical", text: "Feedstock and process solvent for speciality and bulk chemical makers.", short: "Feedstock and process solvent.", products: "DAE · SDS", image: "/media/product-sds.jpg" },
  { icon: "pill", title: "Pharmaceutical", text: "High-purity alcohol for extraction, synthesis and formulation.", short: "High-purity alcohol for processing.", products: "DAE · ENA", image: "/media/lab-quality.jpg" },
  { icon: "fuel", title: "Petroleum & Fuel", text: "Anhydrous ethanol for fuel-grade and blending applications.", short: "Fuel-grade anhydrous ethanol.", products: "DAE", image: "/media/hero-refinery.jpg" },
  { icon: "glass", title: "Beverage", text: "Neutral base spirit for licensed alcoholic-beverage producers.", short: "Neutral base spirit for licensed producers.", products: "ENA", image: "/media/product-ena.jpg" },
  { icon: "wheat", title: "Cattle Feed & Agro", text: "Molasses as an energy source and binder in animal feed.", short: "Energy ingredient and binder.", products: "Molasses", image: "/media/industry-cattle.jpg" },
];

export const quantityUnits = ["KL", "Litres", "MT", "Tankers"] as const;
export const requirementTypes = ["One-time order", "Monthly requirement", "Annual / contract supply"] as const;
