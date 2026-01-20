"use client";
import Header from "@/src/components/layout/Header";
import Hero from "@/src/features/hero/Hero";
import BestSelling from "@/src/features/best-selling/BestSellings";
import Catalog from "@/src/features/catalog/Catalog";
import FeaturedRecipes from "@/src/features/recipe/FeaturedRecipes";
import Footer from "@/src/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <BestSelling />
      <Catalog />
      <FeaturedRecipes />
      <Footer />
    </main>
  );
}
