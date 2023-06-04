import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { cartOrderDataState } from '../../store/cart';
import { originState } from '../../store/origin';
import { cartPaymentResultState } from '../../store/payment';
import { priceFormatter } from '../../utils/formatter';
import styles from './style.module.css';

type RequestOrderType = { id: number; quantity: number }[];

const CartOrderButton = () => {
  const navigate = useNavigate();
  const cartPayment = useRecoilValue(cartPaymentResultState);
  const cartOrderData = useRecoilValue(cartOrderDataState);
  const origin = useRecoilValue(originState);

  const mutation = useMutation({
    mutationFn: async (data: RequestOrderType) => {
      const response = await fetch(`${origin}orders`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      return response.json();
    },
    onSuccess: (data) => {
      navigate(`${origin}orders/${data.id}`);
    },
  });

  return (
    <button className={styles.orderButtonContainer} onClick={() => mutation.mutate(cartOrderData)}>
      주문하기 ({priceFormatter(cartPayment)}원)
    </button>
  );
};

export default CartOrderButton;
