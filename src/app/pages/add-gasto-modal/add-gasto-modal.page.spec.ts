import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGastoModalPage } from './add-gasto-modal.page';

describe('AddGastoModalPage', () => {
  let component: AddGastoModalPage;
  let fixture: ComponentFixture<AddGastoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGastoModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGastoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
