import { useNavigate } from 'react-router-dom';
import { discountPrice, selectedCartItemIdsState } from '../../../atoms/cart';
import { totalPriceSelector } from '../../../atoms/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import { useMutateOrder } from '../../../hooks/order/order';
import * as S from './OrderAside.styles';
import { useRecoilValue } from 'recoil';
import { selectedCouponsState } from '../../../atoms/coupons';

const OrderAside = () => {
  const totalPrice = useRefreshableRecoilValue(totalPriceSelector);
  const selectedItems = useRefreshableRecoilValue(selectedCartItemIdsState);
  const totalDiscountPrice = useRefreshableRecoilValue(discountPrice);
  const selectedCoupons = useRecoilValue(selectedCouponsState);

  const { postOrderMutation } = useMutateOrder();
  const navigate = useNavigate();
  const onOrder = async () => {
    await postOrderMutation({
      cartItemIds: [...selectedItems],
      couponIds: selectedCoupons,
    });

    navigate('/order');
  };

  return (
    <S.Root>
      <S.Title>결제예상금액</S.Title>
      <S.TextWrapper>
        <S.Text>총 상품가격</S.Text>
        <S.Text>{totalPrice.toLocaleString()}원</S.Text>
      </S.TextWrapper>
      <S.TextWrapper>
        <S.Text>할인 금액</S.Text>
        <S.Text color='red'>
          {totalPrice === 0 ? 0 : totalDiscountPrice.toLocaleString()}원
        </S.Text>
      </S.TextWrapper>
      <S.TextWrapper>
        <S.Text>총 주문금액</S.Text>
        <S.Text>
          {Math.max(0, totalPrice - totalDiscountPrice).toLocaleString()}원
        </S.Text>
      </S.TextWrapper>
      <S.OrderButton size='L' view='black' onClick={onOrder}>
        주문하기
      </S.OrderButton>
    </S.Root>
  );
};

export default OrderAside;
