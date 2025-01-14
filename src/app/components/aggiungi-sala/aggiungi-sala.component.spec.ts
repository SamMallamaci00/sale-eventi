import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiSalaComponent } from './aggiungi-sala.component';

describe('AggiungiSalaComponent', () => {
  let component: AggiungiSalaComponent;
  let fixture: ComponentFixture<AggiungiSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggiungiSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggiungiSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
