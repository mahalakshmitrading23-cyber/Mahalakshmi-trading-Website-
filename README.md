# Mahalakshmi Tradings — Website

B2B website for Mahalakshmi Tradings (Baramati), a trader of Denatured Anhydrous Ethanol, Special Denatured Spirit, Extra Neutral Alcohol and Molasses.

Built with **Next.js 16 (App Router) + React 19 + TypeScript**. Pages are pre-rendered to static HTML for speed and SEO. One server route (`/api/enquiry`) emails enquiries.

## Images, video & animation

- Photos and videos live in `public/media/`. Product photos are set per product in `lib/site.ts` (`image`, `imageAlt`).
- They are free-licence stock (Wikimedia Commons, Mixkit). Several licences require attribution, which is listed on `/credits` from `lib/credits.ts`. If you replace a file with the client's own photo, remove its entry there.
- Videos below the first screen only download when scrolled into view; phones get a smaller hero video.
- Scroll effects are driven by `components/Motion.tsx` using data attributes: `data-parallax="0.3"` (vertical parallax), `data-scroll-x` (sideways text strip) and `data-fade-out` (hero). They switch off for visitors who have "reduce motion" turned on.

## Getting started

```sh
npm install
cp .env.example .env.local   # then fill in SMTP_PASS (see "Email setup")
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`.

## Project layout

```
app/
  page.tsx                 Home
  about/ products/ clients/ quote/ contact/   Pages
  products/[slug]/         One page per product (generated from lib/site.ts)
  api/enquiry/route.ts     Enquiry API: validate → email business + acknowledge buyer
  sitemap.ts, robots.ts    SEO
  globals.css              All styles (brand colours at the top)
components/
  Header, Footer           Shared on every page
  Sections.tsx             Page hero, CTA band, product card, product detail, clients, industries
  EnquiryForm.tsx          Quote form (full) and Contact form (short)
  Icon.tsx, Effects.tsx    Icons; scroll-reveal and counters
lib/
  site.ts                  ← Business details, products, clients, industries. Edit content here.
  enquiry.ts               Validation and message formatting shared by browser and server
  mailer.ts                Email templates and SMTP sending
```

**To change content** (phone numbers, products, specs, clients), edit `lib/site.ts`. Every page, the menus, the footer, the forms and the emails update from it.

## How enquiries work

Both the **Quote** page and the **Contact** page have two buttons:

| Button | What happens |
|---|---|
| **Send Enquiry** | The form posts to `/api/enquiry`. The server validates it and emails the business (`ENQUIRY_TO`), with Reply-To set to the buyer and one-tap *Call / WhatsApp / Reply* buttons. If the buyer gave an email address, they also get an acknowledgement copy. |
| **Send on WhatsApp** | Opens WhatsApp (`wa.me/919323289696`) with the enquiry already typed for the buyer to send. A copy is also emailed to the business in the background, so no lead is lost. |

Protection: server-side validation, a hidden honeypot field for bots, and a limit of 5 enquiries per IP per 10 minutes. If email sending fails, the buyer sees an error with WhatsApp and phone fallbacks.

`/quote?product=dae|sds|ena|molasses` pre-selects a product. All "Get Quote" buttons use this.

## Email setup (Gmail)

1. Sign in to `mahalaxmitrading0101@gmail.com` and turn on **2-Step Verification**.
2. Create an **App Password** at https://myaccount.google.com/apppasswords.
3. Put it in `SMTP_PASS` (in `.env.local` locally, or in the hosting provider's environment variables).

Any other SMTP provider (Zoho, Outlook, Brevo, Amazon SES) works too. Change `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS`.

Until SMTP is configured, **Send Enquiry** shows a friendly error that points buyers to WhatsApp and phone. The WhatsApp button always works.

## Deploying (Vercel, recommended)

1. Push this repo to GitHub and import it at https://vercel.com/new.
2. Add the variables from `.env.example` under *Settings → Environment Variables*. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
3. Deploy, then add the custom domain.

Any Node.js host also works (`npm run build && npm start`).
