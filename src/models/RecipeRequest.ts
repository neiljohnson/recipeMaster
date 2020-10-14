import {Ingredient} from './Ingredient';
import {Instruction} from './Instruction';

export class RecipeRequest {
  payload: Payload;
  collection_ids: string[];
  recipe_mask: {
    paths: [
      'normalized_ingredients',
      'instructions',
      'nutrition'
    ]
  };
  update_mask: {
    paths: [
      'payload',
      'collection_ids'
    ]
  };

  constructor() {
    this.payload = new Payload();
    this.collection_ids = [];
  }

  // saved: Collections;
  // recipes: RecipeRequest[];
  //
  // user: Collections;
  // imageUrl: string;
  // url: string;
}

export class Payload {
  id: string;
  name: string;
  description: string;
  images?: Image[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  source: Source;
  durations: Durations;
  // language: string;
  servings: number;
  // category: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.images = [];
    this.images[0] = new Image();
    this.ingredients = [];
    this.ingredients[0] = new Ingredient();
    this.instructions = [];
    this.instructions[0] = new Instruction();
    this.source = new Source();
    this.durations = new Durations();
    // this.language = '';
    this.servings = undefined;
    // this.category = '';
  }

}

export class Image {
  url?: string;
  constructor() {
    this.url = '';
  }
}

export class Source {
  source_recipe_url: string;
  display_name: string;
}

export class Durations {
  cook_time: number;
  prep_time: number;
}
