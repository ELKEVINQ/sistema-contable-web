import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnticiposComponent } from './lista-anticipos.component';

describe('ListaAnticiposComponent', () => {
  let component: ListaAnticiposComponent;
  let fixture: ComponentFixture<ListaAnticiposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAnticiposComponent]
    });
    fixture = TestBed.createComponent(ListaAnticiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
