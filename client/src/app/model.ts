export interface Recipe {
  recipeId: string
  recipeName: string
  recipeImageURL: string
  recipeInstruction: string
  recipeIngredients: Ingredient[]
}

export interface Ingredient {
  ingredient: string
}

export interface RecipeDetails extends Recipe {
  recipeImageURL: string
  recipeInstruction: string
  recipeIngredients: Ingredient[]
}
