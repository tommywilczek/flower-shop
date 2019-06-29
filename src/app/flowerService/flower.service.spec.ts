import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { FlowerService } from './flower.service';
import { FlowerRepository } from 'src/repositories/flower.repository';
import { Flower } from '../../models/flower.model';

describe('FlowerService', () => {

  let flowerService: FlowerService;
  let flowerRepository: FlowerRepository;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [FlowerRepository],
  }));

  beforeEach(() => {
    flowerRepository = jasmine.createSpyObj('FlowerRepository', ['getRawFlowers']);
    flowerService = new FlowerService(flowerRepository);
  });


  it('should be created', () => {
    const service: FlowerService = TestBed.get(FlowerService);
    expect(service).toBeTruthy();
  });

  it('should return a list of flowers asynchronously', (done: DoneFn) => {
    (flowerRepository as any).getRawFlowers.and.returnValue(of([]));

    flowerService.getAllFlowers().subscribe({
      next: (flowersArray: Flower[]) => {
        expect(flowersArray).toBeTruthy();
        done();
      }
    });
  });

  it('should return a list of registered accounts with a name to display, \
      an account number, and the bank to which it belongs', (done: DoneFn) => {
    (flowerRepository as any).getRawFlowers.and.returnValue(of([
      { flowerName: 'Rose', isInStock: true, numberOfPetals: 7, flowerScent: 'Sweet' },
      { flowerName: 'Tulip', isInStock: true, numberOfPetals: 5, flowerScent: 'Sromatic' },
    ]));

    flowerService.getAllFlowers().subscribe({
      next: (flowers: Flower[]) => {
        expect(flowers.length).toBe(2);
        flowers.forEach(flower => {
          expect(flower.name).toBeTruthy();
          expect(flower.petals).toBeTruthy();
          expect(flower.scent).toBeTruthy();
        });
        done();
      }
    });
  });

  it('should NOT return flowers that are NOT in stock', (done: DoneFn) => {
    (flowerRepository as any).getRawFlowers.and.returnValue(of([
      { flowerName: 'Orchid', isInStock: false, numberOfPetals: 3, flowerScent: 'Floral' },
    ]));

    flowerService.getAllFlowers().subscribe({
      next: (flowers: Flower[]) => {
        expect(flowers.length).toBe(0);
        done();
      }
    });
  });

  it('should return only flowers in stock', (done: DoneFn) => {
    const flowerNames: any = { active1: 'rose', active2: 'lilac', inactive: 'tulip' };
    (flowerRepository as any).getRawFlowers.and.returnValue(of([
      { flowerName: flowerNames.active1, isInStock: true, numberOfPetals: 1, flowerScent: 'Sweet' },
      { flowerName: flowerNames.active2, isInStock: false, numberOfPetals: 3, flowerScent: 'Aromatic' },
      { flowerName: flowerNames.inactive, isInStock: true, numberOfPetals: 10, flowerScent: 'Bitter' },
    ]));

    flowerService.getAllFlowers().subscribe({
      next: (flowers: Flower[]) => {
        expect(flowers.length).toBe(2);
        expect(flowers.find(flower => flower.name === flowerNames.active1)).toBeTruthy();
        expect(flowers.find(flower => flower.name === flowerNames.active2)).toBeUndefined();
        expect(flowers.find(flower => flower.name === flowerNames.inactive)).toBeTruthy();
        done();
      }
    });
  });
});
