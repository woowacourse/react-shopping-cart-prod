export const INITIAL_QUANTITY = 1;
export const NONE_QUANTITY = 0;

export const CART_ITEM_INDEX = 0;
export const ONE_ITEM_IN_CART = 1;

export const DELIVERY_FEE = (totalPrice: number) => {
  return totalPrice > 0 ? 3000 : 0;
};

export const email = 'a@a.com';
export const password = '1234';
export const base64 = btoa(`${email}:${password}`);

export const NUMBER_REGEX = /[^0-9]/g;
