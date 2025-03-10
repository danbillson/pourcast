"use client";

import { CocktailCard } from "@/components/cocktail-card";
import { cocktails } from "@/data/cocktails";
import { useIngredients } from "@/hooks/useIngredients";
import { useEffect, useState } from "react";

export const CocktailList = () => {
  const [filteredCocktails, setFilteredCocktails] = useState(cocktails);
  const [selectedIngredients] = useIngredients();

  useEffect(() => {
    if (selectedIngredients && selectedIngredients.length > 0) {
      // Filter cocktails based on selected ingredients
      const filtered = cocktails
        .map((cocktail) => {
          // Count how many selected ingredients are in this cocktail
          const matchCount = cocktail.ingredients.filter((ingredient) =>
            selectedIngredients.includes(ingredient),
          ).length;

          // Calculate match percentage
          const matchPercentage =
            (matchCount / cocktail.ingredients.length) * 100;

          return {
            cocktail,
            matchCount,
            matchPercentage,
          };
        })
        // Sort by match percentage (highest first)
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        // Return just the cocktail
        .map((item) => item.cocktail);

      setFilteredCocktails(filtered);
    } else {
      setFilteredCocktails(cocktails);
    }
  }, [selectedIngredients]);

  if (!selectedIngredients || selectedIngredients.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-secondary/5">
      <div className="container mx-auto py-12">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              {filteredCocktails.length > 0
                ? "Cocktails you can make"
                : "No cocktails found with those ingredients"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {filteredCocktails.length > 0
                ? "Here are some cocktails you can make with your ingredients"
                : "Try adding more ingredients or removing some to find matches"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCocktails.map((cocktail) => (
              <CocktailCard
                key={cocktail.id}
                cocktail={cocktail}
                selectedIngredients={selectedIngredients || []}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
