'use client'
import Header from '@/src/components/layout/Header'
import Footer from '@/src/components/layout/Footer'
import Hero from '../components/landing/Hero'
import BestSelling from '../components/landing/BestSellings'
import Catalog from '../components/landing/Catalog'
import FeaturedRecipes from '../components/landing/FeaturedRecipes'
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
  )
}
