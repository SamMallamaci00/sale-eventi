import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniAdminComponent } from './prenotazioni-admin.component';

describe('PrenotazioniAdminComponent', () => {
  let component: PrenotazioniAdminComponent;
  let fixture: ComponentFixture<PrenotazioniAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrenotazioniAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrenotazioniAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
