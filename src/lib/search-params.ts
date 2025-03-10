import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";

// Server-compatible parsers
export const ingredientsParsers = {
  ingredient: parseAsArrayOf(parseAsString),
};

// Server-side cache
export const ingredientsCache = createSearchParamsCache(ingredientsParsers);

// Export the same parsers for client usage
export const useIngredientsParams = ingredientsParsers;
