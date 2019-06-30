import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlowerComponent } from './create-flower.component';

import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateFlowerComponent', () => {
  let component: CreateFlowerComponent;
  let fixture: ComponentFixture<CreateFlowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFlowerComponent ],
      imports: [MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with Angular Material input fields', () => {

    let inputForm: HTMLElement = fixture.nativeElement;
    inputForm = inputForm.querySelector('form');

    const inputFields = inputForm.querySelector('mat-form-field');

    expect(inputFields).toBeTruthy();
  });
});
