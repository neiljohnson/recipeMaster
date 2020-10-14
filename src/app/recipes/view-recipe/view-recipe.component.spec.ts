import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipeComponent } from './view-recipe.component';

describe('ReadRecipeComponent', () => {
  let component: ViewRecipeComponent;
  let fixture: ComponentFixture<ViewRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});