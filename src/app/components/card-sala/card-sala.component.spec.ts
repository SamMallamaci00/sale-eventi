import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSalaComponent } from './card-sala.component';

describe('CardSalaComponent', () => {
  let component: CardSalaComponent;
  let fixture: ComponentFixture<CardSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
