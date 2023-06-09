import { postPayment } from 'api/payments';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { useMutate } from 'hooks/useMutate';
import { useRecoilValue } from 'recoil';
import { checkedItemIdsAtom, couponAtom } from 'recoil/carts';

const useSubmitOrder = () => {
  const { request, error } = useMutate();
  const { toast } = useToast();
  const checkItemIds = useRecoilValue(checkedItemIdsAtom);
  const couponIds = useRecoilValue(couponAtom);

  const makeOrder = (orderInfo: {
    isDeliveryFree: boolean;
    totalPrice: number;
  }) => {
    const { isDeliveryFree, totalPrice } = orderInfo;

    const payment = {
      cartItemIds: checkItemIds,
      couponIds,
      isDeliveryFree,
      totalPrice,
    };

    request(postPayment(payment));

    if (error.isError) {
      toast.error('주문 요청에 실패했습니다.');
    }
  };

  return { makeOrder };
};

export default useSubmitOrder;
