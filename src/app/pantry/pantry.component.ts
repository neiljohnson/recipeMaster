import {Component, OnInit, ViewChild} from '@angular/core';
import {List} from '../../models/List';
import {Item} from '../../models/Item';
import {ListService} from '../../services/list.service';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent implements OnInit {
  @ViewChild('auto') auto;

  pantry: List;
  model;
  autocompleteProducts;
  filterString = '';
  sortString = 'all';
  selected = 'displayName';
  visibleItems: Item[] = [];

  constructor(private listService: ListService, private snackBar: MatSnackBar) {
    this.pantry = new List();
    this.autocompleteProducts = [];
  }

  ngOnInit(): void {
    this.listService.getPantry().subscribe(list => {
      this.pantry = list;
    });
  }

  onSelect(product: any): void {
    const itemsToAdd = [];
    const item = new Item();
    item.name = product.name.toLocaleLowerCase();
    itemsToAdd.push(item);
    this.addItem(this.pantry.id, item);
    this.openSnackBar('Added item: ' + item.name, 'OK');
    this.clearPanel(event);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onChangeSearch(val: string): void {
    this.autocompleteProducts = this.listService.findProducts(val);
    console.warn('this error');
    const item = {
      displayName: val,
      name: val,
      imageUrl: 'https://asaanrecipes.com/wp-content/themes/asaan_recipes/assets/img/placeholder.jpg',
      analysis: {
        category: {
          name: 'CUSTOM'
        }
      }
    };
    const index = this.autocompleteProducts.findIndex(element => element.displayName.toLowerCase() === item.displayName.toLowerCase());
    if (index === -1 ) {
      this.autocompleteProducts.unshift(item);
    }
  }

  addItem(listId: string, item: Item): void {
    this.listService.addItemToList(listId, item).subscribe(response => {
      this.pantry.items.push(response.items[0]);
      this.visibleItems.push(response.items[0]);
    });
  }

  clearPanel(e): void {
    e.stopPropagation();
    this.auto.clear();
  }

  sortItems(): void {
    if (this.sortString === 'alph') {
      this.pantry.items.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    } else if (this.sortString === 'cat') {
      this.pantry.items.sort((a, b) => {
        return a.analysis.category.name > b.analysis.category.name ? 1 : -1;
      });
    } else if (this.sortString === 'date') {
      this.pantry.items.sort((a, b) => {
        return a.updatedAt > b.updatedAt ? 1 : -1;
      });
    }
  }

  filterItems(event: any): void {
    this.filterString = event.target.value;
    this.visibleItems = this.pantry.items.slice(0);
    this.visibleItems.filter(item =>  item.name.includes(this.filterString));
  }


  onSubmit(evt): void {
    if (evt && evt.target.value !== '') {
      console.log('submitted!');
      const newItem = new Item();
      newItem.name = evt.target.value;
      this.pantry.items.push(newItem);
      evt.target.value = '';
    }
  }

  getList(id: string): Subscription {
    return this.listService.getList(environment.baseUrl + id).subscribe(pantry => {
      this.pantry = pantry;
    });
  }

  addItems(listId: string, items: Item[]): void {
    this.listService.addItemsToList(listId, items).subscribe(response => {
      // @ts-ignore
      return this.pantry.items.push(response.items);
    });
  }

  updateItem(listId: string, item: Item): void {
    this.listService.updateItem(listId, item).subscribe(response => {

    });
  }

  deleteItemFromList(listId: string, itemId: string): void {
    this.listService.deleteItem(listId, itemId).subscribe();
  }

  getPantry(): void {
    this.listService.getPantry().subscribe(list => {
      this.pantry = list;
    });
  }

  resetForm(): void {
    this.model = {};
  }

  delete(item: any): void {
    this.deleteItemFromList(this.pantry.id, item.id);
    this.pantry.items = this.pantry.items.filter(element => element.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase());
    this.openSnackBar('Deleted item: ' + name, 'OK');
  }

  findLocation(item: any): string {
    return this.listService.findProductLocation(item.name);
  }
}
