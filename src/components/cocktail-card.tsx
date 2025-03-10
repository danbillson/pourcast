import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Placeholder image path
  const placeholderImage = "/images/cocktail-placeholder.svg";

  return (
    <Link href={`/recipe/${id}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-secondary/20">
          <Image
            src={image || placeholderImage}
            alt={name}
            fill
            className="object-cover transition-all group-hover:scale-105"
          />
          <div className="absolute right-2 top-2">
            <Badge variant={matchPercentage === 100 ? "default" : "secondary"}>
              {matchPercentage}% match
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-espresso-800 font-serif text-lg font-medium">
            {name}
          </CardTitle>
          <p className="text-espresso-600 text-sm">
            By {submittedBy || "Unknown"}
          </p>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <div className="text-espresso-700 mb-2 text-xs font-medium uppercase">
            Ingredients
          </div>
          <div className="flex flex-wrap gap-1">
            {haveIngredients.map((ingredient) => (
              <Badge
                key={ingredient}
                variant="outline"
                className="bg-cream-200 text-espresso-700"
              >
                {ingredient}
              </Badge>
            ))}
            {missingIngredients.map((ingredient) => (
              <Badge
                key={ingredient}
                variant="outline"
                className="border-cream-200 text-espresso-400"
              >
                {ingredient}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
