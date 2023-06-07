import styled from '@emotion/styled';
import TextList from '../../../common/TextList/TextList';
import Button from '../../../common/Button/Button';
import { useRecoilValue } from 'recoil';
import { appliedCouponState, checkCartListState } from '../../../../service/atom';
import { useEffect, useState } from 'react';
import useOrder from '../../../../hooks/useOrder';

interface TotalPriceBoxProps {
  totalProductPrice: number;
  shippingFee: number;
  isValid?: boolean;
}

const TotalPriceBox = ({ totalProductPrice, shippingFee, isValid = true }: TotalPriceBoxProps) => {
  const appliedCoupon = useRecoilValue(appliedCouponState);
  const checkCartList = useRecoilValue(checkCartListState);

  const [discountMoney, setDiscountMoney] = useState<number>(0);

  const { orderAPI } = useOrder();

  useEffect(() => {
    if (appliedCoupon) {
      setDiscountMoney(
        appliedCoupon?.discountType === 'deduction'
          ? appliedCoupon.discountAmount
          : totalProductPrice * appliedCoupon.discountRate,
      );
    }
  }, [totalProductPrice, appliedCoupon]);

  const onOrder = () => {
    orderAPI.mutate({ selectCartIds: checkCartList, couponId: appliedCoupon?.id });
  };

  return (
    <TotalPriceBoxWrapper>
      <BoxInner>
        <TextList label="총 선택상품금액" text={`${totalProductPrice.toLocaleString()}원`} />
        {discountMoney > 0 && (
          <TextList
            label="쿠폰 할인"
            text={`- ${discountMoney.toLocaleString()}원`}
            color="rgb(255, 64, 62)"
          />
        )}
        <TextList label="배송비" text={`+ ${shippingFee.toLocaleString()}원`} />
        <TotalPriceWrapper>
          <TextList
            label="총 주문액"
            text={`${(totalProductPrice + shippingFee - discountMoney).toLocaleString()}원`}
            primary
          />
        </TotalPriceWrapper>
        <Button
          primary
          size="big"
          isValid={isValid}
          text={
            isValid
              ? `${(totalProductPrice + shippingFee - discountMoney).toLocaleString()}원 주문하기`
              : '상품을 선택해주세요.'
          }
          width="100%"
          onClick={onOrder}
        />
      </BoxInner>
    </TotalPriceBoxWrapper>
  );
};

export default TotalPriceBox;

const TotalPriceBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: auto;
  background-color: rgb(243, 245, 247);
  border-radius: 6px;
  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

const BoxInner = styled.div`
  padding: 12px 18px 24px 18px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const TotalPriceWrapper = styled.div`
  margin: 12px 0 24px 0;
  padding: 12px 0 12px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
