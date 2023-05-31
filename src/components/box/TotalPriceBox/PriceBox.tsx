import styled from '@emotion/styled';
import TextList from '../../common/TextList/TextList';
import getPriceFormat from '../../../utils/getPriceFormat';
import { CouponType } from '../../../types/types';
import { Text } from '../../common/Text/Text';

interface PriceBoxProps {
  originalPrice: number;
  finalPrice: number;
  shippingFee: number;
  coupon?: CouponType;
}

const PriceBox = ({
  originalPrice,
  finalPrice: discountPrice,
  shippingFee,
  coupon = undefined,
}: PriceBoxProps) => {
  const totalPrice = getPriceFormat(shippingFee + discountPrice);

  return (
    <PriceBoxWrapper>
      <BoxInner>
        <TotalHeadWrapper>
          <Text size="medium" weight="bold">
            결제금액 정보
          </Text>
        </TotalHeadWrapper>
        <TextList label="총 상품금액" text={`${getPriceFormat(originalPrice)}원`} />
        {coupon && (
          <>
            <TextList
              label="쿠폰할인"
              text={`- ${getPriceFormat(originalPrice - discountPrice)}원`}
            />
            <Text size="smallest" weight="light" color="#5f5f5f">
              {coupon.name}
            </Text>
          </>
        )}
        <TextList label="배송비" text={`+ ${getPriceFormat(shippingFee)}원`} />
        <TotalPriceWrapper>
          <TextList label="총 결제금액" text={`${totalPrice}원`} primary />
        </TotalPriceWrapper>
      </BoxInner>
    </PriceBoxWrapper>
  );
};

export default PriceBox;

const PriceBoxWrapper = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  padding: 12px 18px 12px 18px;
`;

const TotalPriceWrapper = styled.div`
  width: 100%;
  padding: 12px 0 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
const TotalHeadWrapper = styled.div`
  width: 100%;
  padding: 0 0 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
