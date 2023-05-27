import { useRecoilValue } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';
import { base64 } from '../../constants/user';

export const useCartFetch = () => {
  const apiEndPoint = useRecoilValue(APIAtom);

  const addCartItemById = (id: number) => {
    return fetch(`${apiEndPoint}/cart-items`, {
      method: 'POST',
      body: JSON.stringify({ productId: id }),
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const deleteCartItemById = (id: number) => {
    fetch(`${apiEndPoint}/cart-items/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const patchCartItemQuantity = (id: number, quantity: number) => {
    fetch(`${apiEndPoint}/cart-items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const getCartItems = async (apiEndPoint: string) => {
    const response = await fetch(`${apiEndPoint}/cart-items`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
    const cartItems = await response.json();

    return cartItems;
  };

  return {
    addCartItemByProductId: addCartItemById,
    deleteCartItemById,
    patchCartItemQuantity,
    getCartItems,
  };
};
