"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cocktail } from "@/lib/types";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RecipeDetailProps = {
  cocktail: Cocktail;
};

export const RecipeDetail = ({ cocktail }: RecipeDetailProps) => {
  const { name, ingredients, instructions, image, submittedBy } = cocktail;
  const router = useRouter();

  // Placeholder image path
  const placeholderImage = "/images/cocktail-placeholder.svg";

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden border-0 shadow-none">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary/20 md:aspect-auto md:h-full">
            <Image
              src={image || placeholderImage}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </Card>

        <Card className="border-0 shadow-none">
          <CardHeader className="px-0">
            <CardTitle className="text-espresso-900 font-serif text-4xl font-bold tracking-tight">
              {name}
            </CardTitle>
            <p className="text-espresso-600 mt-2">
              Submitted by {submittedBy || "Anonymous"}
            </p>
          </CardHeader>

          <CardContent className="px-0">
            <div className="mb-8">
              <h2 className="text-espresso-800 font-serif text-xl font-semibold">
                Ingredients
              </h2>
              <ul className="mt-4 space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="text-espresso-700 flex items-center gap-2"
                  >
                    <CheckCircle className="text-espresso-500 h-4 w-4" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-espresso-800 font-serif text-xl font-semibold">
                Instructions
              </h2>
              <p className="text-espresso-700 mt-4 whitespace-pre-wrap">
                {instructions}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
