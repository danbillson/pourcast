import { Cocktail } from "@/lib/types";

export const cocktails: Cocktail[] = [
  {
    id: "mojito-lime",
    name: "Lime Mojito",
    ingredients: ["Lime", "Mint Leaves", "White Rum", "Soda Water", "Sugar"],
    instructions:
      "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with crushed ice. Pour the rum and top with soda water. Garnish with mint leaves and a lime wedge.",
    image: "/images/mojito.jpg",
    submittedBy: "Emma Rodriguez",
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    ingredients: [
      "Bourbon",
      "Angostura Bitters",
      "Sugar Cube",
      "Water",
      "Orange Peel",
    ],
    instructions:
      "Place sugar cube in an Old Fashioned glass and saturate with bitters. Add a dash of water, muddle until dissolved. Fill the glass with ice cubes and add bourbon. Garnish with orange peel.",
    image: "/images/old-fashioned.jpg",
    submittedBy: "Classic Bar Manual",
  },
  {
    id: "margarita",
    name: "Margarita",
    ingredients: ["Tequila", "Triple Sec", "Lime Juice", "Salt"],
    instructions:
      "Rub the rim of a glass with lime juice and dip in salt. Shake tequila, triple sec, and lime juice with ice and strain into the glass. Garnish with a lime wheel.",
    image: "/images/margarita.jpg",
    submittedBy: "Cocktail Association",
  },
  {
    id: "negroni",
    name: "Negroni",
    ingredients: ["Gin", "Campari", "Sweet Red Vermouth"],
    instructions:
      "Stir all ingredients with ice and strain into a rocks glass over a large ice cube. Garnish with an orange peel.",
    image: "/images/negroni.jpg",
    submittedBy: "Italian Mixology Institute",
  },
  {
    id: "whiskey-sour",
    name: "Whiskey Sour",
    ingredients: ["Bourbon", "Lemon Juice", "Simple Syrup", "Egg White"],
    instructions:
      "Shake all ingredients with ice. Strain into a rocks glass over fresh ice. Optionally garnish with a lemon wheel and cherry.",
    image: "/images/whiskey-sour.jpg",
    submittedBy: "American Bartenders Guild",
  },
];
