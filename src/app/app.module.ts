import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PantryComponent} from './pantry/pantry.component';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MealPlannerComponent} from './meal-planner/meal-planner.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LayoutModule} from '@angular/cdk/layout';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {Interceptor} from '../interceptors/interceptor';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {AddRecipeComponent} from './recipes/add-recipe/add-recipe.component';
import {ViewRecipeComponent} from './recipes/view-recipe/view-recipe.component';
import {EditRecipeComponent} from './recipes/edit-recipe/edit-recipe.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {LoginComponent} from './login/login.component';
import {RouteGuardService} from '../services/route-guard.service';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    PantryComponent,
    RecipesComponent,
    ShoppingListComponent,
    MealPlannerComponent,
    AddRecipeComponent,
    ViewRecipeComponent,
    EditRecipeComponent,
    LoginComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTooltipModule,
    LayoutModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
    MatButtonToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatDialogModule,
    FlexLayoutModule
  ],
  providers: [RouteGuardService, MatSnackBar, MatDialog, RouteGuardService, HttpClient, {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
