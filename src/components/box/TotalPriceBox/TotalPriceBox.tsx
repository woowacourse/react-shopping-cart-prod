import styled from '@emotion/styled';
import TextList from '../../common/TextList/TextList';
import Button from '../../common/Button/Button';
import getPriceFormat from '../../../utils/getPriceFormat';
<<<<<<< HEAD
import { CouponType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
=======
>>>>>>> upstream/hafnium1923

interface TotalPriceBoxProps {
  totalProductPrice: number;
  shippingFee: number;
<<<<<<< HEAD
  onOrder: () => void;
  coupon?: CouponType;
  isValid?: boolean;
}

const TotalPriceBox = ({
  totalProductPrice,
  shippingFee,
  onOrder,
  coupon = undefined,
  isValid = true,
}: TotalPriceBoxProps) => {
  const discountPrice = coupon
    ? Math.floor(totalProductPrice * coupon.discountRate + coupon.discountAmount)
    : 0;

  const totalPrice = getPriceFormat(totalProductPrice + shippingFee - discountPrice);
=======
  isValid?: boolean;
}

const TotalPriceBox = ({ totalProductPrice, shippingFee, isValid = true }: TotalPriceBoxProps) => {
  const totalPrice = getPriceFormat(totalProductPrice + shippingFee);
>>>>>>> upstream/hafnium1923

  return (
    <TotalPriceBoxWrapper>
      <BoxInner>
        <TextList label="총 선택상품금액" text={`${getPriceFormat(totalProductPrice)}원`} />
<<<<<<< HEAD
        <TextList
          label="쿠폰할인"
          text={discountPrice ? `- ${getPriceFormat(discountPrice)}원` : '적용한 쿠폰이 없습니다'}
        />
        {discountPrice && (
          <Text size="smallest" weight="light" color="#5f5f5f">
            {coupon?.name}
          </Text>
        )}
=======
>>>>>>> upstream/hafnium1923
        <TextList label="배송비" text={`+ ${getPriceFormat(shippingFee)}원`} />
        <TotalPriceWrapper>
          <TextList label="총 주문액" text={`${totalPrice}원`} primary />
        </TotalPriceWrapper>
        <Button
          primary
          size="big"
          isValid={isValid}
          text={isValid ? `${totalPrice}원 주문하기` : '상품을 선택해주세요.'}
          width="100%"
<<<<<<< HEAD
          onClick={onOrder}
=======
>>>>>>> upstream/hafnium1923
        />
      </BoxInner>
    </TotalPriceBoxWrapper>
  );
};

export default TotalPriceBox;

const TotalPriceBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
<<<<<<< HEAD

=======
>>>>>>> upstream/hafnium1923
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
<<<<<<< HEAD
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  padding: 12px 18px 24px 18px;
`;

const TotalPriceWrapper = styled.div`
  width: 100%;
=======
  padding: 12px 18px 24px 18px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const TotalPriceWrapper = styled.div`
>>>>>>> upstream/hafnium1923
  margin: 12px 0 24px 0;
  padding: 12px 0 12px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
