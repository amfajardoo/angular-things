import { TestBed } from '@angular/core/testing';

import { AddressAtlas } from './address-atlas';

describe('AddressAtlas', () => {
  let service: AddressAtlas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressAtlas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
