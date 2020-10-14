import {Component, OnInit} from '@angular/core';
import {RecipeRequest} from '../../../models/RecipeRequest';
import {RecipeCollectionParent, RecipeCollection} from '../../../models/RecipeCollection';
import {RecipeService} from '../../../services/recipe.service';
import {Category} from '../../../models/Category';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  styleUrls: ['./add-recipe.component.scss'],
  templateUrl: './add-recipe.component.html'
})
export class AddRecipeComponent implements OnInit {
  public model: RecipeRequest = new RecipeRequest();
  public recipeCollections: RecipeCollection[] = [];
  public recipeCollectionParent: RecipeCollectionParent;
  public categories: Category[] = [];
  public file: File = null;

  constructor(private recipeService: RecipeService, private snackBar: MatSnackBar, private router: Router) {
  }

  public ngOnInit(): void {
    this.getRecipeCollections();
  }

  getRecipeCollections(): void {
    this.recipeService.getRecipeCollections().subscribe(recipeCollectionParent => {
      this.recipeCollectionParent = recipeCollectionParent;
      this.recipeCollections = this.recipeCollectionParent.collections;
    });
  }

  onSubmit() {
    this.recipeService.addRecipe(this.model).subscribe();
    this.snackBar.open("Successfully created recipe", "OK", {
      duration: 3000,
    });
    this.router.navigate(['recipes']);
  }

  onBackButtonClicked() {
    this.router.navigate(['recipes']);
  }

  onFileUpload(fileToUpload: File) {
    this.recipeService.uploadImage(fileToUpload).then(result => {
      result.subscribe(response => {
        console.warn(response.url);
        this.model.payload.images[0].url = response.url;
      });
    });
  }
}
