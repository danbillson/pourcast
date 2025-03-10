import { Badge } from "@/components/ui/badge";
import { Cocktail } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type CocktailCardProps = {
  cocktail: Cocktail;
  selectedIngredients: string[];
};

export const CocktailCard = ({
  cocktail,
  selectedIngredients,
}: CocktailCardProps) => {
  const { id, name, ingredients, image, submittedBy } = cocktail;

  // Check which ingredients the user has and doesn't have
  const haveIngredients = ingredients.filter((ingredient) =>
    selectedIngredients.includes(ingredient),
  );
  const missingIngredients = ingredients.filter(
    (ingredient) => !selectedIngredients.includes(ingredient),
  );

  // Calculate match percentage
  const matchPercentage = Math.round(
    (haveIngredients.length / ingredients.length) * 100,
  );

  return (
    <Link href={`/recipe/${id}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-secondary/20">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-all group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
          <div className="absolute right-2 top-2">
            <Badge variant={matchPercentage === 100 ? "default" : "secondary"}>
              {matchPercentage}% match
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">
            By {submittedBy || "Unknown"}
          </p>

          <div className="mt-4">
            <div className="mb-2 text-xs font-medium uppercase">
              Ingredients
            </div>
            <div className="flex flex-wrap gap-1">
              {haveIngredients.map((ingredient) => (
                <Badge
                  key={ingredient}
                  variant="outline"
                  className="bg-green-50 text-green-700"
                >
                  {ingredient}
                </Badge>
              ))}
              {missingIngredients.map((ingredient) => (
                <Badge
                  key={ingredient}
                  variant="outline"
                  className="text-red-700"
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
