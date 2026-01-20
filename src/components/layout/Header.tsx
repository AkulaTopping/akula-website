import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Akula Topping
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="#best-selling" className="text-foreground hover:text-primary transition">
            Best Selling
          </Link>
          <Link href="#catalog" className="text-foreground hover:text-primary transition">
            Catalog
          </Link>
          <Link href="#recipes" className="text-foreground hover:text-primary transition">
            Recipes
          </Link>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">
            Shop Now
          </button>
        </nav>
      </div>
    </header>
  )
}
