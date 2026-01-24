import { Product } from "@/src/utils/types";
import ProductsClient from "@/src//components/ProductsClient";

const products: Product[] = [
  {
    id: 1,
    name: "Strawberry Splash",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/strawberry.jpeg",
    borderColor: "border-red-400",
    flavor: "Strawberry",
    liked: false,
  },
  {
    id: 2,
    name: "Blueberry Dream",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/blueberry.jpeg",
    borderColor: "border-blue-400",
    flavor: "Blueberry",
    liked: false,
  },
  {
    id: 3,
    name: "Raspberry Rush",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/raspberry.jpeg",
    borderColor: "border-pink-400",
    flavor: "Raspberry",
    liked: false,
  },
  {
    id: 4,
    name: "Peach Breeze",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/peach.jpeg",
    borderColor: "border-orange-400",
    flavor: "Peach",
    liked: false,
  },
  {
    id: 5,
    name: "Pineapple Punch",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/pineapple.jpeg",
    borderColor: "border-yellow-400",
    flavor: "Pineapple",
    liked: false,
  },
  {
    id: 6,
    name: "Kiwi Kick",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/kiwi.jpeg",
    borderColor: "border-green-400",
    flavor: "Kiwi",
    liked: false,
  },
  {
    id: 7,
    name: "Passion Fruit Pop",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/passion_fruit.jpeg",
    borderColor: "border-yellow-500",
    flavor: "Passion Fruit",
    liked: false,
  },
  {
    id: 8,
    name: "Chocolate Chill",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/chocolate.jpeg",
    borderColor: "border-stone-400",
    flavor: "Chocolate",
    liked: false,
  },
  {
    id: 9,
    name: "Caramel Swirl",
    brand: "Fresh Vibes",
    price: 135,
    image: "/images/products/caramel.jpeg",
    borderColor: "border-amber-400",
    flavor: "Caramel",
    liked: false,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#256799] to-[#F59E25]">
        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Fresh Vibes Drinks
          </h1>

          <p className="mt-4 text-blue-100 max-w-2xl mx-auto text-sm sm:text-base">
            Premium quality beverages for every moment
          </p>
        </div>

        {/* Wave bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="M0,64L60,74.7C120,85,240,107,360,112C480,117,600,107,720,90.7C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64V120H0Z"
          />
        </svg>
      </div>

      {/* Client-rendered products area */}
      <ProductsClient products={products} />
    </main>
  );
}
