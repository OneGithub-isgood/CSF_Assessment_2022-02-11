import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient, Recipe, RecipeDetails } from './model';
import { RecipeService } from './recipeService';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  form!: FormGroup
  ingredientsArray!: FormArray

  constructor(private router: Router, private fb: FormBuilder, private recipeSvc: RecipeService) { }

  ngOnInit(): void {
    this.form = this.getForm()
    this.ingredientsArray = this.form.get('recipeIngredients') as FormArray
  }

  private getForm(recipe: Partial<Recipe> = {}): FormGroup {
    this.ingredientsArray = this.createLineItems([])
    return this.fb.group({
      title: this.fb.control('', [ Validators.required, Validators.minLength(3) ]),
      instruction: this.fb.control('', [ Validators.required, Validators.minLength(3) ]),
      image: this.fb.control('', [ Validators.required ]),
      ingredients: this.createLineItems(recipe?.recipeIngredients)
    })

  }

  addIngredientItem() {
    this.ingredientsArray.push(this.createLineItem())
  }

  private createLineItem(li: Partial<Ingredient> = {}): FormGroup {
    return this.fb.group({
      ingredient: this.fb.control(li?.ingredient || '', [ Validators.minLength(3), Validators.required ]),
    })
  }

  private createLineItems(li: Ingredient[] = []): FormArray {
    const lis = this.fb.array([], [ Validators.minLength(1) ])
    for (let l of li)
      lis.push(this.createLineItem(l))
    return lis
  }

  isValid() {
    return this.form.valid && (this.ingredientsArray.length > 0)
  }

  processForm() {
    if (!this.isValid) {
      alert('Your recipe is incomplete')
      return
    }
    const recipe = this.form.value as Recipe
    this.form = this.getForm();
    this.ingredientsArray = this.form.get('recipeIngredients') as FormArray
  }

}
