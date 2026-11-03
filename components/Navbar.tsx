"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowUpRight, Menu, Search, X } from "lucide-react";
import { CATEGORY_MAP } from "@/components/ProductCard";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/catalog" },
  { label: "About Us", href: "/about" },
  { label: "How We Curate", href: "/#how-we-curate" },
  { label: "Contact", href: "/contact" },
];

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]";

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeAll();
      }
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
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    if (!query.trim()) {
      event.preventDefault();
      inputRef.current?.focus();
      return;
    }
    closeAll();
  };

  const active = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/catalog") return pathname === "/catalog";
    if (href === "/about") return pathname === "/about";
    if (href === "/contact") return pathname === "/contact";
    return false;
  };

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.16, ease: "easeOut" as const };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#DDDCD3] bg-[#FFFFFF]/95 shadow-[0_4px_20px_-4px_rgba(34,35,31,0.04)] backdrop-blur-md"
          : "border-b border-[#DDDCD3]/60 bg-[#F6F4EF]/90 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand identity */}
        <Link
          href="/"
          onClick={closeAll}
          aria-label="SmartGearPicks home"
          className={`flex items-center gap-2.5 font-display text-lg font-semibold tracking-[-0.035em] text-[#22231F] sm:text-xl ${FOCUS_RING}`}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#354538] text-[13px] font-bold text-[#F6F4EF]">
            S
          </span>
          <span>SmartGearPicks</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              onClick={closeAll}
              className={`relative rounded-sm px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-[#E5E9E0] hover:text-[#22231F] ${FOCUS_RING} ${
                active(href)
                  ? "text-[#22231F] after:absolute after:inset-x-3.5 after:-bottom-[13px] after:h-[2px] after:bg-[#B66F52]"
                  : "text-[#6B6B66]"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Categories dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
              aria-controls="desktop-category-menu"
              onClick={() => setCategoriesOpen((open) => !open)}
              className={`inline-flex items-center gap-1.5 rounded-sm px-3.5 py-2 text-[13px] font-medium text-[#6B6B66] transition-colors hover:bg-[#E5E9E0] hover:text-[#22231F] ${FOCUS_RING}`}
            >
              Categories
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${categoriesOpen ? "rotate-180 text-[#B66F52]" : ""}`}
              />
            </button>
            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  id="desktop-category-menu"
                  data-lenis-prevent
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: 4 }}
                  transition={transition}
                  className="absolute left-0 top-[calc(100%+14px)] z-50 grid max-h-[min(70vh,460px)] w-[460px] grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto rounded-md border border-[#DDDCD3] bg-[#FFFFFF] p-3.5 shadow-[0_16px_36px_-6px_rgba(34,35,31,0.1)]"
                >
                  {Object.entries(CATEGORY_MAP).map(([category, label]) => (
                    <Link
                      key={category}
                      href={`/catalog?category=${encodeURIComponent(category)}`}
                      onClick={closeAll}
                      className={`flex items-center rounded-sm px-3 py-2 text-[13px] text-[#22231F] transition-colors hover:bg-[#E5E9E0] hover:text-[#354538] ${FOCUS_RING}`}
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right CTA / Search controls */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <button
            type="button"
            aria-label={searchOpen ? "Close product search" : "Search products"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
            className={`grid size-9 place-items-center rounded-sm text-[#6B6B66] transition-colors hover:bg-[#E5E9E0] hover:text-[#22231F] ${FOCUS_RING}`}
          >
            {searchOpen ? <X size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
          </button>
          <Link
            href="/catalog"
            onClick={closeAll}
            className={`inline-flex h-9 items-center gap-1.5 rounded-sm bg-[#22231F] px-4 text-[13px] font-medium text-[#F6F4EF] transition-colors hover:bg-[#354538] ${FOCUS_RING}`}
          >
            <span>Explore Collection</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            aria-label={searchOpen ? "Close product search" : "Search products"}
            aria-expanded={searchOpen}
            onClick={() => {
              setMobileOpen(false);
              setSearchOpen((open) => !open);
            }}
            className={`grid size-10 place-items-center rounded-sm text-[#6B6B66] hover:bg-[#E5E9E0] ${FOCUS_RING}`}
          >
            {searchOpen ? <X size={19} aria-hidden="true" /> : <Search size={19} aria-hidden="true" />}
          </button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => {
              setSearchOpen(false);
              setMobileOpen((open) => !open);
            }}
            className={`grid size-10 place-items-center rounded-sm text-[#22231F] hover:bg-[#E5E9E0] ${FOCUS_RING}`}
          >
            {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Search drawer */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={transition}
            className="border-t border-[#DDDCD3] bg-[#FFFFFF] px-4 py-3 sm:px-6 lg:px-8 shadow-sm"
          >
            <form
              action="/catalog"
              method="get"
              role="search"
              onSubmit={submitSearch}
              className="mx-auto flex max-w-7xl items-center gap-3"
            >
              <Search size={18} aria-hidden="true" className="shrink-0 text-[#6B6B66]" />
              <label htmlFor="navbar-product-search" className="sr-only">
                Search products
              </label>
              <input
                ref={inputRef}
                id="navbar-product-search"
                name="q"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product name, category, or keyword..."
                className="min-w-0 flex-1 border-0 bg-transparent py-1.5 text-sm text-[#22231F] outline-none placeholder:text-[#6B6B66]"
              />
              <button
                type="submit"
                className={`rounded-sm bg-[#354538] px-3.5 py-1.5 text-xs font-medium text-[#F6F4EF] hover:bg-[#22231F] ${FOCUS_RING}`}
              >
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={transition}
            data-lenis-prevent
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-[#DDDCD3] bg-[#FFFFFF] px-4 pb-6 pt-3 shadow-[0_16px_36px_rgba(34,35,31,0.08)] md:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl space-y-1">
              {LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-current={active(href) ? "page" : undefined}
                  onClick={closeAll}
                  className={`flex min-h-11 items-center border-b border-[#DDDCD3]/50 text-[14px] font-medium ${FOCUS_RING} ${
                    active(href) ? "text-[#354538] font-semibold" : "text-[#22231F]"
                  }`}
                >
                  {label}
                </Link>
              ))}

              <button
                type="button"
                aria-expanded={mobileCategoriesOpen}
                aria-controls="mobile-category-list"
                onClick={() => setMobileCategoriesOpen((open) => !open)}
                className={`flex min-h-11 w-full items-center justify-between border-b border-[#DDDCD3]/50 text-left text-[14px] font-medium text-[#22231F] ${FOCUS_RING}`}
              >
                Categories
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${mobileCategoriesOpen ? "rotate-180 text-[#B66F52]" : ""}`}
                />
              </button>

              <AnimatePresence>
                {mobileCategoriesOpen && (
                  <motion.div
                    id="mobile-category-list"
                    initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
                    transition={transition}
                    className="grid grid-cols-2 gap-x-2 gap-y-1 overflow-hidden border-b border-[#DDDCD3]/50 py-2.5"
                  >
                    {Object.entries(CATEGORY_MAP).map(([category, label]) => (
                      <Link
                        key={category}
                        href={`/catalog?category=${encodeURIComponent(category)}`}
                        onClick={closeAll}
                        className={`rounded px-2 py-1.5 text-[13px] text-[#6B6B66] hover:bg-[#E5E9E0] hover:text-[#22231F] ${FOCUS_RING}`}
                      >
                        {label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-4">
                <Link
                  href="/catalog"
                  onClick={closeAll}
                  className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-[#22231F] text-sm font-medium text-[#F6F4EF] hover:bg-[#354538] ${FOCUS_RING}`}
                >
                  <span>Explore Collection</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
