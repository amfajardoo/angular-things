import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import {
  Field,
  type FieldState,
  form,
  minLength,
  required,
  schema,
  validateAsync,
} from '@angular/forms/signals';
import { FormField } from './components/form-field/form-field';
import {
  createAddressSchema,
  createFormDataSchema,
  type FormData,
  INITIAL_FORM_DATA,
} from './form-data';
import { AddressAtlas } from './services/address-atlas';
import { UserAddress } from './user-address/user-address';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Field, JsonPipe, UserAddress, FormField],
})
export default class ComplexForm {
  readonly addressAtlas = inject(AddressAtlas);

  private readonly streetSchema = schema<string>((path) => {
    required(path, { message: 'Street is required' });
    minLength(path, 3, { message: 'Street must be at least 3 characters long' });

    validateAsync(path, {
      params: ({ value }) => ({ street: value() }),
      factory: (params) =>
        resource({
          params,
          loader: ({ params }) => {
            return this.addressAtlas.searchAddressesPromise(params.street);
          },
        }),
      onSuccess: (result) => {
        console.log('Address search result:', result);
        if (!result?.length) {
          return {
            kind: 'no_addresses_found',
            message: 'No Address available in this street',
          };
        }
        return null;
      },
      onError: () => ({ kind: 'network', message: 'Validation service unavailable' }),
    });
  });

  private readonly addressSchema = createAddressSchema(this.streetSchema);
  private readonly formDataSchema = createFormDataSchema(this.addressSchema);
  readonly formModel = signal<FormData>(INITIAL_FORM_DATA);
  readonly form = form(this.formModel, this.formDataSchema);

  onSubmit() {}

  hasErrors(field: FieldState<unknown, string>) {
    return field.touched() && field.errors().length > 0;
  }

  reset() {
    this.form().reset(INITIAL_FORM_DATA);
  }
}
