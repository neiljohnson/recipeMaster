import {Analysis} from './Analysis';
import {Time} from '@angular/common';

export class Item {
  id: string;
  name: string;
  checked?: boolean;
  analysis?: Analysis;
  count?: number;
  quantity?: number;
  unit?: string;
  imageUrl: string;
  createdTime?: Time;
  updatedAt?: Time;
  hasUserComment?: boolean;

  recipe?: string;
  recipeOrdering?: number;

  // category: string;
  // expDate: Date;

  // id: string;
  // name: string;
  // quantity: number;
  // unit: string;
  comment?: string;
}

