"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { company, products, waLink } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products", dropdown: true },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <span className="b2b-pill">B2B Supply Only</span>
            <a href={`tel:${company.phones[0].tel}`}><Icon name="phone" />{company.phones[0].display}</a>
            <a className="hide-md" href={`mailto:${company.email}`}><Icon name="mail" />{company.email}</a>
          </div>
          <div className="topbar-right">
            <span>GSTIN: {company.gstin}</span>
            <a href={waLink()} target="_blank" rel="noopener"><Icon name="whatsapp" />WhatsApp</a>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <Brand />
          <nav className="nav" aria-label="Main">
            {LINKS.map((l) =>
              l.dropdown ? (
                <div key={l.href} className={`nav-drop${isActive(l.href) ? " active" : ""}`}>
                  <Link href={l.href} className="nav-drop-btn" aria-haspopup="true">
                    {l.label} <Icon name="chevron-down" />
                  </Link>
                  <div className="dropdown">
                    {products.map((p) => (
                      <Link key={p.id} href={`/products/${p.slug}`}>
                        <span className="d-ico"><Icon name={p.icon} /></span>
                        <span><strong>{p.name}</strong><small>{p.menuNote}</small></span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : undefined} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              ),
            )}
          </nav>
          <div className="header-cta">
            <a className="btn btn-outline btn-sm btn-call" href={`tel:${company.phones[0].tel}`}><Icon name="phone" />Call</a>
            <Link className="btn btn-primary btn-sm btn-quote" href="/quote">Request a Quote</Link>
            <button ref={toggleRef} className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${open ? " open" : ""}`} aria-hidden={!open} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <div className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-panel-head">
            <Brand compact />
            <button ref={closeRef} className="menu-toggle" style={{ display: "grid" }} type="button" aria-label="Close menu" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}>
              <Icon name="x" />
            </button>
          </div>
          {LINKS.map((l) => (
            <div key={l.href}>
              <Link className={`m-link${isActive(l.href) ? " active" : ""}`} href={l.href} style={{ display: "block" }}>{l.label}</Link>
              {l.dropdown && (
                <div className="m-sub">
                  {products.map((p) => <Link key={p.id} href={`/products/${p.slug}`}>{p.name}</Link>)}
                </div>
              )}
            </div>
          ))}
          <div className="m-actions">
            <Link className="btn btn-primary btn-block" href="/quote">Request a Quote</Link>
            <a className="btn btn-whatsapp btn-block" href={waLink()} target="_blank" rel="noopener"><Icon name="whatsapp" />WhatsApp Us</a>
          </div>
        </div>
      </div>
    </>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label={`${company.name} — home`}>
      <Image src="/img/logo-256.png" alt={compact ? "" : `${company.name} logo`} width={50} height={50} priority />
      <span className="brand-text">
        <span className="brand-name">Mahalakshmi <span>Tradings</span></span>
        {!compact && <span className="brand-tag"><Icon name="leaf" />{company.tagline}</span>}
      </span>
    </Link>
  );
}
