import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes & Serving Ideas",
  description: "Serving inspiration and recipe ideas using Akula Topping sauces — from caramel lattes to fruit smoothies and artisan desserts.",
};

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
