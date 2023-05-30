import FlexBox from 'components/@common/FlexBox';
import OrderItem from 'components/OrderItem/OrderItem';
import OrderPriceSection from 'components/OrderPriceSection/OrderPriceSection';
import SheetLeftSection from 'components/SheetLeftSection/SheetLeftSection';
import React from 'react';
import styled from 'styled-components';

const order = {
  order_id: 3,
  products: [
    {
      name: '사과파이2',
      price: 2200,
      quantity: 1,
      image_url: 'https://www.fooding.kr/files/attach/images/148/930/001/1.jpg',
    },
    {
      name: '자두파이',
      price: 1700,
      quantity: 1,
      image_url: 'https://www.fooding.kr/files/attach/images/148/930/001/1.jpg',
    },
  ],
  total_price: 3900,
  used_point: 9000,
  ordered_at: '2021-08-03 11:04:00',
};

const OrderDetailPage = () => {
  return (
    <OrderDetailPageContainer flexDirection="column">
      <PageTitle>주문 상세</PageTitle>
      <SectionContainer gap="80px" align="flex-start" role="region">
        <OrderItem order={order} type="detail" />
        <PriceSection flexDirection="column" gap="10px">
          <Container justify="space-between">
            <SubTitle>총 상품가격</SubTitle>
            <ProductTotalPrice>{order.total_price}</ProductTotalPrice>
          </Container>
        </PriceSection>
      </SectionContainer>
    </OrderDetailPageContainer>
  );
};

export default OrderDetailPage;

const OrderDetailPageContainer = styled(FlexBox)`
  width: 100%;
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
`;

const SectionContainer = styled(FlexBox)`
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const PriceSection = styled(FlexBox)`
  position: sticky;
  top: 140px;
  width: 40%;
  margin-top: 60px;
  padding: 20px 26px;
  border: 1px solid #dddddd;
  background-color: #f2f2f2;

  @media (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 250px;
    margin: 0;
  }

  @media (max-width: 430px) {
    height: 100%;

    div {
      display: none;
    }
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #dddddd;
`;

const ProductTotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
