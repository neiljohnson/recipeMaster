import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../../services/recipe.service';
import {RecipeCollection, RecipeCollectionParent} from '../../../models/RecipeCollection';
import {NormalizedIngredient, RecipeGetResponse} from '../../../models/RecipeGetResponse';
import {Item} from '../../../models/Item';
import {ListService} from '../../../services/list.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {List} from '../../../models/List';
import {ConfirmDialogModel} from '../../../models/ConfirmDialogModel';
import {CanComponentDeactivate} from '../../../services/route-guard.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-read-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
  providers: [MatSnackBar]
})
export class ViewRecipeComponent implements OnInit, CanComponentDeactivate {
  public recipe: RecipeGetResponse = new RecipeGetResponse();
  public recipeCollections: RecipeCollection[] = [];
  public recipeCollectionsParent: RecipeCollectionParent;
  public lists: List[] = [];

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private listService: ListService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getRecipe(this.route.snapshot.params.id);
    this.getRecipeCollections();
    this.getAllLists();
  }

  private getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe((recipe) => this.recipe = recipe);
  }

  private getRecipeCollections(): void {
    this.recipeService.getRecipeCollections().subscribe((recipeCollectionsParent) => {
      this.recipeCollectionsParent = recipeCollectionsParent;
      this.recipeCollections = this.recipeCollectionsParent.collections;
    });
  }

  public getRecipeCollectionName(id: string): string {
    return this.recipeCollections.find((recipeCollection) => recipeCollection.collection.id === id).collection.name;
  }

  onBackButtonClicked() {
    this.router.navigate(['recipes']);
  }

  delete(item: any): void {
    // this.deleteItemFromList(this.pantry.id, item.id);
    // this.pantry.items = this.pantry.items.filter(element => element.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase());
    // this.snackBar.open('Deleted item: ' + name, 'OK', {duration: 3000});
  }

  deleteItemFromList(listId: string, itemId: string): void {
    this.listService.deleteItem(listId, itemId).subscribe();
  }

  findLocation(normalizedIngredient: NormalizedIngredient): string {
    return this.listService.findProductLocation(normalizedIngredient.analysis.product.original_name);
  }

  addItemsToShoppingList(listId: string, items: Item[]): void {
    this.listService.addItemsToList(listId, items).subscribe(response => {
      // @ts-ignore
      console.log('added items to list response: ' + response);
      this.snackBar.open('added items to list','OK', {duration: 3000});
    });
  }

  addNormalizedItemsToShoppingList(listId: string): void {
    this.listService.addNormalizedItemsToList(listId, this.recipe.recipe.normalized_ingredients).subscribe(response => {
      console.log('added item to list response: ' + response);
      this.snackBar.open('added items to list','OK', {duration: 3000});
    });
  }

  getAllLists() {
    this.listService.getAllLists().subscribe(lists => this.lists = lists);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const dialogData = new ConfirmDialogModel('Are you sure you want to delete this?', 'message', 'Yes', 'No');
    const dialogRef = this.dialog.open(ConfirmDialogModel, {
      data: dialogData,
      panelClass: 'confirmDialog'
    });

    return dialogRef.afterClosed().pipe(tap(isConfirmed => {

    })).toPromise();
  }

}
