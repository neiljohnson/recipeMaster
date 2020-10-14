import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {List} from '../models/List';
import {Observable} from 'rxjs';
import {Item} from '../models/Item';
import autocompleteProducts from '../assets/autocomplete.json';
import {NormalizedIngredient} from '../models/RecipeGetResponse';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  pantry: List;
  products: any;

  constructor(private httpClient: HttpClient) {
  }

  getAllLists(): Observable<List[]> {
    return this.httpClient.get<List[]>(environment.allShoppingListsUrl);
  }

  getList(id: string): Observable<List> {
    return this.httpClient.get<List>(environment.baseUrl + id);
  }

  updateList(id: string, list: List): Observable<List> {
    return this.httpClient.put<List>(environment.baseUrl + id, list);
  }

  updateItem(listId: string, item: Item): Observable<List> {
    const items = [];
    items.push(item);
    return this.httpClient.put<List>(environment.baseUrl + listId + '/items', {items});
  }

  addItemsToList(id: string, items: Item[]): Observable<List> {
    return this.httpClient.post<List>(environment.baseUrl + id + '/items', {items});
  }

  addItemToList(id: string, item: Item): Observable<List> {
    const items = [];
    items.push(item);
    return this.httpClient.post<List>(environment.baseUrl + id + '/items', {items});
  }

  addNormalizedItemToList(listId: string, ingredient: NormalizedIngredient): Observable<List> {
    const items = [];
    items.push(this.normalizedIngredientToNormal(ingredient));
    return this.httpClient.post<List>(environment.baseUrl + listId + '/items', {items});
  }

  addNormalizedItemsToList(id: string, ingredients: NormalizedIngredient[]): Observable<List> {
    const items = [];
    ingredients.forEach(ingredient => {
      items.push(this.normalizedIngredientToNormal(ingredient));
    });
    return this.httpClient.post<List>(environment.baseUrl + id + '/items', {items});
  }

  normalizedIngredientToNormal(ingredient: NormalizedIngredient): Item {
    let item = new Item();
    item.name = ingredient.analysis.product.original_name;
    // item.id = ingredient.id;
    item.imageUrl = ingredient.analysis.image_url;
    item.quantity = ingredient.analysis.quantity;
    item.comment = ingredient.analysis.comment;
    return item;
  }

  deleteItem(listId: string, itemId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + listId + '/items/' + itemId);
  }

  addList(list: List): Observable<List> {
    return this.httpClient.post<List>(environment.allShoppingListsUrl, list);
  }

  deleteList(id: string): void {
    this.httpClient.delete(environment.shoppingListUrl + id);
  }

  // initPantry(): void {
  //   this.getAllLists().subscribe(lists => {
  //     this.pantry = lists.find(list => list.name === 'Pantry');
  //     if (!this.pantry) {
  //       const newList = new List();
  //       newList.name = 'Pantry';
  //       this.addList(newList).subscribe(list => {
  //         this.pantry = list;
  //       });
  //     } else {
  //       this.getList(this.pantry.id).subscribe(list => {
  //         this.pantry = list;
  //       });
  //     }
  //   });
  // }

  getPantry(): Observable<List> {
    return this.httpClient.get<List>(environment.baseUrl + '106de3518233d7249b290191eb848b75866');
  }

  findProducts(searchTerm: string) {
    console.log('search term: ' + searchTerm);
    // return this.products.find(product => product.name.contains(searchTerm));
    return autocompleteProducts.products.filter(product => product.name.toLowerCase().includes(searchTerm)).slice(0, 4);
  }

  findProductLocation(searchTerm) {
    const product = autocompleteProducts.products.find(product => product.name.toLocaleLowerCase() === searchTerm.toLocaleLowerCase()
      || product.displayName.toLocaleLowerCase() === searchTerm.toLocaleLowerCase()
    );
    return (product) ? product.metadata.storing.defaultLocation : 'None';
  }

  getProducts(): any[] {
    return this.products;
  }
}
