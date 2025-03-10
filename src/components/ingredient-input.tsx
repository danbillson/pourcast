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
import { ingredientsList } from "@/data/ingredients";
import { useIngredients } from "@/hooks/useIngredients";
import { PlusCircle, Search, X } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export const IngredientInput = () => {
  const [selectedIngredients, setSelectedIngredients] = useIngredients();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const addIngredient = (ingredient: string) => {
    if (!(selectedIngredients || []).includes(ingredient)) {
      setSelectedIngredients([...(selectedIngredients || []), ingredient]);
      setSearchQuery("");

      // Keep focus in the command input to allow for continuous entry
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(
      (selectedIngredients || []).filter((item) => item !== ingredient),
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Escape key to close
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  // Filter out already selected ingredients
  const availableIngredients = ingredientsList
    .filter((ingredient) => !(selectedIngredients || []).includes(ingredient))
    .filter(
      (ingredient) =>
        !searchQuery ||
        ingredient.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div id="ingredients" className="bg-cream-100/50 z-10 w-full py-12">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-espresso-800 font-serif text-3xl font-medium tracking-tight">
              What&apos;s in your bar?
            </h2>
            <p className="text-espresso-600 mt-2">
              Add the ingredients you have and we&apos;ll show you cocktails you
              can make
            </p>
          </div>

          <div className="border-cream-200 mx-auto w-full max-w-xl rounded-lg border bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            {/* Selected ingredients display */}
            <div className="mb-4 flex flex-wrap gap-2">
              {(selectedIngredients || []).length > 0 ? (
                (selectedIngredients || []).map((ingredient) => (
                  <Badge
                    key={ingredient}
                    className="bg-cream-200 text-espresso-700 hover:bg-cream-300 px-3 py-1"
                  >
                    {ingredient}
                    <X
                      className="text-espresso-500 ml-1 h-3 w-3 cursor-pointer"
                      onClick={() => removeIngredient(ingredient)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Remove ${ingredient}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          removeIngredient(ingredient);
                        }
                      }}
                    />
                  </Badge>
                ))
              ) : (
                <p className="text-espresso-500 text-sm">
                  No ingredients selected yet. Add some below.
                </p>
              )}
            </div>

            {/* Search control */}
            <div className="relative">
              <Button
                ref={buttonRef}
                onClick={toggleSearch}
                variant="outline"
                className="border-cream-300 bg-cream-50 text-espresso-700 hover:bg-cream-100 w-full justify-start"
                aria-expanded={isSearchOpen}
                aria-haspopup="listbox"
                aria-controls="ingredient-command"
              >
                <PlusCircle className="text-espresso-500 mr-2 h-4 w-4" />
                {isSearchOpen
                  ? "Searching ingredients..."
                  : "Add ingredients..."}
              </Button>

              {isSearchOpen && (
                <div
                  ref={commandRef}
                  className="absolute z-10 mt-1 w-full"
                  onKeyDown={handleKeyDown}
                  role="dialog"
                  aria-label="Search ingredients"
                  id="ingredient-command"
                >
                  <Command className="border-cream-200 rounded-lg border shadow-md">
                    <CommandInput
                      placeholder="Search ingredients..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      ref={inputRef}
                      className="border-b-cream-200"
                    />
                    <CommandList>
                      <CommandEmpty>No ingredients found.</CommandEmpty>
                      <CommandGroup
                        heading="Available Ingredients"
                        className="text-espresso-600"
                      >
                        {availableIngredients.map((ingredient) => (
                          <CommandItem
                            key={ingredient}
                            onSelect={() => addIngredient(ingredient)}
                            className="text-espresso-800 hover:bg-cream-100 cursor-pointer"
                          >
                            <Search className="text-espresso-400 mr-2 h-4 w-4" />
                            {ingredient}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
