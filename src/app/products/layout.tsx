import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Akula Topping's full collection of premium toppings and natural fruit sauces for cafés, pastry shops and creative menus.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
