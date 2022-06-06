import { TYPES } from 'redux/actions';

import theme from 'styles/theme';

export type Customer = {
  email: string;
  password: string;
  profileImageUrl: string;
  name: string;
  gender: 'male' | 'female' | 'undefined';
  birthday: string;
  contact: string;
  fullAddress: {
    address: string;
    detailAddress: string;
    zoneCode: string;
  };
  terms: boolean;
};
export type User = Customer & { userId: number; accessToken: string | null };

export type SignupRequestBody = Omit<Customer, 'userId'>;

export type SigninRequestBody = {
  email: Customer['email'];
  password: Customer['password'];
};

export type SigninResponseBody = { accessToken: string; userId: number };

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  brandId: string;
  categoryId: string;
  createdAt: number;
  isAddedToCart?: boolean;
};

export type CartItem = {
  userId: string;
  quantity: number;
};

export type Action = {
  type: typeof TYPES[keyof typeof TYPES];
  payload: any;
};

export type StoreState = {
  productsState: {
    isLoading: boolean;
    error: any;
    productList: Product[];
  };
  productDetailState: {
    isLoading: boolean;
    error: any;
    productDetail: Product | null;
  };
  cartState: {
    isLoading: boolean;
    error: any;
    cart: { product: Product; quantity: number; checked: boolean }[];
  };
};

export type Theme = typeof theme;

export type Routes<T> = {
  [property in keyof T]: string;
};
