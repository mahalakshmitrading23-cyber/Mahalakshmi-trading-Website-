import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import { mediaCredits } from "@/lib/credits";

export const metadata: Metadata = {
  title: "Image & Video Credits",
  robots: { index: false },
};

export default function CreditsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Credits" }]} title="Image, video & map credits" lead="Photos, videos and map data on this website are used under the licences listed below." />
      <section className="section">
        <div className="container">
          <ul className="credits-list">
            {mediaCredits.map((c) => (
              <li key={c.file}>
                <strong>{c.title}</strong>
                <span>
                  by {c.author} ·{" "}
                  {c.licenseUrl ? <a href={c.licenseUrl} target="_blank" rel="noopener license">{c.license}</a> : c.license} ·{" "}
                  <a href={c.source} target="_blank" rel="noopener">Source</a>
                </span>
              </li>
            ))}
          </ul>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 24 }}>Photos were resized and compressed for the web.</p>
        </div>
      </section>
    </>
  );
}
