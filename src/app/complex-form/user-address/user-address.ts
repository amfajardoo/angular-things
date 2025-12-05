import { Component, model } from '@angular/core';
import { Field, type FieldTree } from '@angular/forms/signals';
import { FormField } from '../components/form-field/form-field';
import type { Address } from '../form-data';

@Component({
  selector: 'app-user-address',
  imports: [Field, FormField],
  templateUrl: './user-address.html',
  styleUrl: './user-address.css',
})
export class UserAddress {
  public readonly address = model.required<FieldTree<Address>>();
}
