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
        className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
      >
        Go back home
      </Link>
    </main>
  );
}
