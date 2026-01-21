import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-[#ff7205] bg-amber-800">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-4">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Let <span className="text-logo">Akula</span> take your drink to a
            whole new level
          </h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-lg mx-auto lg:mx-0">
            100% natural, delicious syrup toppings for all your favorite drinks
            and desserts. Enhance every moment with authentic flavors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-foreground text-white px-8 py-3 rounded-lg font-semibold hover:scale-x-90 transition text-lg">
              Explore Flavors
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 flex justify-center ">
          <div className="relative w-full max-w-4xl group ">
            {/* The Floating Badge */}
            <div className="absolute top-0 right-5 md:top-12 xl:top-18 animate-float-slow">
              <div className="bg-logo text-white px-4 py-2 rounded-full shadow-lg border-2 border-white flex flex-col items-center transform rotate-12">
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Premium
                </span>
                <span className="text-sm md:text-xl font-black italic">
                  100% Natural
                </span>
              </div>
            </div>
            <div className="w-full max-w-4xl">
              <Image
                // src="/Images/hero (1).png"
                src="/Images/hero_upscayl_2x_upscayl-lite-4x.webp"
                width={500}
                height={500}
                loading="eager"
                alt="Akula Topping Bottles Collection"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
