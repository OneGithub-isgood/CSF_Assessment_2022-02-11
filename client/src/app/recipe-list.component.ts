import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from './model';
import { RecipeService } from './recipeService';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  availableRecipes: Recipe[] = []

  constructor(private router: Router, private recipeSrv: RecipeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewAllRecipes()
  }

  viewAllRecipes() {
    this.recipeSrv.getAllRecipes()
      .then(r => this.availableRecipes = r)
  }

}
