import { TestBed, async, inject } from '@angular/core/testing';

import { SerieGuard } from './serie.guard';

describe('SerieGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerieGuard]
    });
  });

  it('should ...', inject([SerieGuard], (guard: SerieGuard) => {
    expect(guard).toBeTruthy();
  }));
});
