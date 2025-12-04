import { minLength, required, schema, email, min, max } from "@angular/forms/signals";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: {
    street: string;
    city: string;
    zip: string;
  };
}

export const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  address: {
    street: '',
    city: '',
    zip: '',
  },
};

export const FORM_DATA_SCHEMA = schema<FormData>((path) => {
  required(path.firstName, { message: 'First name is required' });
  minLength(path.firstName, 2, { message: 'First name must be at least 2 characters long' });
  required(path.lastName, { message: 'Last name is required' });
  minLength(path.lastName, 2, { message: 'Last name must be at least 2 characters long' });
  required(path.email, { message: 'Email is required' });
  email(path.email, { message: 'Valid email is required' });
  required(path.address.zip, { message: 'Zip code is required' });
  minLength(path.address.zip, 5, { message: 'Zip code must be 5 characters long' });
  required(path.age, { message: 'Age is required' });
  min(path.age, 18, { message: 'Age must be at least 18' });
  max(path.age, 120, { message: 'Age must be at most 120' });
})

