import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFacturaCompraComponent } from './registrar-factura-compra.component';

describe('RegistrarFacturaCompraComponent', () => {
  let component: RegistrarFacturaCompraComponent;
  let fixture: ComponentFixture<RegistrarFacturaCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarFacturaCompraComponent]
    });
    fixture = TestBed.createComponent(RegistrarFacturaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
