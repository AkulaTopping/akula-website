import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        The page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-primary transition-all active:scale-95 shadow-lg"
      >
        Return to Akula Topping
      </Link>
    </main>
  );
}
