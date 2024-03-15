import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeudaComponent } from './add-deuda.component';

describe('AddDeudaComponent', () => {
  let component: AddDeudaComponent;
  let fixture: ComponentFixture<AddDeudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
