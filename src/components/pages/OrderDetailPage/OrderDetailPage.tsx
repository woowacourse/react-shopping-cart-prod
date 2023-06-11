import { useParams } from 'react-router-dom';
import * as styled from './OrderDetailPage.stlyed';

import { useFetchOrderDetail } from '@recoils/ordersAtoms';

import { OrderBox } from '@components/OrderBox/OrderBox';

export const OrderDetailPage = () => {
  const { id } = useParams();

  const { orderId, orderDate, orderDetails, ...fee } = useFetchOrderDetail(Number(id));
  const orderInfo = { orderId, orderDate, orderDetails };

  const paidPrice = fee.totalProductsPrice + fee.shippingFee - fee.usedPoint;

  return (
    <>
      <OrderBox orderInfo={orderInfo} />
      <styled.ReceiptWrapper>
        <styled.ReceiptBox>
          <styled.ReceiptHeader>영수증</styled.ReceiptHeader>
          <ul>
            <li>
              <span>총 상품 가격: </span>
              <span>{fee.totalProductsPrice.toLocaleString('ko-kr')}원</span>
            </li>
            <li>
              <span>배송비: </span>
              <span>{fee.shippingFee.toLocaleString('ko-kr')}원</span>
            </li>
            <li>
              <span>사용한 포인트: </span>
              <span>{fee.usedPoint}</span>
            </li>
            <li>
              <span>결제 금액</span>
              <span>{paidPrice.toLocaleString('ko-kr')}원</span>
              <div></div>
            </li>
          </ul>
        </styled.ReceiptBox>
      </styled.ReceiptWrapper>
    </>
  );
};
