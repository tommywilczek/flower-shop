import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { FlowerService } from './flower.service';
import { FlowerRepository } from 'src/repositories/flower.repository';
import { Flower } from '../../models/flower.model';
import { RawFlower } from 'src/models/raw-flower.model';
import { MOCKRAWFLOWERS } from 'src/repositories/mock-flowers';

describe('FlowerService', () => {

  let flowerService: FlowerService;
  let flowerRepository: FlowerRepository;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [FlowerRepository],
  }));

  beforeEach(() => {
    flowerRepository = jasmine.createSpyObj('FlowerRepository', ['getRawFlowers', 'saveRawFlower']);
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

  it('should convert a flower into a raw flower', () => {
    let sampleRawFlower: RawFlower;
    sampleRawFlower = { flowerName: 'Orchid', isInStock: true, numberOfPetals: 3, flowerScent: 'Floral' };

    let sampleFlower: Flower;
    sampleFlower = { name: 'Orchid', inStock: 'true', petals: '3', scent: 'Floral' };

    const sampleRawFlowerNowFlower = flowerService.convertRawFlowerToFlower(sampleRawFlower);

    expect(sampleRawFlowerNowFlower).toEqual(sampleFlower);
  });

  xit('should return a list of flowers with a name, \
      inStock, petals, and scent', (done: DoneFn) => {

    let testRawFlowers: RawFlower[];
    testRawFlowers = [
      { flowerName: 'Rose', isInStock: true, numberOfPetals: 7, flowerScent: 'Sweet' },
      { flowerName: 'Tulip', isInStock: true, numberOfPetals: 5, flowerScent: 'Aromatic' }
    ];

    createMockDatabase(testRawFlowers);

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
      { flowerName: flowerNames.inactive, isInStock: false, numberOfPetals: 3, flowerScent: 'Aromatic' },
      { flowerName: flowerNames.active2, isInStock: true, numberOfPetals: 10, flowerScent: 'Bitter' },
    ]));

    flowerService.getAllFlowers().subscribe({
      next: (flowers: Flower[]) => {
        expect(flowers.length).toBe(2);

        const findFlowerInStock = (flowerName: string) => flowers.find(flower => flower.name === flowerName);

        expect(findFlowerInStock(flowerNames.active1)).toBeTruthy();
        expect(findFlowerInStock(flowerNames.inactive)).toBeUndefined();
        expect(findFlowerInStock(flowerNames.active2)).toBeTruthy();

        done();
      }
    });
  });

  it('should save a Flower object to a RawFlower object', () => {
    let sampleFlower: Flower;
    sampleFlower = { name: 'Orchid', inStock: 'true', petals: '3', scent: 'Floral' };

    let sampleRawFlower: RawFlower;
    sampleRawFlower = { flowerName: 'Orchid', isInStock: true, numberOfPetals: 3, flowerScent: 'Floral' };

    const sampleFlowerNowRawFlower = flowerService.convertFlowerToRawFlower(sampleFlower);

    expect(sampleFlowerNowRawFlower).toEqual(sampleRawFlower);
  });

  it('should save raw flowers to the mock database', () => {
    const testRawFlowers = [
      {flowerName: 'test1', isInStock: true, numberOfPetals: 0, flowerScent: 'testScent1'},
      {flowerName: 'test2', isInStock: true, numberOfPetals: 1, flowerScent: 'testScent2'},
      {flowerName: 'test3', isInStock: true, numberOfPetals: 2, flowerScent: 'testScent3'}
    ];

    createMockDatabase(testRawFlowers);

    const addedTestRawFlower = {flowerName: 'test4', isInStock: true, numberOfPetals: 3, flowerScent: 'testScent4'};

    flowerService.saveRawFlower(addedTestRawFlower);
    testRawFlowers.push(addedTestRawFlower);

    expect(MOCKRAWFLOWERS).toEqual(testRawFlowers);
  });

  it('should save Flower objects to the mock database as RawFlower objects', () => {
    const testRawFlowers = [
      {flowerName: 'test1', isInStock: true, numberOfPetals: 0, flowerScent: 'testScent1'},
      {flowerName: 'test2', isInStock: true, numberOfPetals: 1, flowerScent: 'testScent2'},
      {flowerName: 'test3', isInStock: true, numberOfPetals: 2, flowerScent: 'testScent3'}
    ];

    createMockDatabase(testRawFlowers);

    let sampleFlower: Flower;
    sampleFlower = { name: 'Orchid', inStock: 'true', petals: '3', scent: 'Floral' };

    let sampleRawFlower: RawFlower;
    sampleRawFlower = { flowerName: 'Orchid', isInStock: true, numberOfPetals: 3, flowerScent: 'Floral' };

    flowerService.saveFlowerInService(sampleFlower);
    testRawFlowers.push(sampleRawFlower);

    expect(MOCKRAWFLOWERS).toEqual(testRawFlowers);
  });


});

function createMockDatabase(testRawFlowers) {
  MOCKRAWFLOWERS.splice(0, MOCKRAWFLOWERS.length);

  testRawFlowers.forEach(rawFlower => {
    MOCKRAWFLOWERS.push(rawFlower);
  });

  return MOCKRAWFLOWERS;
}
