package ibf2021.assessment.csf.server.controllers;

import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

/* Write your request hander in this file */

@RestController
@RequestMapping(path="/api/recipe/", produces=MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {

    private final Logger logger = Logger.getLogger(RecipeRestController.class.getName());

    @Autowired
    RecipeService recipeSvc;

    @GetMapping("{recipeId}")
    public ResponseEntity<String> getRecipe(@PathVariable(value = "recipeId") String id) {

        Optional<Recipe> mayHaveRecipe = recipeSvc.getRecipeById(id);
        String errMessage = "Recipe ID not found";

        if (mayHaveRecipe.isPresent()) {
            List<String> ingredientsList = mayHaveRecipe.get().getIngredients();
            JsonArrayBuilder jsonArrIngredientsBuilder = Json.createArrayBuilder();
            for (String ingredient : ingredientsList)
                jsonArrIngredientsBuilder.add(ingredient);
            JsonArray jsonArrIngredients = jsonArrIngredientsBuilder.build();

            JsonObject jsonRecipeDetails = Json.createObjectBuilder()
                .add("recipeId", mayHaveRecipe.get().getId())
                .add("recipeName", mayHaveRecipe.get().getTitle())
                .add("recipeImageURL", mayHaveRecipe.get().getImage())
                .add("recipeInstruction", mayHaveRecipe.get().getInstruction().toString())
                .add("recipeIngredients", jsonArrIngredients.toString())
                .build();

            logger.log(Level.INFO, "Json Data : %s".formatted(jsonRecipeDetails)+".");
            return ResponseEntity.status(HttpStatus.OK).body(jsonRecipeDetails.toString());
        } else {
            JsonObject err = Json.createObjectBuilder()
                .add("error", errMessage)
                .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
        }

        
    }
}