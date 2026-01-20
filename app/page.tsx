'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BestSelling from '@/components/BestSellings'
import Catalog from '@/components/Catalog'
import FeaturedRecipes from '@/components/FeaturedRecipes'
import Footer from '@/components/Footer'

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
