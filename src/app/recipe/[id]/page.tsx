import { RecipeDetail } from "@/components/recipe-detail";
import { cocktails } from "@/data/cocktails";
import { notFound } from "next/navigation";

type RecipePageProps = {
  params: {
    id: string;
  };
};

export default function RecipePage({ params }: RecipePageProps) {
  const cocktail = cocktails.find((cocktail) => cocktail.id === params.id);

  if (!cocktail) {
    notFound();
  }

  return <RecipeDetail cocktail={cocktail} />;
}
