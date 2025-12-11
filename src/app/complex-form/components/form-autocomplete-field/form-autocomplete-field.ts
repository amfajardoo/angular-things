import { Component, effect, input, model, signal } from '@angular/core';
import type { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

@Component({
  selector: 'app-form-autocomplete-field',
  imports: [],
  templateUrl: './form-autocomplete-field.html',
  styleUrl: './form-autocomplete-field.css',
})
export class FormAutocompleteField implements FormValueControl<string> {
  readonly value = model<string>('');
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly touched = model<boolean>(false);
  readonly invalid = input<boolean>(false);
  pending = input<boolean>(false);

  readonly label = input.required<string>();

  readonly showSuggestions = signal(false);

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.value.set('');
      }
    });
  }

  changeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
  }
}
