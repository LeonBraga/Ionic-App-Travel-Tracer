import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractPage } from './extract.page';

describe('ExtractPage', () => {
  let component: ExtractPage;
  let fixture: ComponentFixture<ExtractPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
