import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import {
  CartItem,
  Customer,
  Product,
  SigninResponseBody,
  SignupRequestBody,
  User,
} from 'types';

const api = {
  customer: {
    get: async (customerId: User['userId']) =>
      axios.get(`${SERVER_URL}/api/customers/${customerId}`),
    signup: async (signupPayload: Customer) =>
      axios.post<SignupRequestBody>(
        `${SERVER_URL}/api/customers`,
        signupPayload
      ),
    signin: async (signinPayload: Pick<Customer, 'email' | 'password'>) =>
      axios.post<SigninResponseBody>(
        `${SERVER_URL}/api/customer/authentication/sign-in`,
        signinPayload
      ),
    update: async (customerId: User['userId'], updatedCustomer: Customer) =>
      axios.put(`${SERVER_URL}/api/customers/${customerId}`, updatedCustomer),
    remove: async (customerId: number) =>
      axios.delete(`${SERVER_URL}/api/customers/${customerId}`),
    checkIsEmailDuplicated: async (email: string) =>
      axios.get<{ isDuplicated: boolean }>(
        `${SERVER_URL}/api/validation?email=${email}`
      ),
  },
  products: {
    getAll: async () => axios.get<Product[]>(`${SERVER_URL}/api/products`),
    get: async (id: number) => axios.get(`${SERVER_URL}/api/products/${id}`),
    checkIsAddedToCart: async (productId: number) =>
      axios.get(`${SERVER_URL}/api/customers/cart/${productId}`),
  },
  cart: {
    get: async () => axios.get<CartItem[]>(`${SERVER_URL}/api/customers/cart`),
    addItemToCart: async (productId: number, quantity: number) =>
      axios.post(`${SERVER_URL}/api/customers/cart`, {
        productId,
        quantity,
      }),
    updateQuantity: async (
      cartItemId: CartItem['cartItemId'],
      productId: CartItem['product']['id'],
      quantity: CartItem['quantity']
    ) =>
      axios.put(`${SERVER_URL}/api/customers/cart/${cartItemId}`, {
        productId,
        quantity,
      }),
    removeItemFromCart: async (cartItemId: number) =>
      axios.delete(`${SERVER_URL}/api/customers/cart/${cartItemId}`),
  },
};

export default api;
