export type Cocktail = {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  submittedBy?: string;
};

export type Ingredient = {
  name: string;
};
