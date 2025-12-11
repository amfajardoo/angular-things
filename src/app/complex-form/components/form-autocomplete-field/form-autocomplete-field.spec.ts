import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAutocompleteField } from './form-autocomplete-field';

describe('FormAutocompleteField', () => {
  let component: FormAutocompleteField;
  let fixture: ComponentFixture<FormAutocompleteField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAutocompleteField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAutocompleteField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
