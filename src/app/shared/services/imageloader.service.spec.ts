import { TestBed } from '@angular/core/testing';

import { ImageloaderService } from './imageloader.service';

describe('ImageloaderService', () => {
  let service: ImageloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
