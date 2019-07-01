import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Flower } from '../../models/flower.model';
import { FlowerRepository } from '../../repositories/flower.repository';
import { RawFlower } from 'src/models/raw-flower.model';

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
      inStock: flower.isInStock,
      petals: flower.numberOfPetals,
      scent: flower.flowerScent
    };
  }

  public saveFlowerInService(flower: Flower) {
    let rawFlower: RawFlower;
    rawFlower = {
      flowerName: flower.name,
      isInStock: flower.inStock,
      numberOfPetals: flower.petals,
      flowerScent: flower.scent
    };

    this.flowerRepository.saveRawFlower(rawFlower);
  }
}
