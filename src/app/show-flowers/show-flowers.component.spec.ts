import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlowersComponent } from './show-flowers.component';
import { FlowerService } from './../flowerService/flower.service';
import { FlowerRepository } from './../../repositories/flower.repository';
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
    // component = fixture.componentInstance;
    flowerService = jasmine.createSpyObj('FlowerService', ['getAllFlowers']);
    component = new ShowFlowersComponent(flowerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of flowers from the flower service', () => {
    let sampleFlower: Flower;
    sampleFlower = { name: 'Orchid', inStock: true, petals: 3, scent: 'Floral' };

    (flowerService as any).getAllFlowers.and.returnValue(of([
      sampleFlower,
    ]));

    component.getFlowers();

    expect(component.flowers[0]).toEqual(sampleFlower);
  });


});
