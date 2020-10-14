import {Ingredient} from './Ingredient';

export class RecipeResponse {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  images: any[];
  videos: any[];
  source: Source;
  numberOfServings: number;
  durations: Durations;
}

export class Source {
  displayName: string;
  sourceRecipeUrl: string;
  license: string;
}

export class Durations {
  cookTime: number;
  prepTime: number;
  totalTime: number;
}
