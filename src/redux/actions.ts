import { Customer, Product } from 'types';
import api from 'api';

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
    const request = api.customer.get(customerId);

    return { type: TYPES.GET_CUSTOMER, payload: request };
  },
  signIn: (signinPayload: { email: string; password: string }) => {
    const request = api.customer.signin(signinPayload);

    return { type: TYPES.SIGN_IN, payload: request };
  },
  signOut: () => {
    return { type: TYPES.SIGN_OUT };
  },
  signUp: (signupPayload: Customer) => {
    const request = api.customer.signup(signupPayload);

    return { type: TYPES.SIGN_UP, payload: request };
  },
  updateProfile: (customerId: number, updatedCustomer: Customer) => {
    const request = api.customer.update(customerId, updatedCustomer);

    return { type: TYPES.UPDATE_PROFILE, payload: request };
  },
  unregister: (customerId: number) => {
    const request = api.customer.remove(customerId);

    return { type: TYPES.UNREGISTER, payload: request };
  },
  getProductList: () => {
    const request = api.products.getAll();

    return { type: TYPES.GET_PRODUCT_LIST, payload: request };
  },
  getProductDetail: (id: number) => {
    const request = api.products.get(id);

    return { type: TYPES.GET_PRODUCT_DETAIL, payload: request };
  },
  getCart: () => {
    const request = api.cart.get();

    return { type: TYPES.GET_CART, payload: request };
  },
  checkIsProductAddedToCart: (productId: Product['id']) => {
    const request = api.products.checkIsAddedToCart(productId);

    return { type: TYPES.CHECK_IS_PRODUCT_ADDED_TO_CART, payload: request };
  },
  addItemToCart: (productId: number, quantity: number) => {
    const request = api.cart.addItemToCart(productId, quantity);

    return { type: TYPES.ADD_ITEM_TO_CART, payload: request };
  },
  removeCartItem: (cartItemId: number) => {
    const request = api.cart.removeItemFromCart(cartItemId);

    return { type: TYPES.REMOVE_CART_ITEM, payload: request };
  },
  updateQuantity: (cartItemId: number, productId: number, quantity: number) => {
    const request = api.cart.updateQuantity(cartItemId, productId, quantity);

    return { type: TYPES.UPDATE_QUANTITY, payload: request };
  },
  handleCheck: (id: string, checked: boolean) => {
    return { type: TYPES.HANDLE_CHECK, payload: { id, checked } };
  },
};

export { TYPES, actions };
