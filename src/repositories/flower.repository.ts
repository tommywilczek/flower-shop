import { Observable, of } from 'rxjs';

export class FlowerRepository {
  public getRawFlowers(): Observable<any[]> {
    return of([]);
  }
}
