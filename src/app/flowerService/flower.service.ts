import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Flower } from '../../models/flower.model';
import { FlowerRepository } from '../../repositories/flower.repository';
import { RawFlower } from 'src/models/raw-flower.model';
import { MOCKRAWFLOWERS } from 'src/repositories/mock-flowers';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  constructor(private flowerRepository: FlowerRepository) { }

  public getAllFlowers(): Observable<Flower[]> {
    return this.flowerRepository.getRawFlowers().pipe(
      map(this.toListOfFlowers)
    );
  }

  private toListOfFlowers = (flowers: RawFlower[]): Flower[] => {
    return flowers
      .filter(flower => flower.isInStock)
      .map(this.toFlower);
  }

  private toFlower = (flower: RawFlower): Flower => {
    return {
      name: flower.flowerName,
      inStock: String(flower.isInStock),
      petals: String(flower.numberOfPetals),
      scent: flower.flowerScent
    };
  }

  convertRawFlowerToFlower(rawFlower: RawFlower): Flower {
    let flower: Flower;
    flower = {
      name: rawFlower.flowerName,
      inStock: String(rawFlower.isInStock),
      petals: String(rawFlower.numberOfPetals),
      scent: rawFlower.flowerScent
    };
    return flower;
  }

  public saveFlowerInService(flower: Flower) {
    const rawFlower = this.convertFlowerToRawFlower(flower);
    this.saveRawFlower(rawFlower);
  }

  public convertFlowerToRawFlower(flower: Flower): RawFlower {
    let rawFlower: RawFlower;
    rawFlower = {
      flowerName: flower.name,
      isInStock: (flower.inStock === 'true'),
      numberOfPetals: Number(flower.petals),
      flowerScent: flower.scent
    };
    return rawFlower;
  }

  saveRawFlower(rawFlower: RawFlower) {
    MOCKRAWFLOWERS.push(rawFlower);
  }
}
