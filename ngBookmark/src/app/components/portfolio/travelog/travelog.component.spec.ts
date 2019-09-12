import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelogComponent } from './travelog.component';

describe('TravelogComponent', () => {
  let component: TravelogComponent;
  let fixture: ComponentFixture<TravelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
