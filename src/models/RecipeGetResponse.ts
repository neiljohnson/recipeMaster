import {Ingredient} from './Ingredient';
import {Durations} from './RecipeRequest';

export class RecipeGetResponse {
  recipe: {
    description: string;
    durations: Durations;
    name: string;
    id: string;
    images: Image[];
    ingredients: Ingredient[];
    instructions: Instruction;
    normalized_ingredients: NormalizedIngredient[];
    language: string;
    servings: number;
    source?: Source;
    saved?: Saved;
    user: Saved;
  };
}

export class Image {
  original: {
    url: string;
  };
  responsive: {
    url: string;
  };
}

export class Saved {
  collections: Collection[];
  owner: boolean;
  type: string;
  value: boolean;
}

export class Collection {
  id: string;
}

export class Source {
  display_name: string;
  name: string;
  source_recipe_url: string;
}

export class Instruction {
  steps: Step[];
}

export class Step {
  text: string;
  group: string;
}

export class NormalizedIngredient {
  id: string;
  analysis: {
    product: {
      original_name: string;
      canonical_name: string;
    };
    category: {
      canonical_name: string;
    };
    image_url: string;
    unit: string;
    quantity: number;
    comment: string;
  };
  source_text: string;
}
