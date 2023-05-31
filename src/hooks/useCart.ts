import { useRecoilState, useRecoilValue } from 'recoil';
import { QUANTITY } from '../constants';
import { CART_URL } from '../constants/url';
import { cartState, productSelector, serverState } from '../recoil';
import { useFetchData } from './useFetchData';

export const useSetCart = (productId?: number) => {
  const [cart, setCart] = useRecoilState(cartState);
  const selectedProduct = useRecoilValue(productSelector(productId));

  const server = useRecoilValue(serverState);

  const { api } = useFetchData();

  const findCartItemId = () => cart.find((item) => item.product.id === productId)?.id;

  const updateCart = (value: number) => {
    const quantity = value;
    const cartItemId = findCartItemId();

    api
      .patch(`${server}${CART_URL}/${cartItemId}`, { quantity })
      .then(() => {
        setCart((prev) =>
          prev.map((cartItem) =>
            cartItem.product.id === productId ? { ...cartItem, quantity } : cartItem
          )
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const addToCart = async () => {
    try {
      const response = await api.post(`${server}${CART_URL}`, { productId });
      const location = response.headers.get('location');
      const cartId = location.replace(`${CART_URL}/`, '');

      if (!selectedProduct) return;

      setCart((prev) => [
        ...prev,
        {
          id: Number(cartId),
          quantity: QUANTITY.INITIAL,
          product: selectedProduct,
        },
      ]);
    } catch (error) {
      alert(error);
    }
  };

  const removeItemFromCart = (checkedItemIdList?: number[]) => {
    const cartItemIdList = checkedItemIdList ? checkedItemIdList : [findCartItemId()];

    api
      .delete(`${server}${CART_URL}`, { cartItemIdList })
      .then(() => {
        setCart((prev) =>
          prev.filter(
            (item) => !cartItemIdList.includes(checkedItemIdList ? item.id : item.product.id)
          )
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return { addToCart, removeItemFromCart, updateCart };
};
