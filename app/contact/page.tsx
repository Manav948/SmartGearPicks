import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the SmartGearPicks team. Send us your questions, feedback, product suggestions, or partnership inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | SmartGearPicks",
    description:
      "Have a question, suggestion, or feedback? Reach out to the SmartGearPicks team.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
