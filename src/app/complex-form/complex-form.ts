import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Field, type FieldState, form } from '@angular/forms/signals';
import { FormField } from './components/form-field/form-field';
import { FORM_DATA_SCHEMA, type FormData, INITIAL_FORM_DATA } from './form-data';
import { UserAddress } from './user-address/user-address';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Field, JsonPipe, UserAddress, FormField],
})
export default class ComplexForm {
  readonly formModel = signal<FormData>(INITIAL_FORM_DATA);
  readonly form = form(this.formModel, FORM_DATA_SCHEMA);

  onSubmit() {}

  hasErrors(field: FieldState<unknown, string>) {
    return field.touched() && field.errors().length > 0;
  }

  reset() {
    this.form().reset(INITIAL_FORM_DATA);
  }
}
