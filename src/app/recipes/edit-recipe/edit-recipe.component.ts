import { Component, OnInit } from '@angular/core';
import {RecipeRequest} from '../../../models/RecipeRequest';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../../services/recipe.service';
import {RecipeCollection, RecipeCollectionParent} from '../../../models/RecipeCollection';
import {RecipeGetResponse} from '../../../models/RecipeGetResponse';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  public model: RecipeGetResponse = new RecipeGetResponse();
  public recipeCollections: RecipeCollection[] = [];
  public recipeCollectionsParent: RecipeCollectionParent;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  public ngOnInit(): void {
    this.getRecipe(this.route.snapshot.params.id);
    this.getRecipeCollections();
  }

  private getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe((recipe) => this.model = recipe);
  }

  private getRecipeCollections(): void {
    this.recipeService.getRecipeCollections().subscribe((recipeCollectionsParent) => {
      this.recipeCollectionsParent = recipeCollectionsParent;
      this.recipeCollections = this.recipeCollectionsParent.collections;
    });
  }

  onBackButtonClicked() {
    this.router.navigate(['recipes']);
  }
}
