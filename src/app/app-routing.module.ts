import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PantryComponent} from './pantry/pantry.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {MealPlannerComponent} from './meal-planner/meal-planner.component';
import {ViewRecipeComponent} from './recipes/view-recipe/view-recipe.component';
import {AddRecipeComponent} from './recipes/add-recipe/add-recipe.component';
import {EditRecipeComponent} from './recipes/edit-recipe/edit-recipe.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RouteGuardService} from '../services/route-guard.service';


const routes: Routes = [
  {path: 'pantry/:id', component: PantryComponent},
  {path: 'pantry', component: PantryComponent, pathMatch: 'full'},
  {path: 'shoppingList/:id', component: ShoppingListComponent},
  {path: 'shoppingList', component: ShoppingListComponent, pathMatch: 'full'},
  {path: 'mealPlanning/:id', component: MealPlannerComponent},
  {path: 'mealPlanning', component: MealPlannerComponent, pathMatch: 'full'},
  {path: 'recipes/view/:id', component: ViewRecipeComponent},
  {path: 'recipes/add', component: AddRecipeComponent, pathMatch: 'full'},
  {path: 'recipes/edit/:id', component: EditRecipeComponent, pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, pathMatch: 'full'},
  // {path: 'recipes', component: RecipesComponent, pathMatch: 'full', canDeactivate: [RouteGuardService]},
  {path: 'cart/:id', component: ShoppingListComponent},
  {path: 'cart', component: ShoppingListComponent, pathMatch: 'full'},
  {path: '', redirectTo: '/pantry', pathMatch: 'full'},
  {path: '**', redirectTo: '/pantry'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
