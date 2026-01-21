import { recipes } from "@/src/utils/constants";
import Image from "next/image";

export default function FeaturedRecipes() {
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
              className={`group relative rounded-2xl overflow-hidden bg-linear-to-br ${recipe.color} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
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
  );
}
