"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const sections = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-rule bg-paper" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
          aria-label={`${profile.name} — home`}
        >
          <span className="grid size-9 place-items-center bg-ink font-display text-[15px] font-bold text-paper transition-colors group-hover:bg-signal group-hover:text-ink">
            {profile.initials}
          </span>
          <span className="label hidden text-muted sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={onHome ? `#${s.id}` : `/#${s.id}`}
                  className={`label flex items-center gap-2 transition-colors hover:text-ink ${
                    active === s.id ? "text-ink" : "text-muted"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full bg-signal transition-opacity ${
                      active === s.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects" className={`label flex items-center hover:text-ink ${pathname.startsWith("/projects") ? "text-ink" : "text-muted"}`}>
                All projects
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-primary !h-10">
            Résumé <span aria-hidden>↗</span>
          </a>
          <button
            type="button"
            className="btn btn-secondary !h-10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="shell pb-6 lg:hidden">
          <ul className="grid gap-1 border-t border-rule pt-4">
            {[...sections.map((s) => ({ href: onHome ? `#${s.id}` : `/#${s.id}`, label: s.label })), { href: "/projects", label: "All projects" }].map(
              (item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-[28px] font-semibold"
                  >
                    <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
