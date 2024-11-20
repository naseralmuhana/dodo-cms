import { ProductIngredientSchema } from "./validation"

export const productsIngredients: ProductIngredientSchema[] = [
  { productId: 1, ingredientId: 1, isBase: true },
  { productId: 1, ingredientId: 1 },
  { productId: 1, ingredientId: 2 },
  { productId: 1, ingredientId: 3 },
  { productId: 1, ingredientId: 4 },
  { productId: 1, ingredientId: 5 },
  { productId: 2, ingredientId: 6 },
  {
    productId: 2,
    ingredientId: 4,
    isBase: true
  },
  { productId: 2, ingredientId: 7, isBase: true },
  { productId: 2, ingredientId: 8 },
  { productId: 2, ingredientId: 9 }
]
