/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagarRolComponent } from './pagar-rol.component';

describe('PagarRolComponent', () => {
  let component: PagarRolComponent;
  let fixture: ComponentFixture<PagarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
