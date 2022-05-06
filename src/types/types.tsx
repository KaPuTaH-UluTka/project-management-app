export type SimpleType = string;

export interface ISignUpUser {
  name: 'string';
  email: 'string';
  password: 'string';
}

export interface ILoginUser {
  email: 'string';
  password: 'string';
}
