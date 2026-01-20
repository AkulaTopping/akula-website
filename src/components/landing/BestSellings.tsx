export default function BestSelling() {
  const products = [
    {
      id: 1,
      name: 'Strawberry Delight',
      description: 'Rich strawberry flavor with natural ingredients',
      price: '$8.99',
      image: '🍓',
    },
    {
      id: 2,
      name: 'Blueberry Dream',
      description: 'Sweet blueberry syrup for smoothies & desserts',
      price: '$8.99',
      image: '🫐',
    },
    {
      id: 3,
      name: 'Mango Paradise',
      description: 'Tropical mango topping for exotic drinks',
      price: '$9.99',
      image: '🥭',
    },
    {
      id: 4,
      name: 'Chocolate Bliss',
      description: 'Premium chocolate syrup for all occasions',
      price: '$7.99',
      image: '🍫',
    },
  ]

  return (
    <section id="best-selling" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Best Selling
          </h2>
          <p className="text-lg text-foreground/60">
            Our most loved flavors trusted by thousands of customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="bg-gradient-to-br from-secondary/20 to-accent/20 h-48 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform">
                {product.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-foreground/60 mb-4 text-sm">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
