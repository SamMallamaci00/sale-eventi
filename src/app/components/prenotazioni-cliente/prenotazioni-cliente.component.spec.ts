import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniClienteComponent } from './prenotazioni-cliente.component';

describe('PrenotazioniClienteComponent', () => {
  let component: PrenotazioniClienteComponent;
  let fixture: ComponentFixture<PrenotazioniClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrenotazioniClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrenotazioniClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
