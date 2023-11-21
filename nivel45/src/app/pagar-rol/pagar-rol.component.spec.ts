import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarRolComponent } from './pagar-rol.component';

describe('PagarRolComponent', () => {
  let component: PagarRolComponent;
  let fixture: ComponentFixture<PagarRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagarRolComponent]
    });
    fixture = TestBed.createComponent(PagarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
