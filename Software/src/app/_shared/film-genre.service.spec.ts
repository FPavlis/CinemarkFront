import { TestBed } from '@angular/core/testing';

import { FilmGenreService } from './film-genre.service';

describe('FilmGenreService', () => {
  let service: FilmGenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmGenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
