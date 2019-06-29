import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Flower } from '../../models/flower.model';
import { FlowerRepository } from '../../repositories/flower.repository';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {

  constructor(private flowerRepository: FlowerRepository) { }

  public getAllFlowers(): Observable<Flower[]> {
    return this.flowerRepository.getRawFlowers();
  }
}
