import { recipes } from "@/src/utils/constants";
import Image from "next/image";

export default function FeaturedRecipes() {
  return (
    <section id="recipes" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
         <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Featured Recipes
          </h2>
           <p className="text-gray-600 mt-2">see our most popular recipes</p>
        </div>

        {/* Grid instead of flex */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`group relative w-[300px] h-[420px] flex flex-col rounded-2xl overflow-hidden bg-linear-to-br ${recipe.color} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Image */}
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>

              {/* Content */}
              <div className="flex-1 pb-3 text-center text-white space-y-1 flex flex-col justify-end">
                <h3 className="text-sm font-semibold tracking-wide">
                  {recipe.title}
                </h3>

                <p className="text-xs opacity-85 leading-snug line-clamp-2">
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
  );
}
