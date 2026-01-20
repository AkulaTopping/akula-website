export default function FeaturedRecipes() {
  const recipes = [
    {
      id: 1,
      title: "Cocktails & Mocktails",
      description: "Sweet fruit mocktails and crème",
      icon: "🍹",
      color: "from-orange-500 to-amber-500",
    },
    {
      id: 2,
      title: "Coffee Drinks",
      description: "Creamy iced caramel fares",
      icon: "☕",
      color: "from-amber-700 to-orange-700",
    },
    {
      id: 3,
      title: "Milkshakes & Smoothies",
      description: "Smooth protein-rich blends",
      icon: "🥤",
      color: "from-amber-500 to-orange-600",
    },
    {
      id: 4,
      title: "Desserts & Ice Cream",
      description: "Delicious sweets tasty tops",
      icon: "🍰",
      color: "from-rose-500 to-pink-600",
    },
    {
      id: 5,
      title: "Baking & Pastry",
      description: "Tasty treat decorations",
      icon: "🧁",
      color: "from-orange-600 to-rose-600",
    },
  ];

  return (
    <section id="recipes" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-12 h-1 bg-primary rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              FEATURED RECIPES
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 bg-gradient-to-b ${recipe.color}`}
            >
              {/* Card Content */}
              <div className="h-80 flex flex-col items-center justify-between p-6 text-white relative z-10">
                {/* Icon */}
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {recipe.icon}
                </div>

                {/* Text Content */}
                <div className="text-center flex-1 flex flex-col justify-center gap-3">
                  <h3 className="text-2xl font-bold leading-tight">
                    {recipe.title}
                  </h3>
                  <p className="text-sm opacity-90 font-medium">
                    {recipe.description}
                  </p>
                </div>

                {/* Button */}
                <button className="bg-white text-foreground px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
                  READ MORE
                </button>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
