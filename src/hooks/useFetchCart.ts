import { useSetRecoilState } from 'recoil';
import { cartAtom, selectedItemListAtom } from '../store/cart';
import { Cart } from '../types/response';
import useFetch from './useFetch';
import { END_POINTS } from '../constants/endPoints';

const useFetchCart = () => {
  const setCartList = useSetRecoilState(cartAtom);
  const setIsSelectedList = useSetRecoilState(selectedItemListAtom);
  const { handleFetch } = useFetch(END_POINTS.CART_ITEMS);

  const addToCart = async (productId: number) => {
    try {
      const data = await handleFetch('POST', { productId });
      const { id, quantity, product } = data;

      setCartList((cartList) => [...cartList, { id, quantity, product }]);
    } catch (error) {
      error ? alert(error) : alert('장바구니 추가 요청이 실패했습니다.');
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    try {
      await handleFetch('PATCH', { quantity }, id);
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
      error ? alert(error) : alert('수량 변경 요청이 실패했습니다.');
    }
  };

  const deleteCartItem = async (id: number) => {
    try {
      await handleFetch('DELETE', {}, id);
      setCartList((cartList) => [...cartList.filter((item) => item.id !== id)]);
      setIsSelectedList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      error ? alert(error) : alert('장바구니 삭제 요청이 실패했습니다.');
    }
  };

  return { addToCart, updateCartItem, deleteCartItem };
};

export default useFetchCart;
