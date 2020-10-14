import {Item} from './Item';
import {Time} from '@angular/common';
import {RecipeRequest} from './RecipeRequest';

export class List {
  id: string;
  name: string;
  primary: boolean;
  createdTime: Time;
  updatedTime: Time;
  itemsCount: number;
  groupedItemsCount: number;
  items: Item[];

  sync: Time;
  combinedItems: Item[];
  recipes: RecipeRequest[];
}
