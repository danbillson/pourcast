import { RecipeDetail } from "@/components/recipe-detail";
import { cocktails } from "@/data/cocktails";
import { notFound } from "next/navigation";
import { SearchParams } from "nuqs/server";

type RecipePageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<SearchParams>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const cocktail = cocktails.find((cocktail) => cocktail.id === id);

  if (!cocktail) {
    notFound();
  }

  return <RecipeDetail cocktail={cocktail} />;
}
