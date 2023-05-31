import { useLocation } from 'react-router-dom';
import OrderCard from '../components/OrderCard/OrderCard';
import { styled } from 'styled-components';
import { WIDTH } from '../styles/mediaQuery';

const OrderDetailPage = () => {
  const location = useLocation();
  const {
    orderId,
    items,
    productPrice,
    discountPrice,
    deliveryFee,
    totalPrice,
  } = location.state;

  return (
    <Wrapper>
      <OrderCard
        key={orderId}
        orderId={orderId}
        items={items}
        productPrice={productPrice}
        discountPrice={discountPrice}
        deliveryFee={deliveryFee}
        totalPrice={totalPrice}
        showDetailButton={false}
      />
      <Bill>
        <SubTitle>결제금액 정보</SubTitle>
        <DetailWrapper>
          <SubPrice>총 상품 금액 : ₩ {productPrice.toLocaleString()}</SubPrice>
          <SubPrice>할인 금액 : - ₩ {discountPrice.toLocaleString()}</SubPrice>
          <SubPrice>배송비 : ₩ {deliveryFee.toLocaleString()}</SubPrice>
          <TotalPrice>
            총 결제 금액 : ₩ {totalPrice.toLocaleString()}
          </TotalPrice>
        </DetailWrapper>
      </Bill>
    </Wrapper>
  );
};

export default OrderDetailPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  width: 70%;
`;

const Bill = styled.div`
  display: flex;
  flex-direction: column;

  height: 320px;
  width: 448px;

  border: 1px solid var(--grey-100);

  margin-top: 32px;

  @media (max-width: ${WIDTH.MD}) {
    height: 180px;
    width: 300px;
  }
`;

const SubTitle = styled.div`
  width: 100%;

  border-bottom: 1px solid var(--grey-100);

  padding: 22px 30px;

  color: #333333;
  font-size: 24px;
  font-weight: 200;

  @media (max-width: ${WIDTH.MD}) {
    padding: 12px 12px;

    font-size: 12px;
  }
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
  gap: 24px;

  width: 100%;

  padding: 32px;

  @media (max-width: ${WIDTH.MD}) {
    gap: 12px;
    padding: 16px;
  }
`;

const SubPrice = styled.span`
  font-size: 20px;
  font-weight: 200;

  @media (max-width: ${WIDTH.MD}) {
    font-size: 12px;
  }
`;

const TotalPrice = styled.span`
  font-size: 24px;
  font-weight: 200;

  @media (max-width: ${WIDTH.MD}) {
    font-size: 12px;
  }
`;
