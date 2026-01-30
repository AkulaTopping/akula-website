import { recipes } from "@/src/utils/constants";
import Image from "next/image";
import LocalizedText from "@/src/components/LocalizedText";

export default function FeaturedRecipes() {
  return (
    <section id="recipes" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            <LocalizedText id="featured_title" />
          </h2>
          <p className="text-gray-600 mt-2">
            <LocalizedText id="featured_subtitle" />
          </p>
        </div>

        {/* Grid instead of flex */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center overflow-hidden">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`group relative w-75 h-105 flex flex-col rounded-2xl overflow-hidden bg-linear-to-br ${recipe.color} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Image */}
              <div className="relative w-full h-75 overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>

              {/* Content */}
              <div className="flex-1 pb-3 text-center text-white space-y-1 flex flex-col justify-center">
                <h3 className="text-sm font-semibold tracking-wide">
                  <LocalizedText
                    id={`recipe_${recipe.id}_title`}
                    fallback={recipe.title}
                  />
                </h3>

                <p className="text-xs opacity-85 leading-snug line-clamp-2">
                  <LocalizedText
                    id={`recipe_${recipe.id}_description`}
                    fallback={recipe.description}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
