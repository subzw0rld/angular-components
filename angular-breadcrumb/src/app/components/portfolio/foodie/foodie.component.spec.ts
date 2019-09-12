import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodieComponent } from './foodie.component';

describe('FoodieComponent', () => {
  let component: FoodieComponent;
  let fixture: ComponentFixture<FoodieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
