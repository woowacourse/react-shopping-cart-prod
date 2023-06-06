import { useCallback } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedItemListAtom } from '../../store/cart';
import { WIDTH } from '../../constants/mediaQuery';
import useFetchOrder from '../../hooks/useFetchOrder';
import {
  DISCOUNT_BOUNDARY,
  DISCOUNT_PERCENT,
  FREE_DELIVERY_BOUNDARY,
} from '../../constants/policy';
import { billSelector, totalProductPriceAtom } from '../../store/bill';

const Bill = () => {
  const selectedItemList = useRecoilValue(selectedItemListAtom);
  const totalProductPrice = useRecoilValue(totalProductPriceAtom);
  const { deliveryFee, discountAmount, totalOrderAmount } =
    useRecoilValue(billSelector);
  const { postOrders } = useFetchOrder();

  const onClickOrder = useCallback(async () => {
    const orders = selectedItemList
      .filter((item) => item.isSelected)
      .map((item) => item.order);
    await postOrders(orders);
  }, [selectedItemList]);

  return (
    <Wrapper>
      <SubTitle>결제예상금액</SubTitle>
      <DetailWrapper>
        <DetailItem>
          총 상품가격 <span>₩ {totalProductPrice.toLocaleString()}</span>
        </DetailItem>
        <DetailItem>
          할인 금액 <span> ₩ {discountAmount.toLocaleString()}</span>
        </DetailItem>
        <DetailItem>
          배송비
          <span>₩ {totalProductPrice && deliveryFee.toLocaleString()}</span>
        </DetailItem>
        <TotalAmount>
          총 주문금액
          <span>₩{totalProductPrice && totalOrderAmount.toLocaleString()}</span>
        </TotalAmount>
        <MessageWrapper>
          <Message>
            * {FREE_DELIVERY_BOUNDARY / 10000} 만원 이상 구매시 배송비 무료
          </Message>
          <Message>
            * {DISCOUNT_BOUNDARY / 10000} 만원 이상 주문시 {DISCOUNT_PERCENT} %
            할인
          </Message>
        </MessageWrapper>
        <OrderButton onClick={onClickOrder}>주문하기</OrderButton>
      </DetailWrapper>
    </Wrapper>
  );
};

export default Bill;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 450px;
  width: 448px;
  min-width: 360px;

  border: 1px solid var(--grey-100);
  margin-top: 64px;

  @media (max-width: ${WIDTH.LG}) {
    width: 95vw;
  }
`;

const SubTitle = styled.div`
  width: 100%;

  border-bottom: 1px solid var(--grey-100);

  padding: 22px 30px;

  font-size: 24px;
  font-weight: 200;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;

  width: 100%;

  padding: 32px;

  div {
    font-weight: 200;
  }
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 20px;
  font-weight: bold;
`;

const TotalAmount = styled(DetailItem)`
  margin: 12px 0 0 0;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Message = styled.div`
  text-align: right;
  font-size: 15px;

  width: 100%;

  color: #747373;
`;

const OrderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--grey-100);

  height: 73px;
  width: 100%;

  font-size: 24px;
  font-weight: 200;

  transition: background-color 0.5s ease;

  &:hover {
    color: #fff;
    background-color: var(--main-bg-color);
  }
`;
