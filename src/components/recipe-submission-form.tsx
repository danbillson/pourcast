"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ingredientsList } from "@/data/ingredients";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const RecipeSubmissionForm = () => {
  const [name, setName] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Close command menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setShowCommandMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter ingredients that are not already selected
  const availableIngredients = ingredientsList
    .filter((ingredient) => !selectedIngredients.includes(ingredient))
    .filter(
      (ingredient) =>
        !ingredientInput ||
        ingredient.toLowerCase().includes(ingredientInput.toLowerCase()),
    );

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setIngredientInput("");
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
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter cocktail name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <div className="relative">
              <div onClick={() => setShowCommandMenu(true)}>
                <Input
                  id="ingredients"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="Add ingredients one by one"
                  onFocus={() => setShowCommandMenu(true)}
                />
              </div>

              {showCommandMenu && (
                <div className="absolute z-10 mt-1 w-full" ref={commandRef}>
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput
                      placeholder="Search ingredients..."
                      value={ingredientInput}
                      onValueChange={setIngredientInput}
                    />
                    <CommandList>
                      <CommandEmpty>No ingredients found.</CommandEmpty>
                      <CommandGroup heading="Available Ingredients">
                        {availableIngredients.slice(0, 10).map((ingredient) => (
                          <CommandItem
                            key={ingredient}
                            onSelect={() => {
                              addIngredient(ingredient);
                              setShowCommandMenu(false);
                            }}
                            className="cursor-pointer"
                          >
                            <Search className="mr-2 h-4 w-4" />
                            {ingredient}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
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
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter preparation instructions"
              className="h-40"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="submitter">Your Name (Optional)</Label>
            <Input
              id="submitter"
              value={submitterName}
              onChange={(e) => setSubmitterName(e.target.value)}
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
