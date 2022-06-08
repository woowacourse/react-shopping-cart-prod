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
};

export default cartAPI;
