"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export function useIngredients() {
  return useQueryState("ingredient", parseAsArrayOf(parseAsString));
}
