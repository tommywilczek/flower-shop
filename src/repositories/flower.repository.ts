import { Observable, of } from 'rxjs';
import { RawFlower } from 'src/models/raw-flower.model';

export class FlowerRepository {
  public getRawFlowers(): Observable<RawFlower[]> {
    return of([]);
  }
}
