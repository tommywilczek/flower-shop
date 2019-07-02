import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ShowFlowersComponent } from './show-flowers.component';
import { FlowerService } from './../flowerService/flower.service';
import { of } from 'rxjs';
import { Flower } from 'src/models/flower.model';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ShowFlowersComponent', () => {
  let component: ShowFlowersComponent;
  let fixture: ComponentFixture<ShowFlowersComponent>;

  let flowerService: FlowerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFlowersComponent ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFlowersComponent);
    component = fixture.componentInstance;
    flowerService = jasmine.createSpyObj('FlowerService', ['getAllFlowers']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of flowers from the flower service', () => {
    component = new ShowFlowersComponent(flowerService);

    let sampleFlower: Flower;
    sampleFlower = { name: 'Orchid', inStock: 'true', petals: '3', scent: 'Floral' };

    (flowerService as any).getAllFlowers.and.returnValue(of([
      sampleFlower,
    ]));

    component.getFlowers();

    expect(component.flowers[0]).toEqual(sampleFlower);
  });

  it('should get the list of flowers when the component is created', () => {
    component = new ShowFlowersComponent(flowerService);

    expect(component.flowers).toBeUndefined();

    spyOn(component, 'getFlowers');

    fixture.detectChanges();

    component.ngOnInit();

    expect(component.getFlowers).toHaveBeenCalled();
  });

  it('should display the names, petals, and scents of all flowers', () => {
    let flowersList: Flower[];
    flowersList = [
      { name: 'Orchid', inStock: 'true', petals: '3', scent: 'Floral' },
      { name: 'Rose', inStock: 'true', petals: '7', scent: 'Sweet' },
      { name: 'Dandelion', inStock: 'true', petals: '100', scent: 'Grassy' },
    ];
    component.flowers = flowersList;
    fixture.detectChanges();

    const displayedFlowersAsHtml = fixture.nativeElement.getElementsByTagName('li');

    expect(displayedFlowersAsHtml[0].textContent)
      .toBe(flowersList[0].name + ': ' + flowersList[0].petals + ' petals, smells ' + flowersList[0].scent);

    expect(displayedFlowersAsHtml[1].textContent)
      .toBe(flowersList[1].name + ': ' + flowersList[1].petals + ' petals, smells ' + flowersList[1].scent);

    expect(displayedFlowersAsHtml[2].textContent)
      .toBe(flowersList[2].name + ': ' + flowersList[2].petals + ' petals, smells ' + flowersList[2].scent);

    });

});

describe('Creating new flowers within ShowFlowersComponent', () => {
  let component: ShowFlowersComponent;
  let fixture: ComponentFixture<ShowFlowersComponent>;

  let flowerService: FlowerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFlowersComponent ],
      imports: [MatFormFieldModule, MatInputModule, BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFlowersComponent);
    component = fixture.componentInstance;
    flowerService = jasmine.createSpyObj('FlowerService', ['saveFlowerInService']);
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

  xit('the input in the name field becomes the flower name', fakeAsync(() => {
    const nameTextArea = fixture.nativeElement.querySelectorAll('[placeholder="Name"]')[0];
    const testName = 'Test Name';

    nameTextArea.focus();
    nameTextArea.value = testName;

    nameTextArea.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();

    expect(component.flower.name).toBe(testName);
  }));



  xit('submit button should send inputs as a Flower object to saveFlower() method', () => {
    const nameTextArea = fixture.nativeElement.querySelectorAll('[placeholder="Name"]')[0];
    const testName = 'Test Name';
    nameTextArea.value = testName;

    const submitButton = fixture.nativeElement.querySelector('button');
    spyOn(component, 'saveFlower');

    submitButton.click();

    expect(component.saveFlower).toHaveBeenCalledWith(testName);
  });

  it('saveFlowers should pass the component\'s flower object to the flowerService', () => {
    let sampleFlower: Flower;
    sampleFlower = { name: 'Orchid', inStock: 'true', petals: '3', scent: 'Floral' };

    component = new ShowFlowersComponent(flowerService);

    component.flower = sampleFlower;

    component.saveFlower();

    expect(flowerService.saveFlowerInService).toHaveBeenCalledWith(sampleFlower);
  });

});
