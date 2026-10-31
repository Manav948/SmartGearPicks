"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Newsletter signup is not connected yet, so your email has not been sent.");
  }

  return (
    <section aria-labelledby="footer-newsletter-title">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b5845]">Stay Updated</p>
      <h2 id="footer-newsletter-title" className="font-display text-lg font-medium tracking-[-0.03em]">Thoughtful finds, delivered.</h2>
      <p className="mt-2 max-w-sm text-xs leading-5 text-[#49443d]">Useful product picks and discoveries for your everyday.</p>
      <form onSubmit={handleSubscribe} className="mt-4 flex min-h-11 max-w-md items-center rounded-full border border-[#151515]/30 bg-white/45 pl-4 pr-1.5 transition focus-within:border-[#7c6853] focus-within:ring-2 focus-within:ring-[#7c6853]/15">
        <label htmlFor="footer-email" className="sr-only">Email address</label>
        <input id="footer-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => { setEmail(event.target.value); setMessage(""); }} placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-2 text-left text-xs text-[#151515] outline-none placeholder:text-[#6B6B6B]" />
        <button type="submit" aria-label="Subscribe" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#191816] text-white transition hover:bg-[#34312c] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c6853]">
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-2 text-[10px] leading-4 text-[#5b544b]">No clutter. Signup is not connected yet; your email will not be sent.</p>
      <p role="status" aria-live="polite" className="mt-1 min-h-4 text-xs text-[#6b5845]">{message}</p>
    </section>
  );
}
