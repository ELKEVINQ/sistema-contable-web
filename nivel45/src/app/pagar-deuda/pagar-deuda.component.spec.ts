import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarDeudaComponent } from './pagar-deuda.component';

describe('PagarDeudaComponent', () => {
  let component: PagarDeudaComponent;
  let fixture: ComponentFixture<PagarDeudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagarDeudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagarDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
