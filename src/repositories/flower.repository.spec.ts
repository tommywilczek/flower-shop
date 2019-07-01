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

  it('should save flowers to the mock database', () => {
    MOCKRAWFLOWERS.splice(0, MOCKRAWFLOWERS.length);
    expect(MOCKRAWFLOWERS).toEqual([]);

    const testRawFlowers = [
      {flowerName: 'test1', isInStock: true, numberOfPetals: 0, flowerScent: 'testScent1'},
      {flowerName: 'test2', isInStock: true, numberOfPetals: 1, flowerScent: 'testScent2'},
      {flowerName: 'test3', isInStock: true, numberOfPetals: 2, flowerScent: 'testScent3'}
    ];

    testRawFlowers.forEach(rawFlower => {
      MOCKRAWFLOWERS.push(rawFlower);
    });
    expect(MOCKRAWFLOWERS).toEqual(testRawFlowers);

    const addedTestRawFlower = {flowerName: 'test4', isInStock: true, numberOfPetals: 3, flowerScent: 'testScent4'};

    flowerRepository.saveRawFlower(addedTestRawFlower);
    testRawFlowers.push(addedTestRawFlower);

    expect(MOCKRAWFLOWERS).toEqual(testRawFlowers);
  });

  // it('should get all rawFlowers from the mock database as Observables', () => {
  //   MOCKRAWFLOWERS.splice(0, MOCKRAWFLOWERS.length);
  //   expect(MOCKRAWFLOWERS).toEqual([]);

  //   let testRawFlowers: RawFlower[];
  //   testRawFlowers = [
  //     {flowerName: 'test1', isInStock: true, numberOfPetals: 0, flowerScent: 'testScent1'},
  //     {flowerName: 'test2', isInStock: true, numberOfPetals: 1, flowerScent: 'testScent2'},
  //     {flowerName: 'test3', isInStock: true, numberOfPetals: 2, flowerScent: 'testScent3'}
  //   ];

  //   testRawFlowers.forEach(rawFlower => {
  //     MOCKRAWFLOWERS.push(rawFlower);
  //   });
  //   expect(MOCKRAWFLOWERS).toEqual(testRawFlowers);

  //   const returnedRawFlowers = flowerRepository.getRawFlowers();

  //   expect(returnedRawFlowers).toEqual(testRawFlowers); // expexts testRawFlowers to be an Observable and it's NOT
  // });

});