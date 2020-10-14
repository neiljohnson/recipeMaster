// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  whiskToken: '3dngasjR0WgQt1I8uJB8XnxnnXdzVxNSkrN4gjWKyGlFlerAS5yutadcfe89YSkj',
  myBaseUrl: 'https://my.whisk.com/api/grpc/v1/',
  baseUrl: 'https://graph.whisk.com/v1/',
  apiKey: '387429317192936',

  // LIST
  shoppingListUrl: 'https://graph.whisk.com/v1/lists/',
  allShoppingListsUrl: 'https://graph.whisk.com/v1/lists',
  shoppingListFavoritesUrl: 'https://graph.whisk.com/v1/lists/items/favorite',
  shoppingListRecentUrl: 'https://my.whisk.com/api/grpc/v1/lists/items/recent',
  shoppingListAnalysisUrl: 'https://graph.whisk.com/v1/lists/analyze',
  shoppingListItemDiffUrl: 'https://my.whisk.com/api/grpc/v1/lists/:id/items',
  shoppingListAddItemUrl: 'https://graph.whisk.com/v1/lists/:id/items',
  shoppingListDeleteItemUrl: 'https://graph.whisk.com/v1/lists/:listId/items/:itemId',

  shoppingListTrackUrl: 'https://events.whisk.com/v1/track',

  // RECIPES
  //recipeUrl: 'https://graph.whisk.com/v1/recipes/',
  recipeUrl: 'https://my.whisk.com/api/grpc/v1/recipes',
  recipeExtractUrl: 'https://my.whisk.com/api/grpc/v1/recipes/extract',
  getRecipeUrl: 'https://my.whisk.com/api/grpc/v1/recipes/{:id}?recipe_mask.paths=normalized_ingredients&recipe_mask.paths=instructions&recipe_mask.paths=nutrition',
  recipeCollectionsUrl: 'https://my.whisk.com/api/grpc/v1/collections',
  addListItemUrl: 'https://graph.whisk.com/v1/lists/:listId/items',

  // CALENDAR
  mealPlanUrl: 'https://graph.whisk.com/v1/meals/plan',
  calendarCategoriesUrl: 'https://graph.whisk.com/v1/recipes/categories/',

  uploadImageUrl: 'https://api.cloudinary.com/v1_1/whisk/image/upload',
  analyzeUrl: 'https://graph.whisk.com/v1/analysis/items/analyze',

  // CART
  retailers: 'https://my.whisk.com/api/grpc/v1/retailers?country=US&zip_code=84015',

  walmartLogoUrl: 'https://whisk-res.cloudinary.com/image/upload/v1567766100/retailers/logos/akukbrob1opiwjblh6xo.png',

  autocompleteUrl: 'https://cdn.whisk.com/autocomplete/v1/it/all.json',
  loginUrl: 'https://login.whisk.com/x/v1/auth/anonymous/create',
  getUserIdUrl: 'https://my.whisk.com/api/grpc/v1/me'
};

/* {"items":[{"source_text":"rice","analysis":{"product":{"canonical_name":"RICE","original_name":"rice"},"category":{"canonical_name":"PASTA, RICE AND BEANS"},"image_url":"https://whisk-res.cloudinary.com/image/upload/v1550764481/graph/fooddb/1871de09263f54f1a53de71e4c5e5b0c.jpg"}}]}
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
