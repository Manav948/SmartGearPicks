"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Menu, Search, X } from "lucide-react";
import { CATEGORY_MAP } from "@/components/ProductCard";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/catalog" },
  { label: "About", href: "/#how-we-curate" },
];
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7c6853]";

export default function Navbar() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeAll = () => {
    setCategoriesOpen(false);
    setMobileOpen(false);
    setMobileCategoriesOpen(false);
    setSearchOpen(false);
  };

  useEffect(() => {
    const sentinel = document.querySelector("[data-navbar-sentinel]");
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) closeAll();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    if (!query.trim()) {
      event.preventDefault();
      inputRef.current?.focus();
      return;
    }
    closeAll();
  };
  const active = (href: string) => href === "/" ? pathname === "/" : href === "/catalog" && pathname === "/catalog";
  const aboutHref = pathname === "/" ? "#how-we-curate" : "/#how-we-curate";
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.17, ease: "easeOut" as const };

  return (
    <>
      <div data-navbar-sentinel aria-hidden="true" className="h-px" />
      <header
        ref={headerRef}
        className={"sticky top-0 z-50 border-b transition-colors duration-200 motion-reduce:transition-none " +
          (scrolled ? "border-[#E5E1DA] bg-[#FAF8F4]" : "border-transparent bg-[#F7F6F2]")}
      >
        <nav aria-label="Main navigation" className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" onClick={closeAll} aria-label="SmartGearPicks home" className={"shrink-0 font-display text-[19px] font-semibold tracking-[-0.055em] text-[#151515] sm:text-[21px] " + FOCUS}>
            SmartGearPicks
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map(({ label, href }) => {
              const target = label === "About" ? aboutHref : href;
              return (
                <Link key={label} href={target} aria-current={active(href) ? "page" : undefined} onClick={closeAll}
                  className={"relative rounded-sm px-3 py-2 text-[13px] font-medium transition-colors hover:bg-[#F0EDE7] hover:text-[#151515] " + FOCUS + " " +
                    (active(href) ? "text-[#151515] after:absolute after:inset-x-3 after:-bottom-[13px] after:h-px after:bg-[#7c6853]" : "text-[#6B6B6B]")}>
                  {label}
                </Link>
              );
            })}
            <div className="relative">
              <button type="button" aria-expanded={categoriesOpen} aria-haspopup="true" aria-controls="desktop-category-menu"
                onClick={() => setCategoriesOpen((open) => !open)}
                className={"inline-flex items-center gap-1 rounded-sm px-3 py-2 text-[13px] font-medium text-[#6B6B6B] transition-colors hover:bg-[#F0EDE7] hover:text-[#151515] " + FOCUS}>
                Categories <ArrowDown size={13} aria-hidden="true" className={"transition-transform " + (categoriesOpen ? "rotate-180" : "")} />
              </button>
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div id="desktop-category-menu" data-lenis-prevent initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: 4 }} transition={transition}
                    className="absolute left-0 top-[calc(100%+14px)] z-50 grid max-h-[min(70vh,440px)] w-[440px] grid-cols-2 gap-x-2 gap-y-0.5 overflow-y-auto border border-[#E5E1DA] bg-[#F7F6F2] p-3 shadow-[0_12px_30px_rgba(21,21,21,0.08)]">
                    {Object.entries(CATEGORY_MAP).map(([category, label]) => (
                      <Link key={category} href={"/catalog?category=" + encodeURIComponent(category)} onClick={closeAll}
                        className={"px-3 py-2.5 text-[13px] text-[#55534f] transition-colors hover:bg-[#F0EDE7] hover:text-[#151515] " + FOCUS}>
                        {label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <button type="button" aria-label={searchOpen ? "Close product search" : "Search products"} aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              className={"grid size-10 place-items-center text-[#55534f] transition-colors hover:bg-[#F0EDE7] hover:text-[#151515] " + FOCUS}>
              {searchOpen ? <X size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
            </button>
            <Link href="/catalog" onClick={closeAll}
              className={"inline-flex h-10 items-center gap-2 bg-[#191816] px-4 text-[13px] font-medium text-[#F7F6F2] transition-colors hover:bg-[#34312c] " + FOCUS}>
              Explore Products <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button type="button" aria-label={searchOpen ? "Close product search" : "Search products"} aria-expanded={searchOpen}
              onClick={() => { setMobileOpen(false); setSearchOpen((open) => !open); }}
              className={"grid size-10 place-items-center text-[#55534f] hover:bg-[#F0EDE7] " + FOCUS}>
              {searchOpen ? <X size={19} aria-hidden="true" /> : <Search size={19} aria-hidden="true" />}
            </button>
            <button type="button" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation-menu"
              onClick={() => { setSearchOpen(false); setMobileOpen((open) => !open); }}
              className={"grid size-10 place-items-center text-[#151515] hover:bg-[#F0EDE7] " + FOCUS}>
              {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -4 }} transition={transition}
              className="border-t border-[#E5E1DA] bg-[#F7F6F2] px-4 py-3 sm:px-6 lg:px-8">
              <form action="/catalog" method="get" role="search" onSubmit={submitSearch} className="mx-auto flex max-w-7xl items-center gap-3">
                <Search size={17} aria-hidden="true" className="shrink-0 text-[#77736d]" />
                <label htmlFor="navbar-product-search" className="sr-only">Search products</label>
                <input ref={inputRef} id="navbar-product-search" name="q" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the collection" className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-[#151515] outline-none placeholder:text-[#88847d]" />
                <button type="submit" className={"border-b border-[#a99a86] px-1 py-1 text-sm font-medium text-[#332b23] hover:text-[#151515] " + FOCUS}>Search</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div id="mobile-navigation-menu" initial={reducedMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -6 }} transition={transition}
              data-lenis-prevent className="absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-[#E5E1DA] bg-[#F7F6F2] px-4 pb-6 pt-3 shadow-[0_12px_30px_rgba(21,21,21,0.08)] md:hidden">
              <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl">
                {LINKS.map(({ label, href }) => {
                  const target = label === "About" ? aboutHref : href;
                  return <Link key={label} href={target} aria-current={active(href) ? "page" : undefined} onClick={closeAll}
                    className={"flex min-h-12 items-center border-b border-[#E5E1DA] text-[15px] font-medium " + FOCUS + " " + (active(href) ? "text-[#151515]" : "text-[#6B6B6B]")}>{label}</Link>;
                })}
                <button type="button" aria-expanded={mobileCategoriesOpen} aria-controls="mobile-category-list" onClick={() => setMobileCategoriesOpen((open) => !open)}
                  className={"flex min-h-12 w-full items-center justify-between border-b border-[#E5E1DA] text-left text-[15px] font-medium text-[#6B6B6B] " + FOCUS}>
                  Categories <ArrowDown size={15} aria-hidden="true" className={"transition-transform " + (mobileCategoriesOpen ? "rotate-180" : "")} />
                </button>
                <AnimatePresence>
                  {mobileCategoriesOpen && (
                    <motion.div id="mobile-category-list" initial={reducedMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reducedMotion ? undefined : { opacity: 0, height: 0 }} transition={transition}
                      className="grid grid-cols-2 gap-x-3 overflow-hidden border-b border-[#E5E1DA] py-2">
                      {Object.entries(CATEGORY_MAP).map(([category, label]) => (
                        <Link key={category} href={"/catalog?category=" + encodeURIComponent(category)} onClick={closeAll}
                          className={"min-h-10 py-2 text-[13px] text-[#6B6B6B] hover:text-[#151515] " + FOCUS}>{label}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <Link href="/catalog" onClick={closeAll}
                  className={"mt-5 inline-flex h-11 w-full items-center justify-center gap-2 bg-[#191816] text-sm font-medium text-[#F7F6F2] hover:bg-[#34312c] " + FOCUS}>
                  Explore Products <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
