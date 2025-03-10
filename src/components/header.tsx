"use client";

import { Button } from "@/components/ui/button";
import { Wine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="border-cream-200 border-b bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Wine className="text-espresso-600 h-5 w-5" />
            <span className="text-espresso-800 font-serif text-xl font-medium tracking-tight">
              Pourcast
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`hover:text-espresso-900 text-sm transition-colors ${
              pathname === "/"
                ? "text-espresso-800 font-medium"
                : "text-espresso-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/submit"
            className={`hover:text-espresso-900 text-sm transition-colors ${
              pathname === "/submit"
                ? "text-espresso-800 font-medium"
                : "text-espresso-600"
            }`}
          >
            Submit Recipe
          </Link>
          <Button
            size="sm"
            className="bg-espresso-700 text-cream-50 hover:bg-espresso-800"
          >
            <Link href="#ingredients">Find Cocktails</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
