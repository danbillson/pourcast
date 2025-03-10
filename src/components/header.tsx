"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div>
          <Link href="/" className="text-xl font-bold tracking-tight">
            Pourcast
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm ${pathname === "/" ? "font-medium" : "text-muted-foreground"}`}
          >
            Home
          </Link>
          <Link
            href="/submit"
            className={`text-sm ${pathname === "/submit" ? "font-medium" : "text-muted-foreground"}`}
          >
            Submit Recipe
          </Link>
          <Button size="sm" asChild>
            <Link href="#ingredients">Find Cocktails</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
