import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AumentarDeudaComponent } from './aumentar-deuda.component';

describe('AumentarDeudaComponent', () => {
  let component: AumentarDeudaComponent;
  let fixture: ComponentFixture<AumentarDeudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AumentarDeudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AumentarDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
