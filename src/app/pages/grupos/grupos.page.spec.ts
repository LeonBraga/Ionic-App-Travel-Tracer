import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPage } from './grupos.page';

describe('GruposPage', () => {
  let component: GruposPage;
  let fixture: ComponentFixture<GruposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
