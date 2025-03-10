import { CocktailList } from "@/components/cocktail-list";
import { Hero } from "@/components/hero";
import { IngredientInput } from "@/components/ingredient-input";
import { ingredientsCache } from "@/lib/search-params";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

type HomeProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: HomeProps) {
  // Initialize the server-side cache with the current search params
  await ingredientsCache.parse(searchParams);

  return (
    <div className="flex flex-col">
      <Hero />
      <IngredientInput />
      <Suspense fallback={<div className="bg-cream-100/50 h-32 w-full"></div>}>
        <CocktailList />
      </Suspense>
    </div>
  );
}
