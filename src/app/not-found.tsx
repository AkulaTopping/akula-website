import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#fbf9f4] text-[#18261f] text-center px-6">
      <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#c39b6e] mb-3">
        Page Not Found
      </span>
      <h1 className="text-7xl lg:text-8xl font-serif font-bold text-[#124635] mb-4">404</h1>
      <p className="text-base text-gray-600 mb-8 max-w-md font-light leading-relaxed">
        The page you are looking for does not exist or has been moved to our new collection.
      </p>

      <Link
        href="/"
        className="px-8 py-3.5 rounded-full bg-[#124635] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#0c2b20] transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Return to Akula Topping
      </Link>
    </main>
  );
}
