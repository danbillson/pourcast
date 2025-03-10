import { CocktailList } from "@/components/cocktail-list";
import { Hero } from "@/components/hero";
import { IngredientInput } from "@/components/ingredient-input";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <IngredientInput />
      <CocktailList />
    </div>
  );
}
