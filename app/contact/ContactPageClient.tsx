"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHero } from "@/components/legal/LegalHero";
import PublicMotionProvider from "@/components/PublicMotionProvider";
import {
  Mail,
  Send,
  ArrowUpRight,
  Copy,
  Check,
  Clock,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Note: This form is not connected to a backend service.
    // In production, integrate with an email service or API route.
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@smartgearpicks.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PublicMotionProvider>
      <div className="min-h-screen flex flex-col font-sans bg-[#F6F4EF] text-[#22231F]">
        <Navbar />

        <LegalHero
          title="Contact Us"
          subtitle="Have a question, suggestion, or feedback? We'd love to hear from you. Reach out using the form below or email us directly."
          category="Get in Touch"
          lastUpdated="November 3, 2026"
          iconName="mail"
        />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex-1 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column — Contact Info */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct Email Card */}
              <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-md p-6 shadow-xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2 text-[#22231F]">
                  <Mail className="w-4 h-4 text-[#354538]" />
                  Email Us Directly
                </h3>
                <div className="border border-[#DDDCD3] rounded-sm p-4 bg-[#F6F4EF]">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-[#22231F]">General Inquiries</p>
                      <a
                        href="mailto:contact@smartgearpicks.com"
                        className="text-xs font-semibold text-[#354538] hover:underline"
                      >
                        contact@smartgearpicks.com
                      </a>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded bg-[#FFFFFF] text-[#6B6B66] hover:text-[#22231F] border border-[#DDDCD3] transition-colors cursor-pointer"
                      title="Copy email address"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4 border border-[#DDDCD3] rounded-sm p-4 bg-[#F6F4EF]">
                  <p className="text-xs font-semibold text-[#22231F]">Privacy & Legal</p>
                  <a
                    href="mailto:privacy@smartgearpicks.com"
                    className="text-xs font-semibold text-[#354538] hover:underline"
                  >
                    privacy@smartgearpicks.com
                  </a>
                </div>
              </div>

              {/* Response Info */}
              <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-md p-6 shadow-xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2 text-[#22231F]">
                  <Clock className="w-4 h-4 text-[#354538]" />
                  Response Times
                </h3>
                <div className="space-y-3 text-xs text-[#6B6B66]">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-[#B66F52] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#22231F]">General Questions</p>
                      <p>We typically respond within 1–3 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#B66F52] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#22231F]">Privacy & Data Requests</p>
                      <p>Compliance inquiries are addressed within 5 business days.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-[#E5E9E0]/40 border border-[#DDDCD3] rounded-md p-5 shadow-xs">
                <div className="flex items-start gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#354538] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-[#22231F]">Important Note</p>
                    <p className="text-[#6B6B66] leading-relaxed">
                      SmartGearPicks is a product discovery platform — not a retailer. For
                      order-related inquiries (shipping, returns, refunds), please contact the
                      merchant where you made your purchase directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Contact Form */}
            <div className="lg:col-span-8">
              <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-md p-6 md:p-8 shadow-xs">
                {submitted ? (
                  /* Success State */
                  <div className="text-center py-12 px-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E5E9E0] border border-[#DDDCD3] mb-5">
                      <Check className="w-7 h-7 text-[#354538]" />
                    </div>
                    <h2 className="font-display text-xl font-semibold mb-2 text-[#22231F]">
                      Message Received
                    </h2>
                    <p className="text-sm text-[#6B6B66] max-w-md mx-auto mb-6">
                      Thank you for reaching out, {formData.name || "there"}. We&apos;ve received
                      your message and will get back to you as soon as possible.
                    </p>
                    <p className="text-xs text-[#6B6B66] italic">
                      Note: This form is currently for demonstration purposes. For immediate
                      communication, please email us at{" "}
                      <a
                        href="mailto:contact@smartgearpicks.com"
                        className="font-semibold text-[#354538] underline"
                      >
                        contact@smartgearpicks.com
                      </a>.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm bg-[#22231F] text-[#F6F4EF] text-xs font-medium transition-all hover:bg-[#354538] active:scale-95 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* Contact Form */
                  <>
                    <div className="mb-6">
                      <h2 className="font-display text-xl font-semibold text-[#22231F]">
                        Send Us a Message
                      </h2>
                      <p className="text-sm text-[#6B6B66] mt-1">
                        Fill out the form below and we&apos;ll get back to you.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-semibold mb-1.5 text-[#22231F]"
                          >
                            Your Name <span className="text-[#B66F52]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Alex Johnson"
                            className="w-full px-4 py-2.5 border border-[#DDDCD3] rounded-sm bg-[#F6F4EF] text-sm text-[#22231F] placeholder:text-[#6B6B66]/50 focus:outline-none focus:ring-2 focus:ring-[#354538]/20 focus:border-[#354538] transition-colors"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold mb-1.5 text-[#22231F]"
                          >
                            Email Address <span className="text-[#B66F52]">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-[#DDDCD3] rounded-sm bg-[#F6F4EF] text-sm text-[#22231F] placeholder:text-[#6B6B66]/50 focus:outline-none focus:ring-2 focus:ring-[#354538]/20 focus:border-[#354538] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-xs font-semibold mb-1.5 text-[#22231F]"
                        >
                          Subject <span className="text-[#B66F52]">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#DDDCD3] rounded-sm bg-[#F6F4EF] text-sm text-[#22231F] focus:outline-none focus:ring-2 focus:ring-[#354538]/20 focus:border-[#354538] transition-colors cursor-pointer"
                        >
                          <option value="" disabled>
                            Select a topic…
                          </option>
                          <option value="general">General Inquiry</option>
                          <option value="feedback">Website Feedback</option>
                          <option value="product-suggestion">Product Suggestion</option>
                          <option value="partnership">Partnership / Collaboration</option>
                          <option value="privacy">Privacy & Data Request</option>
                          <option value="bug-report">Bug Report / Technical Issue</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold mb-1.5 text-[#22231F]"
                        >
                          Message <span className="text-[#B66F52]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us what's on your mind…"
                          className="w-full px-4 py-2.5 border border-[#DDDCD3] rounded-sm bg-[#F6F4EF] text-sm text-[#22231F] placeholder:text-[#6B6B66]/50 focus:outline-none focus:ring-2 focus:ring-[#354538]/20 focus:border-[#354538] transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <p className="text-[11px] text-[#6B6B66]">
                          By submitting, you agree to our{" "}
                          <a href="/privacy" className="font-semibold text-[#354538] underline">
                            Privacy Policy
                          </a>.
                        </p>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#22231F] text-[#F6F4EF] text-sm font-medium transition-all hover:bg-[#354538] active:scale-95 cursor-pointer shadow-xs"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-6 bg-[#FFFFFF] border border-[#DDDCD3] rounded-md p-6 shadow-xs">
                <h3 className="text-sm font-semibold text-[#22231F] mb-3">
                  Looking for something specific?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <a
                    href="/about"
                    className="flex items-center justify-between p-3 rounded-sm border border-[#DDDCD3] bg-[#F6F4EF] text-[#6B6B66] hover:bg-[#E5E9E0] hover:text-[#22231F] transition-colors"
                  >
                    <span>About Us</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="/privacy"
                    className="flex items-center justify-between p-3 rounded-sm border border-[#DDDCD3] bg-[#F6F4EF] text-[#6B6B66] hover:bg-[#E5E9E0] hover:text-[#22231F] transition-colors"
                  >
                    <span>Privacy Policy</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="/disclaimer"
                    className="flex items-center justify-between p-3 rounded-sm border border-[#DDDCD3] bg-[#F6F4EF] text-[#6B6B66] hover:bg-[#E5E9E0] hover:text-[#22231F] transition-colors"
                  >
                    <span>Disclaimer</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PublicMotionProvider>
  );
}

