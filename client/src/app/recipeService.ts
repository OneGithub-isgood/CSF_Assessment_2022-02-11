import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Recipe, RecipeDetails } from "./model";

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(): Promise<Recipe[]> {
    return lastValueFrom(
      this.http.get<Recipe[]>('/api/recipes')
    )
  }

  getIndividualRecipe(recipeId: string): Promise<RecipeDetails> {
    return lastValueFrom(
      //this.http.get<RecipeDetails>(`http://localhost:8080/api/recipe/${recipeId}`)
      this.http.get<RecipeDetails>(`/api/recipe/${recipeId}`)
    )
  }
}
