import { Observable, of } from 'rxjs';
import { RawFlower } from 'src/models/raw-flower.model';

import { MOCKRAWFLOWERS } from './mock-flowers';

export class FlowerRepository {

  public getRawFlowers(): Observable<RawFlower[]> {
    return of(MOCKRAWFLOWERS);
  }

  public saveRawFlower(rawFlower: RawFlower) {
    MOCKRAWFLOWERS.push(rawFlower);
  }
}
