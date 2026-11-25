import Hero from "../components/landing/Hero";
import Ticker from "../components/landing/Ticker";
import BrandFilm from "../components/landing/BrandFilm";
import WorldPreview from "../components/landing/WorldPreview";
import ProductsSection from "../components/landing/ProductsSection";
import ProfessionalSection from "../components/landing/ProfessionalSection";
import EditorialSection from "../components/landing/EditorialSection";
import FeaturedRecipes from "../components/landing/FeaturedRecipes";
import ComingSoonSection from "../components/landing/ComingSoonSection";
import JournalSection from "../components/landing/JournalSection";
import { getPublishedProducts } from "../lib/products-repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { products } = await getPublishedProducts();

  return (
    <main className="home-content">
      <Hero />
      <Ticker />
      <BrandFilm />
      <WorldPreview />
      <ProductsSection initialProducts={products} />
      <ProfessionalSection />
      <EditorialSection initialProducts={products} />
      <FeaturedRecipes />
      <ComingSoonSection />
      <JournalSection />
    </main>
  );
}
