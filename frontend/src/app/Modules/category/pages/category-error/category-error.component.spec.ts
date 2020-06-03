import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryErrorComponent } from './category-error.component';

describe('CategoryErrorComponent', () => {
  let component: CategoryErrorComponent;
  let fixture: ComponentFixture<CategoryErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
