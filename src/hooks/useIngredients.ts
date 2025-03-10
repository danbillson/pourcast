"use client";

import { clientIngredientsParsers } from "@/lib/client-params";
import { useQueryState } from "nuqs";

export function useIngredients() {
  return useQueryState("ingredient", clientIngredientsParsers.ingredient);
}
