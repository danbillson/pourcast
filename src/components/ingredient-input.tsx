"use client";

import { Badge } from "@/components/ui/badge";
import { ingredientsList } from "@/data/ingredients";
import { useIngredients } from "@/hooks/useIngredients";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const IngredientInput = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useIngredients();
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update suggestions based on input
  useEffect(() => {
    if (input) {
      const filtered = ingredientsList.filter(
        (item) =>
          item.toLowerCase().includes(input.toLowerCase()) &&
          !(selectedIngredients || []).includes(item),
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input, selectedIngredients]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addIngredient = (ingredient: string) => {
    if (!(selectedIngredients || []).includes(ingredient)) {
      setSelectedIngredients([...(selectedIngredients || []), ingredient]);
      setInput("");
      setShowSuggestions(false);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(
      (selectedIngredients || []).filter((item) => item !== ingredient),
    );
  };

  return (
    <div id="ingredients" className="w-full">
      <div className="container mx-auto py-12">
        <div className="flex flex-col gap-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              What&apos;s in your bar?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Add the ingredients you have and we&apos;ll show you cocktails you
              can make
            </p>
          </div>

          <div className="mx-auto w-full max-w-xl">
            <div className="relative">
              <div className="flex items-center rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search ingredients..."
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => input && setShowSuggestions(true)}
                />
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border bg-white p-1 shadow-lg"
                >
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

            <div className="mt-4 flex flex-wrap gap-2">
              {(selectedIngredients || []).map((ingredient) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};
