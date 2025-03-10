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
            {/* Selected ingredients display */}
            <div className="mb-4 flex flex-wrap gap-2">
              {(selectedIngredients || []).length > 0 ? (
                (selectedIngredients || []).map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {ingredient}
                    <X
                      className="h-3 w-3 cursor-pointer"
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
                <p className="text-sm text-muted-foreground">
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
                className="w-full justify-start"
                aria-expanded={isSearchOpen}
                aria-haspopup="listbox"
                aria-controls="ingredient-command"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
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
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput
                      placeholder="Search ingredients..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      ref={inputRef}
                    />
                    <CommandList>
                      <CommandEmpty>No ingredients found.</CommandEmpty>
                      <CommandGroup heading="Available Ingredients">
                        {availableIngredients.map((ingredient) => (
                          <CommandItem
                            key={ingredient}
                            onSelect={() => addIngredient(ingredient)}
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
          </div>
        </div>
      </div>
    </div>
  );
};
