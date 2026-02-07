export interface FormValues {
  [key: string]: string | number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}
