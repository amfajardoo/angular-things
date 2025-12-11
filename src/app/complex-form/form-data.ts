import {
  apply,
  applyWhen,
  email,
  max,
  maxLength,
  min,
  minLength,
  required,
  schema,
} from '@angular/forms/signals';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  hasAddress: boolean;
  address: Address;
}

export const FAKE_ADDRESSES: Address[] = [
  {
    street: 'Carrera 7 # 32-16',
    city: 'Bogotá',
    state: 'Cundinamarca',
    zipCode: '110311',
    country: 'Colombia',
  },
  {
    street: 'Calle 10 Sur # 48-15',
    city: 'Medellín',
    state: 'Antioquia',
    zipCode: '050024',
    country: 'Colombia',
  },
  {
    street: 'Avenida 3 Norte # 17-50',
    city: 'Cali',
    state: 'Valle del Cauca',
    zipCode: '760045',
    country: 'Colombia',
  },
  {
    street: 'Carrera 46 # 74-100',
    city: 'Barranquilla',
    state: 'Atlántico',
    zipCode: '080001',
    country: 'Colombia',
  },
  {
    street: 'Calle 60 # 25-36',
    city: 'Manizales',
    state: 'Caldas',
    zipCode: '170001',
    country: 'Colombia',
  },
  {
    street: 'Transversal 12 # 20-30',
    city: 'Bucaramanga',
    state: 'Santander',
    zipCode: '680003',
    country: 'Colombia',
  },
];

export const INITIAL_USER_ADDRESS_FORM_DATA: Address = {
  street: '',
  city: '',
  zipCode: '',
  country: '',
  state: '',
} as const;

const ZIP_CODE_SCHEMA = schema<string>((path) => {
  required(path, { message: 'Zip code is required when street is provided.' });
  minLength(path, 3, { message: 'Zip code must be between 3 and 5 characters long.' });
  maxLength(path, 5, { message: 'Zip code must be between 3 and 5 characters long.' });
});

export const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  hasAddress: true,
  address: INITIAL_USER_ADDRESS_FORM_DATA,
};

export function createAddressSchema(streetSchema: ReturnType<typeof schema<string>>) {
  return schema<Address>((path) => {
    apply(path.street, streetSchema);

    required(path.city, { message: 'City is required' });
    minLength(path.city, 3, { message: 'City must be at least 3 characters long' });

    required(path.state, { message: 'State is required' });
    minLength(path.state, 2, { message: 'State must be at least 2 characters long' });

    required(path.country, { message: 'Country is required' });
    minLength(path.country, 2, { message: 'Country must be at least 2 characters long' });

    applyWhen(path.zipCode, (context) => context.valueOf(path.street).length > 0, ZIP_CODE_SCHEMA);
  });
}

export function createFormDataSchema(addressSchema: ReturnType<typeof schema<Address>>) {
  return schema<FormData>((path) => {
    required(path.firstName, { message: 'First name is required' });
    minLength(path.firstName, 2, {
      message: 'First name must be at least 2 characters long',
    });

    required(path.lastName, { message: 'Last name is required' });
    minLength(path.lastName, 2, {
      message: 'Last name must be at least 2 characters long',
    });

    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Valid email is required' });

    required(path.age, { message: 'Age is required' });
    min(path.age, 18, { message: 'Age must be at least 18' });
    max(path.age, 120, { message: 'Age must be at most 120' });

    applyWhen(path.address, (context) => context.valueOf(path.hasAddress), addressSchema);
  });
}
