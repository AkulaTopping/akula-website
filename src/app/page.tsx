"use client";
import Header from "@/src/components/layout/Header";
import Hero from "@/src/components/landing/Hero";
import BestSelling from "@/src/components/landing/BestSellings";
import Catalog from "@/src/components/landing/Catalog";
import FeaturedRecipes from "@/src/components/landing/FeaturedRecipes";
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
