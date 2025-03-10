"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ingredientsList } from "@/data/ingredients";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const RecipeSubmissionForm = () => {
  const [name, setName] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setIngredientInput(value);

    if (value) {
      const filtered = ingredientsList.filter(
        (item) =>
          item.toLowerCase().includes(value.toLowerCase()) &&
          !selectedIngredients.includes(item),
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setIngredientInput("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would submit to an API endpoint
      // For the prototype, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setName("");
      setSelectedIngredients([]);
      setInstructions("");
      setSubmitterName("");
      setSuccess(true);

      // Reset success message after a delay
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to submit recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Share Your Cocktail
        </h1>
        <p className="mt-2 text-muted-foreground">
          Have a unique recipe? Share it with the Pourcast community!
        </p>
      </div>

      {success ? (
        <div className="rounded-lg bg-green-50 p-4 text-center text-green-700">
          <p className="font-medium">Recipe submitted successfully!</p>
          <p className="mt-2">Thank you for contributing to our collection.</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Cocktail Name</Label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="Enter cocktail name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <div className="relative">
              <input
                id="ingredients"
                type="text"
                value={ingredientInput}
                onChange={handleIngredientInputChange}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="Add ingredients one by one"
              />

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border bg-white p-1 shadow-lg">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="cursor-pointer rounded-sm px-3 py-2 text-sm hover:bg-secondary"
                      onClick={() => addIngredient(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <Badge
                  key={ingredient}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {ingredient}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeIngredient(ingredient)}
                  />
                </Badge>
              ))}
            </div>
            {selectedIngredients.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Please add at least one ingredient
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="h-40 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="Enter preparation instructions"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="submitter">Your Name (Optional)</Label>
            <input
              id="submitter"
              type="text"
              value={submitterName}
              onChange={(e) => setSubmitterName(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="Enter your name or pseudonym"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              name === "" ||
              selectedIngredients.length === 0 ||
              instructions === "" ||
              isSubmitting
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Recipe"}
          </Button>
        </form>
      )}
    </div>
  );
};
