import Image from "next/image"

export default function FeaturedRecipes() {
  const recipes = [
    {
      id: 1,
      title: 'Cocktails & Mocktails',
      description: 'Sweet fruit mocktails and crème',
      image: '/images/feature/6.jpg',
      color: 'from-orange-500 to-amber-500',
    },
    {
      id: 2,
      title: 'Coffee Drinks',
      description: 'Creamy iced caramel fares',
      image: '/images/feature/3.jpg',
      color: 'from-amber-700 to-orange-700',
    },
    {
      id: 3,
      title: 'Milkshakes & Smoothies',
      description: 'Smooth protein-rich blends',
      image: '/images/feature/4.jpg',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 4,
      title: 'Desserts & Ice Cream',
      description: 'Delicious sweets tasty tops',
      image: '/images/feature/5.jpg',
      color: 'from-rose-500 to-pink-600',
    },
    {
      id: 5,
      title: 'Baking & Pastry',
      description: 'Tasty treat decorations',
      image: '/images/feature/2.jpg',
      color: 'from-orange-600 to-rose-600',
    },
    {
      id: 6,
      title: 'Healthy Bowls',
      description: 'Fresh and balanced meals',
      image: '/images/feature/7.jpg',
      color: 'from-emerald-500 to-lime-500',
    },
    {
      id: 7,
      title: 'Quick Snacks',
      description: 'Fast bites anytime',
      image: '/images/feature/1.jpg',
      color: 'from-sky-500 to-cyan-500',
    },
  ]

  return (
    <section id="recipes" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">

     
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            FEATURED RECIPES
          </h2>
        </div>

     
        <div className="flex flex-wrap justify-center gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br ${recipe.color} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
            
              <div className="relative w-full overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={300}
                  height={300}
                  
                  className="object-cover"
                />
              </div>

            
              <div className="p-4 text-center text-white space-y-1">
                <h3 className="text-sm font-semibold tracking-wide">
                  {recipe.title}
                </h3>
                <p className="text-xs opacity-85 leading-snug">
                  {recipe.description}
                </p>

                <button className="mt-3 text-xs font-semibold underline underline-offset-4 opacity-80 hover:opacity-100 transition">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
