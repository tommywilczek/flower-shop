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

  it('should have input fields for name, petals, and scent', () => {
    const inputTextArea = fixture.nativeElement.getElementsByTagName('textarea');

    expect(inputTextArea[0].placeholder).toBe('Name');
    expect(inputTextArea[1].placeholder).toBe('Number of petals');
    expect(inputTextArea[2].placeholder).toBe('Scent');
  });

  it('should have radio button for inStock: "In stock" or "Not in stock" \
      as Angular Material radio button in radio group', () => {

    const radioButtonGroup = fixture.nativeElement.getElementsByTagName('mat-radio-group');

    const radioButtons = radioButtonGroup[0].children;

    expect(radioButtons[0].innerText).toBe('In stock');
    expect(radioButtons[1].innerText).toBe('Not in stock');

    expect(radioButtons[0].getAttribute('value')).toBe('In stock');
    expect(radioButtons[1].getAttribute('value')).toBe('Not in stock');
  });

  // it('inputs should be shown as required', () => {
  //   const inputTextArea = fixture.nativeElement.getElementsByTagName('textarea');

  //   const radioButtons = fixture.nativeElement.getElementsByTagName('mat-radio-button');

  //   expect(inputTextArea[0].hasAttribute('required')).toBe(true);
  //   expect(inputTextArea[1].hasAttribute('required')).toBe(true);
  //   expect(inputTextArea[2].hasAttribute('required')).toBe(true);

  //   expect(radioButtons[0].hasAttribute('required')).toBe(true);
  //   expect(radioButtons[1].hasAttribute('required')).toBe(true);
  // });

  it('button group should be attached to its label', () => {

    const radioButtonGroup = fixture.nativeElement.querySelector('mat-radio-group');

    expect(radioButtonGroup.getAttribute('aria-labelledby')).toBe('in-stock-radio-label');

    const stockRadioLabel = fixture.nativeElement.querySelector('#in-stock-radio-label');

    expect(stockRadioLabel.innerText).toBe('In stock or not in stock?');
  });

  it('submit button should be Angular Material and show "Submit"', () => {
    const submitButton = fixture.nativeElement.querySelector('button');

    expect(submitButton.hasAttribute('mat-button')).toBeTruthy();
    expect(submitButton.innerText).toBe('Submit');
  });

  it('submit button should clear form and should not refresh the page', () => {
    const submitButton = fixture.nativeElement.querySelector('button');

    expect(submitButton.getAttribute('type')).toBe('reset');
    expect(submitButton.getAttribute('value')).toBe('Reset');
  });

  it('submit button should call the saveFlower() method', () => {
    const submitButton = fixture.nativeElement.querySelector('button');
    spyOn(component, 'saveFlower');

    submitButton.click();

    expect(component.saveFlower).toHaveBeenCalled();
  });

  it('can input into a text field', () => {
    const nameTextArea = fixture.nativeElement.querySelectorAll('[placeholder="Name"]')[0];

    expect(nameTextArea.value).toBe('');

    nameTextArea.value = 'Test Name';

    expect(nameTextArea.value).toBe('Test Name');
  });



  // it('submit button should send inputs to saveFlower() method', () => {
  //   const submitButton = fixture.nativeElement.querySelector('button');
  //   spyOn(component, 'saveFlower');

  //   // submitButton.click();

  //   // expect(component.saveFlower).toHaveBeenCalledWith();
  // });

});
