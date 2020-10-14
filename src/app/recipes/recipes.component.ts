import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecipeCollection} from '../../models/RecipeCollection';
import {RecipeGetResponse} from '../../models/RecipeGetResponse';
import {RecipeRequest} from '../../models/RecipeRequest';
import {RecipeService} from '../../services/recipe.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogModel} from '../../models/ConfirmDialogModel';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipes',
  templateUrl: `./recipes.component.html`,
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: RecipeGetResponse[];
  filterBy = 'all';
  sortBy = 'all';
  visibleRecipes: RecipeGetResponse[];
  model: RecipeRequest;
  searchTerm: string;
  recipeCollections: RecipeCollection[] = [];
  anyCollection = {};

  constructor(private recipeService: RecipeService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.recipes = [];
    this.model = new RecipeRequest();
    this.searchTerm = '';
  }

  ngOnInit(): void {
    this.getAllRecipes();
    this.getRecipeCollections();
  }

  onAddRecipeClick(): void {
    this.router.navigate(['recipes/add']);
  }

  onSubmit(evt): void {
    if (evt && evt.target.value !== '') {
      console.log('submitted!');
      const newRecipe = new RecipeGetResponse();
      newRecipe.recipe.name = evt.target.value;
      this.recipes.push(newRecipe);
      evt.target.value = '';
    }
  }

  filter(event: any): void {
    const filterBy = event.target.value;
    console.warn('filter: ' + filterBy);
    if (filterBy) {
      this.visibleRecipes = this.recipes.filter(recipe => {
        return recipe.recipe.name.includes(filterBy) || recipe.recipe.description.includes(filterBy)
          || recipe.recipe.source.display_name.includes(filterBy);
      });
    }
  }

  sort(sort: string): void {
    this.sortBy = sort;
    console.warn('sort: ' + this.sortBy);
    if (this.sortBy === 'name') {
      this.recipes.sort((a, b) => a.recipe.name > b.recipe.name ? 1 : -1);
    } else if (this.sortBy === 'collection') {
      this.recipes.sort((a, b) => {
        if (a.recipe.saved.collections && b.recipe.saved.collections) {
          return a.recipe.saved?.collections[0].id > b.recipe.saved?.collections[0].id ? 1 : -1;
        }
      });
    }
    // else if (sort === 'date') {
    //   this.recipes.sort((a, b) => a.payload. > b.name ? 1 : -1);
    // }
  }

  getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(response => {
      this.recipes = response.recipes;
      this.visibleRecipes = response.recipes;
    });
  }

  getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe();
  }

  addRecipe(recipe: RecipeRequest): void {
    this.recipeService.addRecipe(recipe).subscribe();
  }

  updateRecipe(id: string, recipe: RecipeRequest): void {
    this.recipeService.updateRecipe(id, recipe).subscribe();
  }

  deleteRecipe(id: string): void {
    const dialogData = new ConfirmDialogModel('Are you sure you want to delete this?', 'message', 'Yes', 'No');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      panelClass: 'confirmDialog'
    });

    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.recipeService.deleteRecipe(id).subscribe(response => {
          this.recipes = this.recipes.filter(recipe => recipe.recipe.id !== id);
          location.reload();
          this.snackBar.open('Deleted recipe', 'OK', {duration: 3000});
        });
      }
    });
  }

  getRecipeCollections(): void {
    this.recipeService.getRecipeCollections().subscribe((collection) => this.anyCollection = collection);
    // this.recipeService.getCollections().subscribe(collection => this.recipeCollections = collection.collections);
  }

  getRecipeCollectionName(id: string): string {
    return this.recipeCollections.find((collection) => collection.collection.id === id).collection.name;
  }

}
