import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            width={110}
            height={40}
            priority
            unoptimized
          />
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="relative text-sm font-medium text-foreground transition hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="relative text-sm font-medium text-foreground transition hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Products
          </Link>

          <Link
            href="/about"
            className="relative text-sm font-medium text-foreground transition hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
