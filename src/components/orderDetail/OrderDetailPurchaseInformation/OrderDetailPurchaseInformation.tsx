import { useRecoilValue } from 'recoil';

import HTTPError from '../../../api/utils/HTTPError';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '../../../constants/api';
import { orderState } from '../../../store/order';
import { priceFormatter } from '../../../utils/formatter';
import Heading from '../../common/Heading/Heading';
import * as S from './OrderDetailPurchaseInformation.styles';

interface OrderDetailPurchaseInformationProps {
  orderId: number;
}

const OrderDetailPurchaseInformation = ({ orderId }: OrderDetailPurchaseInformationProps) => {
  const order = useRecoilValue(orderState(orderId));

  if (!order) {
    throw new HTTPError(HTTP_STATUS_CODE.NOT_FOUND, {
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND],
    });
  }

  return (
    <>
      <Heading css={S.headingStyle} size="xSmall">
        결제 정보
      </Heading>
      <S.InformationContainer>
        <S.InformationData>
          <S.DataLabel>상품 금액</S.DataLabel>
          <S.DataDescription>{priceFormatter(order.totalItemPrice)}원</S.DataDescription>
        </S.InformationData>
        <S.InformationData>
          <S.DataLabel>상품 할인 금액</S.DataLabel>
          <S.DataDescription>{priceFormatter(-order.totalItemDiscountAmount)}원</S.DataDescription>
        </S.InformationData>
        <S.InformationData>
          <S.DataLabel>등급 할인 금액</S.DataLabel>
          <S.DataDescription>
            {priceFormatter(-order.totalMemberDiscountAmount)}원
          </S.DataDescription>
        </S.InformationData>
        <S.InformationData>
          <S.DataLabel>배송비</S.DataLabel>
          <S.DataDescription>{priceFormatter(order.shippingFee)}원</S.DataDescription>
        </S.InformationData>
        <S.InformationData>
          <S.DataLabel>결제 금액</S.DataLabel>
          <S.DataDescription>{priceFormatter(order.totalPrice)}원</S.DataDescription>
        </S.InformationData>
      </S.InformationContainer>
    </>
  );
};

export default OrderDetailPurchaseInformation;
