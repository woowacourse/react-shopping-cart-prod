import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import {
  Customer,
  Product,
  SigninResponseBody,
  SignupRequestBody,
} from 'types';

const TYPES = {
  INITIALIZE_CUSTOMER: 'INITIALIZE_CUSTOMER',
  GET_CUSTOMER: 'GET_CUSTOMER',
  GET_CUSTOMER_PENDING: 'GET_CUSTOMER_PENDING',
  GET_CUSTOMER_FULFILLED: 'GET_CUSTOMER_FULFILLED',
  GET_CUSTOMER_REJECTED: 'GET_CUSTOMER_PENDING',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_PENDING: 'SIGN_IN_PENDING',
  SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',
  SIGN_IN_REJECTED: 'SIGN_IN_REJECTED',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_PENDING: 'SIGN_UP_PENDING',
  SIGN_UP_FULFILLED: 'SIGN_UP_FULFILLED',
  SIGN_UP_REJECTED: 'SIGN_UP_REJECTED',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  UPDATE_PROFILE_PENDING: 'UPDATE_PROFILE_PENDING',
  UPDATE_PROFILE_FULFILLED: 'UPDATE_PROFILE_FULFILLED',
  UPDATE_PROFILE_REJECTED: 'UPDATE_PROFILE_REJECTED',
  UNREGISTER: 'UNREGISTER',
  UNREGISTER_PENDING: 'UNREGISTER_PENDING',
  UNREGISTER_FULFILLED: 'UNREGISTER_FULFILLED',
  UNREGISTER_REJECTED: 'UNREGISTER_REJECTED',
  GET_PRODUCT_LIST: 'GET_PRODUCT_LIST',
  GET_PRODUCT_LIST_PENDING: 'GET_PRODUCT_LIST_PENDING',
  GET_PRODUCT_LIST_FULFILLED: 'GET_PRODUCT_LIST_FULFILLED',
  GET_PRODUCT_LIST_REJECTED: 'GET_PRODUCT_LIST_REJECTED',
  GET_PRODUCT_DETAIL: 'GET_PRODUCT_DETAIL',
  GET_PRODUCT_DETAIL_PENDING: 'GET_PRODUCT_DETAIL_PENDING',
  GET_PRODUCT_DETAIL_FULFILLED: 'GET_PRODUCT_DETAIL_FULFILLED',
  GET_PRODUCT_DETAIL_REJECTED: 'GET_PRODUCT_DETAIL_REJECTED',
  CHECK_IS_PRODUCT_ADDED_TO_CART: 'CHECK_IS_PRODUCT_ADDED_TO_CART',
  CHECK_IS_PRODUCT_ADDED_TO_CART_PENDING:
    'CHECK_IS_PRODUCT_ADDED_TO_CART_PENDING',
  CHECK_IS_PRODUCT_ADDED_TO_CART_FULFILLED:
    'CHECK_IS_PRODUCT_ADDED_TO_CART_FULFILLED',
  CHECK_IS_PRODUCT_ADDED_TO_CART_REJECTED:
    'CHECK_IS_PRODUCT_ADDED_TO_CART_REJECTED',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  ADD_ITEM_TO_CART_PENDING: 'ADD_ITEM_TO_CART_PENDING',
  ADD_ITEM_TO_CART_FULFILLED: 'ADD_ITEM_TO_CART_FULFILLED',
  ADD_ITEM_TO_CART_REJECTED: 'ADD_ITEM_TO_CART_REJECTED',
  GET_CART: 'GET_CART',
  GET_CART_PENDING: 'GET_CART_PENDING',
  GET_CART_FULFILLED: 'GET_CART_FULFILLED',
  GET_CART_REJECTED: 'GET_CART_REJECTED',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  UPDATE_QUANTITY_PENDING: 'UPDATE_QUANTITY_PENDING',
  UPDATE_QUANTITY_FULFILLED: 'UPDATE_QUANTITY_FULFILLED',
  UPDATE_QUANTITY_REJECTED: 'UPDATE_QUANTITY_REJECTED',
  HANDLE_CHECK: 'HANDLE_CHECK',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
} as const;

const actions = {
  initializeCustomer: () => {
    return { type: TYPES.INITIALIZE_CUSTOMER };
  },
  getCustomer: (customerId: number) => {
    const request = axios.get(`${SERVER_URL}/api/customers/${customerId}`);

    return { type: TYPES.GET_CUSTOMER, payload: request };
  },
  signIn: (signinPayload: { email: string; password: string }) => {
    const request = axios
      .post<SigninResponseBody>(
        `${SERVER_URL}/api/customer/authentication/sign-in`,
        signinPayload
      )
      .then((res) => res.data);

    return { type: TYPES.SIGN_IN, payload: request };
  },
  signOut: () => {
    return { type: TYPES.SIGN_OUT };
  },
  signUp: (signupPayload: Customer) => {
    const request = axios
      .post<SignupRequestBody>(`${SERVER_URL}/api/customers`, signupPayload)
      .then((res) => res.data);

    return { type: TYPES.SIGN_UP, payload: request };
  },
  updateProfile: (updatedCustomer: Customer, customerId: number) => {
    const request = axios
      .put(`${SERVER_URL}/api/customers/${customerId}`, updatedCustomer)
      .then((res) => res.data);

    return { type: TYPES.UPDATE_PROFILE, payload: request };
  },
  unregister: (customerId: number) => {
    const request = axios
      .delete(`${SERVER_URL}/api/customers/${customerId}`)
      .then((res) => res.data);

    return { type: TYPES.UNREGISTER, payload: request };
  },
  getProductList: (ids?: Array<number>) => {
    const query = ids ? `?${ids.map((id) => `id=${id}`).join('&')}` : '';
    const request = axios
      .get(`${SERVER_URL}/api/products${query}`)
      .then((res) => res.data);

    return { type: TYPES.GET_PRODUCT_LIST, payload: request };
  },
  getProductDetail: (id: number) => {
    const request = axios
      .get(`${SERVER_URL}/api/products/${id}`)
      .then((res) => res.data);

    return { type: TYPES.GET_PRODUCT_DETAIL, payload: request };
  },
  getCart: () => {
    const request = axios
      .get(`${SERVER_URL}/api/customers/cart`)
      .then((res) => res.data);

    return { type: TYPES.GET_CART, payload: request };
  },
  checkIsProductAddedToCart: (productId: Product['id']) => {
    const request = axios
      .get(`${SERVER_URL}/api/customers/cart/${productId}`)
      .then((res) => res.data);

    return { type: TYPES.CHECK_IS_PRODUCT_ADDED_TO_CART, payload: request };
  },
  addItemToCart: (productId: number, quantity: number) => {
    const request = axios
      .post(`${SERVER_URL}/api/customers/cart`, {
        productId,
        quantity,
      })
      .then((res) => res.data);

    return { type: TYPES.ADD_ITEM_TO_CART, payload: request };
  },
  removeCartItem: (cartItemId: number) => {
    const request = axios
      .delete(`${SERVER_URL}/api/customers/cart/${cartItemId}`)
      .then((res) => res.data);

    return { type: TYPES.REMOVE_CART_ITEM, payload: request };
  },
  updateQuantity: (cartItemId: number, productId: number, quantity: number) => {
    const request = axios
      .put(`${SERVER_URL}/api/customers/cart/${cartItemId}`, {
        productId,
        quantity,
      })
      .then((res) => res.data);

    return { type: TYPES.UPDATE_QUANTITY, payload: request };
  },
  handleCheck: (id: string, checked: boolean) => {
    return { type: TYPES.HANDLE_CHECK, payload: { id, checked } };
  },
};

export { TYPES, actions };
