import { useSetRecoilState } from 'recoil';
import { cartAtom } from '../store/cart';
import { Cart } from '../types/responseData';
import useFetch from './useFetch';
import { END_POINTS } from '../constants/endPoints';

const useFetchCart = () => {
  const setCartList = useSetRecoilState(cartAtom);
  const { handleFetch } = useFetch(END_POINTS.CART_ITEMS);

  const addToCart = async (productId: number) => {
    try {
      const data = await handleFetch('POST', { productId });
      const { id, quantity, product } = data;

      setCartList((cartList) => [...cartList, { id, quantity, product }]);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    try {
      handleFetch('PATCH', { quantity }, id);
      setCartList(
        (cartList) =>
          [
            ...cartList.map((cart) => {
              if (cart.id === id) return { ...cart, quantity };
              return cart;
            }),
          ] as Cart[]
      );
    } catch (error) {
      alert(error);
    }
  };

  const deleteCartItem = async (id: number) => {
    try {
      handleFetch('DELETE', {}, id);
      setCartList((cartList) => [...cartList.filter((item) => item.id !== id)]);
    } catch (error) {
      alert(error);
    }
  };

  return { addToCart, updateCartItem, deleteCartItem };
};

export default useFetchCart;
