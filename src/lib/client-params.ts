"use client";

import { parseAsArrayOf, parseAsString } from "nuqs";

// Client-side parsers
export const clientIngredientsParsers = {
  ingredient: parseAsArrayOf(parseAsString),
};
