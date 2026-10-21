"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/*
  One rAF-throttled scroll loop for every scroll-linked effect on the page:
    data-parallax="0.3"   translateY by (viewport centre − parent centre) × speed.
                          Positive = lags behind the scroll (background), negative = moves ahead (foreground).
    data-scroll-x="-0.4"  same idea on the X axis (scroll-driven text strips).
    data-fade-out         fades and drifts down as the page scrolls past the first screen (hero copy).
    data-hscroll          pinned horizontal gallery: the section is made tall enough that scrolling it
                          vertically slides .hscroll-track sideways (desktop only; otherwise a swipe carousel).
  The parent's rect is measured (not the element's) so the transform never feeds back into itself.
  Everything is skipped when the visitor prefers reduced motion.
*/
export function MotionController() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const sliders = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-x]"));
    const fades = Array.from(document.querySelectorAll<HTMLElement>("[data-fade-out]"));
    const pins = Array.from(document.querySelectorAll<HTMLElement>("[data-hscroll]")).map((section) => ({
      section,
      sticky: section.querySelector<HTMLElement>(".hscroll-sticky")!,
      track: section.querySelector<HTMLElement>(".hscroll-track")!,
      bar: section.querySelector<HTMLElement>(".hscroll-bar span"),
      imgs: Array.from(section.querySelectorAll<HTMLElement>(".hpanel-img")),
      dist: 0,
    }));
    const desktop = window.matchMedia("(min-width: 981px)");
    let raf = 0;

    const layoutPins = () => {
      for (const pin of pins) {
        if (!desktop.matches) {
          pin.section.classList.remove("is-pinned");
          pin.section.style.height = "";
          pin.track.style.transform = "";
          pin.imgs.forEach((im) => (im.style.transform = ""));
          continue;
        }
        pin.section.classList.add("is-pinned");
        pin.dist = Math.max(pin.track.scrollWidth - pin.sticky.clientWidth, 0);
        pin.section.style.height = `${pin.sticky.offsetHeight + pin.dist}px`;
      }
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const vc = vh / 2;

      for (const el of parallax) {
        const r = (el.parentElement ?? el).getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const y = (vc - (r.top + r.height / 2)) * Number(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      }
      for (const el of sliders) {
        const r = (el.parentElement ?? el).getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const x = (vc - (r.top + r.height / 2)) * Number(el.dataset.scrollX);
        el.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      }
      if (desktop.matches) {
        const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
        for (const pin of pins) {
          const r = pin.section.getBoundingClientRect();
          const span = pin.section.offsetHeight - pin.sticky.offsetHeight;
          const p = span > 0 ? Math.min(Math.max((headerH - r.top) / span, 0), 1) : 0;
          pin.track.style.transform = `translate3d(${(-p * pin.dist).toFixed(1)}px, 0, 0)`;
          if (pin.bar) pin.bar.style.transform = `scaleX(${p})`;
          const vw = window.innerWidth;
          for (const im of pin.imgs) {
            const b = (im.parentElement as HTMLElement).getBoundingClientRect();
            const off = (vw / 2 - (b.left + b.width / 2)) * 0.12;
            im.style.transform = `translate3d(${off.toFixed(1)}px, 0, 0)`;
          }
        }
      }

      const y = window.scrollY;
      for (const el of fades) {
        const p = Math.min(y / (vh * 0.85), 1);
        el.style.opacity = String(1 - p * 0.9);
        el.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0)`;
      }
      const max = document.documentElement.scrollHeight - vh;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      layoutPins();
      onScroll();
    };
    layoutPins();
    update();
    // Images can change the track width once they load, so re-measure then too.
    const ro = new ResizeObserver(onResize);
    pins.forEach((pin) => ro.observe(pin.track));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cancelAnimationFrame(raf);
      pins.forEach((pin) => {
        pin.section.classList.remove("is-pinned");
        pin.section.style.height = "";
      });
    };
  }, [pathname]);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}

/**
 * Background video that downloads and plays only while on screen (or immediately when `eager`).
 * Shows `poster` until then, and permanently for reduced-motion visitors.
 */
export function LazyVideo({
  src, mobileSrc, poster, eager = false, className,
}: { src: string; mobileSrc?: string; poster: string; eager?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | undefined>();

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pick = mobileSrc && window.matchMedia("(max-width: 720px)").matches ? mobileSrc : src;

    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          setSource((s) => s ?? pick);
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: eager ? "0px" : "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, mobileSrc, eager]);

  useEffect(() => {
    if (source) ref.current?.play().catch(() => {});
  }, [source]);

  return (
    <video
      ref={ref}
      className={className}
      src={source}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!!source}
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
