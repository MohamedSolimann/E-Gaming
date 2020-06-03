import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPagesErrorComponent } from './main-pages-error.component';

describe('MainPagesErrorComponent', () => {
  let component: MainPagesErrorComponent;
  let fixture: ComponentFixture<MainPagesErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPagesErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPagesErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
