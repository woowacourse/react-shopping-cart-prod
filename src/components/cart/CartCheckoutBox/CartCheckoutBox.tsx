import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { useCart } from '../../../hooks/useCart';
import { cartListCheckoutCostsState } from '../../../store/cart';
import { checkedCartIdListState } from '../../../store/cartCheckbox';
import { currentMemberInformationState } from '../../../store/member';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBox = () => {
  const checkedIdList = useRecoilValue(checkedCartIdListState);
  const cartListCheckoutCosts = useRecoilValue(cartListCheckoutCostsState);
  const memberInformation = useRecoilValue(currentMemberInformationState);
  const { orderCheckedItems } = useCart();

  const isCartEmpty = checkedIdList.size === 0;

  const handleOrder = useCallback(() => {
    orderCheckedItems([...checkedIdList]);
  }, [checkedIdList, orderCheckedItems]);

  return (
    <S.BoxWrapper>
      <S.BoxContent>
        <S.InformationData>
          <S.InformationDataLabel>상품 금액</S.InformationDataLabel>
          <S.InformationDataDescription>
            {priceFormatter(cartListCheckoutCosts.totalItemPrice)}원
          </S.InformationDataDescription>
        </S.InformationData>
        <S.SubInformationData>
          <S.InformationDataLabel size="small">&#8735; 상품 할인 금액</S.InformationDataLabel>
          <S.InformationDataDescription size="small">
            {cartListCheckoutCosts.totalItemDiscountAmount < 0
              ? priceFormatter(cartListCheckoutCosts.totalItemDiscountAmount)
              : priceFormatter(-cartListCheckoutCosts.totalItemDiscountAmount)}
            원
          </S.InformationDataDescription>
        </S.SubInformationData>
        <S.SubInformationData>
          <S.InformationDataLabel size="small">&#8735; 등급 할인 금액</S.InformationDataLabel>
          <S.InformationDataDescription size="small">
            {cartListCheckoutCosts.totalMemberDiscountAmount < 0
              ? priceFormatter(cartListCheckoutCosts.totalMemberDiscountAmount)
              : priceFormatter(-cartListCheckoutCosts.totalMemberDiscountAmount)}
            원
          </S.InformationDataDescription>
        </S.SubInformationData>
        <S.MembershipData>
          <S.MembershipRank>{memberInformation.rank}</S.MembershipRank>
          <S.InformationDataDescription size="small" as="span">
            {memberInformation.discountRate}% 할인
          </S.InformationDataDescription>
        </S.MembershipData>
        <S.InformationData>
          <S.InformationDataLabel>배송비</S.InformationDataLabel>
          <S.InformationDataDescription>
            {priceFormatter(cartListCheckoutCosts.shippingFee)}원
          </S.InformationDataDescription>
        </S.InformationData>
        <S.TotalInformationData>
          <S.InformationDataLabel>결제 예정 금액</S.InformationDataLabel>
          <S.InformationDataDescription className="semi-bold">
            {priceFormatter(cartListCheckoutCosts.totalPrice)}원
          </S.InformationDataDescription>
        </S.TotalInformationData>
        <Button variant="primary" disabled={isCartEmpty} onClick={handleOrder}>
          {isCartEmpty ? '상품을 담아주세요' : '주문하기'}
        </Button>
      </S.BoxContent>
    </S.BoxWrapper>
  );
};

export default CartCheckoutBox;
