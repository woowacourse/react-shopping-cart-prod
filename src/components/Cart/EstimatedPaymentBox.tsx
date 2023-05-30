import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Common/Button';
import { useRecoilValue } from 'recoil';
import {
  checkedItemAtom,
  totalPriceSelector,
} from '../../recoil/checkedProductData';
import {
  FREE_DELIVERY_THRESHOLD,
  REWARD_POINT_RATE,
  STANDARD_DELIVERY_FEE,
} from '../../constants/price';
import { hostNameAtom } from '../../recoil/hostData';
import { orderApi } from '../../apis/orderProducts';
import type { OrderData } from '../../types/product';

interface EstimatedPaymentBoxProps {
  usePoint: number;
}

const EstimatedPaymentBox = ({ usePoint }: EstimatedPaymentBoxProps) => {
  const checkedCartProduct = useRecoilValue(checkedItemAtom);
  const totalProductPrice = useRecoilValue(totalPriceSelector);
  const totalDeliveryFee =
    totalProductPrice === 0 || totalProductPrice >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;
  const totalPrice = totalProductPrice
    ? totalProductPrice + totalDeliveryFee
    : 0;
  const rewardPoints = totalProductPrice * REWARD_POINT_RATE;

  // 커스텀 훅 분리
  const hostName = useRecoilValue(hostNameAtom);

  const submitOrder = () => {
    const products = checkedCartProduct.map((item) => ({
      productId: item.product.productId,
      quantity: item.quantity,
    }));

    const orderData: OrderData = {
      products,
      totalProductPrice,
      totalDeliveryFee,
      usePoint,
      totalPrice,
    };

    orderApi(hostName).then((apiInstance) => {
      return apiInstance.postOrderProduct(orderData);
    });
  };

  return (
    <EstimatedPaymentBoxContainer>
      <EstimatedPaymentTitle>결제예상금액</EstimatedPaymentTitle>
      <EstimatedPaymentContent>
        <EstimatedPaymentInfo>
          <dt>총 상품가격</dt>
          <dd>{totalProductPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 배송비</dt>
          <dd>{totalDeliveryFee.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 적립 금액</dt>
          <dd>{rewardPoints.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>포인트 사용 금액</dt>
          <dd>{usePoint.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
        <EstimatedPaymentInfo>
          <dt>총 주문금액</dt>
          <dd>{totalPrice.toLocaleString('KR')}원</dd>
        </EstimatedPaymentInfo>
      </EstimatedPaymentContent>
      <OrderButtonWrapper>
        <Link to={'/orders'}>
          <Button
            designType='order'
            buttonLabel='주문하기'
            onClick={submitOrder}
          />
        </Link>
      </OrderButtonWrapper>
    </EstimatedPaymentBoxContainer>
  );
};

const EstimatedPaymentBoxContainer = styled.div`
  width: 448px;
  height: 480px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  @media (max-width: 420px) {
    width: 330px;
    height: 492px;
  }
`;

const EstimatedPaymentTitle = styled.div`
  height: 71px;
  padding: 25px 0 20px 30px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
  font-size: 20px;
`;

const EstimatedPaymentContent = styled.div`
  padding: 20px 30px 0;

  & > :nth-child(3),
  & > :nth-child(5) {
    padding-top: 41px;
  }
`;

const EstimatedPaymentInfo = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const OrderButtonWrapper = styled.div`
  padding: 40px 30px 0;
`;

export default EstimatedPaymentBox;
