import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeudaComponent } from './lista-deuda.component';

describe('ListaDeudaComponent', () => {
  let component: ListaDeudaComponent;
  let fixture: ComponentFixture<ListaDeudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDeudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
