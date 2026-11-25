import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover the story behind Akula Topping — premium natural sauces crafted in Egypt for cafés, pastry shops and culinary creators.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
