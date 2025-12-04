import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { INITIAL_FORM_DATA, FormData, FORM_DATA_SCHEMA } from './form-data';
import { Field, FieldState, form, REQUIRED } from '@angular/forms/signals';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Field, JsonPipe],
})
export default class ComplexForm {

  readonly formModel = signal<FormData>(INITIAL_FORM_DATA);
  readonly form = form(this.formModel, FORM_DATA_SCHEMA);

  onSubmit() {
  }

  isFieldRequired(field: FieldState<unknown, string>) {
    return field.hasMetadata(REQUIRED);
  }

  hasErrors(field: FieldState<unknown, string>) {
    return field.touched() && field.errors().length > 0;
  }
}
