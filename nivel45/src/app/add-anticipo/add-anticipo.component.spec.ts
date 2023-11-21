import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnticipoComponent } from './add-anticipo.component';

describe('AddAnticipoComponent', () => {
  let component: AddAnticipoComponent;
  let fixture: ComponentFixture<AddAnticipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAnticipoComponent]
    });
    fixture = TestBed.createComponent(AddAnticipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
