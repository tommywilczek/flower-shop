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
    let flowersInStock = [];
    flowers.forEach(flower => {
      if (flower.isInStock) {
        flowersInStock.push(flower)
      }
    });
    return flowersInStock.map(flower => ({
      name: flower.flowerName,
      inStock: flower.isInStock,
      petals: flower.numberOfPetals,
      scent: flower.flowerScent
    }));
  }
}
