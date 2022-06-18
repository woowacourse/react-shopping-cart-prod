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
  address: string;
  detailAddress: string;
  zonecode: string;
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
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  isAddedToCart?: boolean;
};

export type CartItem = {
  cartItemId: number;
  product: Product;
  quantity: number;
};

export type Action = {
  type: typeof TYPES[keyof typeof TYPES];
  payload: any;
};

export type StoreState = {
  customerState: {
    isLoading: boolean;
    error: any;
    isSignupSuccessful: boolean;
    isUpdateProfileSuccessful: boolean;
    isUnregisterSuccessful: boolean;
    userId: number | null;
    accessToken: string | null;
    customer: User | null;
  };
  productsState: {
    isLoading: boolean;
    error: any;
    productList: Product[];
  };
  productDetailState: {
    isLoading: boolean;
    error: any;
    productDetail: Product | null;
    isAddedToCart: boolean;
  };
  cartState: {
    isLoading: boolean;
    error: any;
    cart: CartItem[];
  };
};

export type Theme = typeof theme;
