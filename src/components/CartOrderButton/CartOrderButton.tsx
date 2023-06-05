import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { tokenized } from '../../constants';
import { cartOrderDataState, cartTotalAmountState } from '../../store/cart';
import { checkedCouponIdState } from '../../store/coupon';
import { originState } from '../../store/origin';
import { cartPaymentResultState } from '../../store/payment';
import { priceFormatter } from '../../utils/formatter';
import styles from './style.module.css';

type RequestOrderType = {
  products: { id: number; quantity: number }[];
  totalProductAmount: number;
  deliveryAmount: number;
  address: string;
  couponId?: number;
};

const CartOrderButton = () => {
  const navigate = useNavigate();
  const cartPayment = useRecoilValue(cartPaymentResultState);
  const cartTotalAmount = useRecoilValue(cartTotalAmountState);
  const checkedCouponId = useRecoilValue(checkedCouponIdState);
  const cartOrderData = useRecoilValue(cartOrderDataState);
  const origin = useRecoilValue(originState);

  const mutation = useMutation({
    mutationFn: async (data: RequestOrderType) => {
      const response = await fetch(`${origin}orders`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Basic ${tokenized}`,
        },
      });

      return response.json();
    },
    onSuccess: (data) => {
      navigate(`/orders/${data.id}`);
    },
  });

  return (
    <button
      className={styles.orderButtonContainer}
      onClick={() => {
        mutation.mutate({
          products: cartOrderData,
          totalProductAmount: cartTotalAmount,
          deliveryAmount: 3000,
          address: '서울특별시 송파구 송파송파',
          couponId: checkedCouponId,
        });
      }}
    >
      주문하기 ({priceFormatter(cartPayment)}원)
    </button>
  );
};

export default CartOrderButton;
