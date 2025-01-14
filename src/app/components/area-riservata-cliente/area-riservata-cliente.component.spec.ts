import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaRiservataClienteComponent } from './area-riservata-cliente.component';

describe('AreaRiservataClienteComponent', () => {
  let component: AreaRiservataClienteComponent;
  let fixture: ComponentFixture<AreaRiservataClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaRiservataClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaRiservataClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
