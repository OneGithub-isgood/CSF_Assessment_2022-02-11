package ibf2021.assessment.csf.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;

/* Write your request hander in this file */

@RestController
@RequestMapping(path="/api/recipes", produces=MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {

    @Autowired
    private RecipeService recipeSvc;

    @GetMapping()
    public ResponseEntity<String> getRecipes() {
        List<Recipe> recipes = recipeSvc.getAllRecipes();

        JsonArrayBuilder jsonArrRecipes = Json.createArrayBuilder();
        for (Recipe recipe : recipes) {
            JsonObjectBuilder jsonObjRecipe = Json.createObjectBuilder()
                .add("recipeId", recipe.getId().toString())
                .add("recipeName", recipe.getTitle().toString());
            jsonArrRecipes.add(jsonObjRecipe);
        }
        JsonArray jsonRecipesLibrary = jsonArrRecipes.build();
        
        return ResponseEntity.ok(jsonRecipesLibrary.toString());
    }
}