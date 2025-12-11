import { Injectable, inject } from '@angular/core';
import { AddressAtlas } from './address-atlas';

@Injectable({
  providedIn: 'root',
})
export class AddressHandler {
  atlas = inject(AddressAtlas);
}
