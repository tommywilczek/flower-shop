import { TestBed } from '@angular/core/testing';

import { FlowerService } from './flower.service';
import { FlowerRepository } from 'src/repositories/flower.repository';

describe('FlowerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [FlowerRepository]
  }));

  it('should be created', () => {
    const service: FlowerService = TestBed.get(FlowerService);
    expect(service).toBeTruthy();
  });
});
