import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaRiservataAdminComponent } from './area-riservata-admin.component';

describe('AreaRiservataAdminComponent', () => {
  let component: AreaRiservataAdminComponent;
  let fixture: ComponentFixture<AreaRiservataAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaRiservataAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaRiservataAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
