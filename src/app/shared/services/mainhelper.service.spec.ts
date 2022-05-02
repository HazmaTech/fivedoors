import { TestBed } from '@angular/core/testing';

import { MainhelperService } from './mainhelper.service';

describe('MainhelperService', () => {
  let service: MainhelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainhelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
