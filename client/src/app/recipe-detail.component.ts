import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDetails } from './model';
import { RecipeService } from './recipeService';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: RecipeDetails
  recipeId = ''

  constructor(private activateRoute: ActivatedRoute, private router: Router, private recipeSrv: RecipeService) { }

  ngOnInit(): void {
    this.recipeId =  this.activateRoute.snapshot.params['recipeId']

    this.recipeSrv.getIndividualRecipe(this.recipeId)
      .then(r => this.recipe = r)

  }


}
