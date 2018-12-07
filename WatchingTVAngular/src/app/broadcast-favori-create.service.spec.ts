import { TestBed } from '@angular/core/testing';

import { BroadcastFavoriCreateService } from './broadcast-favori-create.service';

describe('BroadcastFavoriCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BroadcastFavoriCreateService = TestBed.get(BroadcastFavoriCreateService);
    expect(service).toBeTruthy();
  });
});
