import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Akula Topping for supply enquiries, distribution partnerships and product information.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
