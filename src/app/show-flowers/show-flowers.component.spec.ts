import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlowersComponent } from './show-flowers.component';
import { FlowerService } from './../flowerService/flower.service';
import { of } from 'rxjs';
import { Flower } from 'src/models/flower.model';

describe('ShowFlowersComponent', () => {
  let component: ShowFlowersComponent;
  let fixture: ComponentFixture<ShowFlowersComponent>;

  let flowerService: FlowerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFlowersComponent ]
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
    sampleFlower = { name: 'Orchid', inStock: true, petals: 3, scent: 'Floral' };

    (flowerService as any).getAllFlowers.and.returnValue(of([
      sampleFlower,
    ]));

    component.getFlowers();

    expect(component.flowers[0]).toEqual(sampleFlower);
  });

  it('should display the names, petals, and scents of all flowers', () => {
    let flowersList: Flower[];
    flowersList = [
      { name: 'Orchid', inStock: true, petals: 3, scent: 'Floral' },
      { name: 'Rose', inStock: true, petals: 7, scent: 'Sweet' },
      { name: 'Dandelion', inStock: true, petals: 100, scent: 'Grassy' },
    ];
    component.flowers = flowersList;
    fixture.detectChanges();

    let displayedFlowersAsHtml: HTMLElement = fixture.nativeElement;
    displayedFlowersAsHtml = displayedFlowersAsHtml.querySelector('li');

    expect(displayedFlowersAsHtml.textContent)
      .toBe(flowersList[0].name + ': ' + flowersList[0].petals + ' petals, smells ' + flowersList[0].scent);
  });

});
