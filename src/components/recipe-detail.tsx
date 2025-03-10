"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cocktail } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RecipeDetailProps = {
  cocktail: Cocktail;
};

export const RecipeDetail = ({ cocktail }: RecipeDetailProps) => {
  const { name, ingredients, instructions, image, submittedBy } = cocktail;
  const router = useRouter();

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
        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/20 md:aspect-auto md:h-full">
          {image ? (
            <Image src={image} alt={name} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
          <p className="mt-2 text-muted-foreground">
            Submitted by {submittedBy || "Anonymous"}
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="mt-4 space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="h-2 w-2 rounded-full p-0"
                  />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Instructions</h2>
            <p className="mt-4 whitespace-pre-wrap text-muted-foreground">
              {instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
