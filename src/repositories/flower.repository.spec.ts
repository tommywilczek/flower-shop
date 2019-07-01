import { FlowerRepository } from './flower.repository';
import { TestBed } from '@angular/core/testing';
import { MOCKRAWFLOWERS } from './mock-flowers';
import { RawFlower } from 'src/models/raw-flower.model';

describe('FlowerRepository', () => {
  let flowerRepository: FlowerRepository;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [FlowerRepository]
  }));

  beforeEach(() => {
    flowerRepository = new FlowerRepository();
  });

  it('should create an instance', () => {
    expect(new FlowerRepository()).toBeTruthy();
  });

  // xit('should get RawFlowers from the mock database', () => {
  //   let testRawFlowers: RawFlower[];
  //   testRawFlowers = [
  //     {flowerName: 'test1', isInStock: true, numberOfPetals: 0, flowerScent: 'testScent1'},
  //     {flowerName: 'test2', isInStock: true, numberOfPetals: 1, flowerScent: 'testScent2'},
  //     {flowerName: 'test2', isInStock: true, numberOfPetals: 2, flowerScent: 'testScent3'}
  //   ]
  //   flowerRepository.mockedRawFlowers = testRawFlowers;

  //   const returnedRawFlowers = flowerRepository.getRawFlowers();

  //   expect(returnedRawFlowers).toBe(testRawFlowers);
  // });
});
