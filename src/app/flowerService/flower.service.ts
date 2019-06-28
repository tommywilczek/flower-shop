import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Flower } from "../../models/flower.model";

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  constructor() { }

  public getAllFlowers(): Observable<Flower[]> {
    return of([]);
  }
}
