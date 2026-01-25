

import Hero from "@/src/components/landing/Hero";
import BestSelling from "@/src/components/landing/BestSellings";
import Catalog from "@/src/components/landing/Catalog";
import FeaturedRecipes from "@/src/components/landing/FeaturedRecipes";

import Video from "@/src/components/landing/Video";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
    
      <Hero />
      <BestSelling />
      <Video />
      <Catalog />
      <FeaturedRecipes />
     
    </main>
  )
}
