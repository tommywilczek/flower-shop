import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Flower } from '../../models/flower.model';
import { RawFlower } from 'src/models/raw-flower.model';
import { MOCKRAWFLOWERS } from 'src/repositories/mock-flowers';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  public mockRawFlowers: RawFlower[];

  constructor() {
    this.mockRawFlowers = MOCKRAWFLOWERS;
  }

  public getAllFlowers(): Observable<Flower[]> {
    let flowers: Flower[];
    flowers = [];
    this.mockRawFlowers.forEach(rawFlower => {
      flowers.push(this.convertRawFlowerToFlower(rawFlower));
    });
    return of(flowers);
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

  public saveFlowerInService(flower: Flower): Observable<Flower> {
    const rawFlower = this.convertFlowerToRawFlower(flower);
    this.saveRawFlower(rawFlower);
    return of(flower);
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
    this.mockRawFlowers.push(rawFlower);
  }
}
