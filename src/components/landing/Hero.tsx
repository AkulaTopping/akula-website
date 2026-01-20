export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f5f0ed' }}>
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 -z-10" style={{ backgroundColor: '#B6174B' }} />
      <div className="absolute bottom-20 left-5 w-80 h-80 rounded-full blur-3xl opacity-15 -z-10" style={{ backgroundColor: '#12a058' }} />
      
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            Premium Natural Toppings
          </h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-lg mx-auto lg:mx-0">
            100% natural, delicious syrup toppings for all your favorite drinks and desserts. Enhance every moment with authentic flavors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition text-lg">
              Explore Flavors
            </button>
            <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition text-lg">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Right image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <img
              src="/images/image.png"
              alt="Akula Topping Bottles Collection"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
