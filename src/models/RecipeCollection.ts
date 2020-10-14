import {Image} from './RecipeGetResponse';

export class RecipeCollectionParent {
  collections: RecipeCollection[];
}

export class RecipeCollection {
  access: {
    mode: string;
    role: string;
  };
  collection: {
    id: string;
    name: string;
    shoppingList: boolean;
  };
  recipe_count: number;
  sample_recipe_images: Image[];
}
