import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasComponent } from './obras.component';

describe('ObrasComponent', () => {
  let component: ObrasComponent;
  let fixture: ComponentFixture<ObrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObrasComponent]
    });
    fixture = TestBed.createComponent(ObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
