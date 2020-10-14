import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeRequest} from '../models/RecipeRequest';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {RecipeCollectionParent} from '../models/RecipeCollection';
import {RecipeGetResponse} from '../models/RecipeGetResponse';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient) {
  }

  getAllRecipes(): Observable<any> {
    return this.httpClient.get<any>(environment.recipeUrl);
  }

  getRecipe(id: string): Observable<RecipeGetResponse> {
    return this.httpClient.get <RecipeGetResponse>(environment.getRecipeUrl.replace("{:id}", id));
  }

  updateRecipe(id: string, recipe: RecipeRequest): Observable<RecipeRequest> {
    return this.httpClient.put<RecipeRequest>(environment.recipeUrl + "/" + id, recipe);
  }

  addRecipe(recipe: RecipeRequest): Observable<RecipeRequest> {
    return this.httpClient.post<RecipeRequest>(environment.recipeUrl, recipe);
  }

  deleteRecipe(id: string) {
    return this.httpClient.delete(environment.recipeUrl + "/" + id);
  }

  getRecipeCollections(): Observable<RecipeCollectionParent> {
    return this.httpClient.get<RecipeCollectionParent>(environment.recipeCollectionsUrl);
  }

  async uploadImage(fileToUpload: File) {
    const file = await this.changeFile(fileToUpload);
    let payload = {
      api_key: environment.apiKey,
      upload_preset: 'v3-recipe-upload',
      file: file
    };
    return this.httpClient.post<any>(environment.uploadImageUrl, payload);
  }

  async changeFile(file: File) {
    return new Promise(((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }));
  }
}
