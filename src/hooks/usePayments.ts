import { useDispatch, useSelector } from 'react-redux';
import { useCardList } from 'juunzzi-payments';
import { addOrderAsync } from '@/store/cart/action';

export const usePayments = () => {
  const [cardList, cardListDispatch, getCard] = useCardList();

  const { selectedCartItem } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const payCart = () => {
    dispatch(addOrderAsync(selectedCartItem) as any);
  };

  return {
    cardList,
    cardListDispatch,
    getCard,
    payCart,
  };
};
