export type SignInFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type ResetPasswordFormValues = {
  password: string;
};

export type AddressFormValues = {
  fullname: string;
  goverment: string;
  area: string;
  email: string;
  phone: number;
  street: string;
  block: string;
};

export type ReviewFormValues = {
  rating: number;
  comment: string;
  title: string;
  isRecommended: string;
  acceptTerms: boolean;
};
