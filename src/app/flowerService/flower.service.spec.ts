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

  it('should get all flowers in the mock database', () => {
    let testRawFlowers: RawFlower[];
    testRawFlowers = [
      {flowerName: 'test1', isInStock: true, numberOfPetals: 0, flowerScent: 'testScent1'},
      {flowerName: 'test2', isInStock: true, numberOfPetals: 1, flowerScent: 'testScent2'},
      {flowerName: 'test3', isInStock: true, numberOfPetals: 2, flowerScent: 'testScent3'}
    ];

    flowerService.mockRawFlowers = createMockDatabase(testRawFlowers);

    let testFlowers: Flower[];
    testFlowers = [
      {name: 'test1', inStock: 'true', petals: '0', scent: 'testScent1'},
      {name: 'test2', inStock: 'true', petals: '1', scent: 'testScent2'},
      {name: 'test3', inStock: 'true', petals: '2', scent: 'testScent3'}
    ];

    flowerService.getAllFlowers().subscribe({
      next: (flowers: Flower[]) => {
        expect(flowers).toEqual(testFlowers);
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
    let testRawFlowers: RawFlower[];
    testRawFlowers = [
      {flowerName: 'test1', isInStock: true, numberOfPetals: 0, flowerScent: 'testScent1'},
      {flowerName: 'test2', isInStock: true, numberOfPetals: 1, flowerScent: 'testScent2'},
      {flowerName: 'test3', isInStock: true, numberOfPetals: 2, flowerScent: 'testScent3'}
    ];

    flowerService.mockRawFlowers = createMockDatabase(testRawFlowers);

    const addedTestRawFlower = {flowerName: 'test4', isInStock: true, numberOfPetals: 3, flowerScent: 'testScent4'};

    flowerService.saveRawFlower(addedTestRawFlower);
    testRawFlowers.push(addedTestRawFlower);

    expect(flowerService.mockRawFlowers).toEqual(testRawFlowers);
  });

  it('should save Flower objects to the mock database as RawFlower objects', () => {
    let testRawFlowers: RawFlower[];
    testRawFlowers = [
      {flowerName: 'test1', isInStock: true, numberOfPetals: 0, flowerScent: 'testScent1'},
      {flowerName: 'test2', isInStock: true, numberOfPetals: 1, flowerScent: 'testScent2'},
      {flowerName: 'test3', isInStock: true, numberOfPetals: 2, flowerScent: 'testScent3'}
    ];

    flowerService.mockRawFlowers = createMockDatabase(testRawFlowers);

    let sampleFlower: Flower;
    sampleFlower = { name: 'Orchid', inStock: 'true', petals: '3', scent: 'Floral' };

    let sampleRawFlower: RawFlower;
    sampleRawFlower = { flowerName: 'Orchid', isInStock: true, numberOfPetals: 3, flowerScent: 'Floral' };

    flowerService.saveFlowerInService(sampleFlower);
    testRawFlowers.push(sampleRawFlower);

    expect(flowerService.mockRawFlowers).toEqual(testRawFlowers);
  });


});

function createMockDatabase(testRawFlowers) {
  let mockRawFlowers: RawFlower[];
  mockRawFlowers = [];
  testRawFlowers.forEach(rawFlower => {
    mockRawFlowers.push(rawFlower);
  });

  return mockRawFlowers;
}
