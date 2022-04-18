import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     1,
  //     'A test recipe',
  //     'This is simply a test',
  //     'https://media.istockphoto.com/photos/sabudana-vada-or-sago-vada-picture-id1345152231?s=612x612',
  //     [new Ingredient('meat', 1), new Ingredient('french fries', 3)]
  //   ),
  //   new Recipe(
  //     2,
  //     'A Second test recipe',
  //     'This is simply a test',
  //     'https://media.istockphoto.com/photos/sabudana-vada-or-sago-vada-picture-id1345152231?s=612x612',
  //     [new Ingredient('meat', 1), new Ingredient('french fries', 3)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push({ id: this.recipes.length, ...recipe });
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index - 1] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== index);
    this.recipesChanged.next(this.recipes.slice());
  }
}
