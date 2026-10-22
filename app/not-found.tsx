import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ padding: "110px 0 120px" }}>
      <div className="container">
        <span className="kicker">Error 404</span>
        <h1>This page could not be found.</h1>
        <p style={{ marginBottom: 28 }}>The link may be old or mistyped. Try our products or send us your requirement directly.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/products">View products <Icon name="arrow-right" /></Link>
          <Link className="btn btn-ghost-light" href="/quote">Request a Quote</Link>
        </div>
      </div>
    </section>
  );
}
