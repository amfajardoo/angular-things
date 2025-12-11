import { TestBed } from '@angular/core/testing';

import { AddressHandler } from './address-handler';

describe('AddressHandler', () => {
  let service: AddressHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
