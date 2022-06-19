import PATH from 'constants/path';
import { User } from 'types/index';
import { axios, axiosWithToken } from 'configs/api';

const cartAPI = {
  getCartItemList: async function () {
    const { data } = await axiosWithToken.get('/customers/me/cart-items');

    return data;
  },
  addCartItem: async function (productId: number, quantity = 1) {
    const requestBody = { productId, quantity };

    await axiosWithToken.post('/customers/me/cart-items', requestBody);

    return this.getCartItemList();
  },
  deleteCartItem: async function (cartItemId: number) {
    await axiosWithToken.delete(`/customers/me/cart-items/${cartItemId}`);

    return this.getCartItemList();
  },
  updateCartItemQuantity: async function (
    cartItemId: number,
    quantity: number
  ) {
    const requestBody = { quantity };

    await axiosWithToken.patch(
      `/customers/me/cart-items/${cartItemId}`,
      requestBody
    );

    return this.getCartItemList();
  },
};
export default cartAPI;
