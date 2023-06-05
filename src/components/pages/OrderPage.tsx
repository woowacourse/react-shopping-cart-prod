import styled from '@emotion/styled';
import PageTemplate from '../templates/PageTemplate';
import { Text } from '../common/Text/Text';
import OrderList from '../list/OrderList/OrderList';

const OrderPage = () => {
  return (
    <PageTemplate
      title="장바구니 미션 - 주문내역페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문내역페이지입니다."
    >
      <CartPageWrapper>
        <CartPageHead>
          <Text size="extraLarge" weight="bold">
            주문내역
          </Text>
        </CartPageHead>
        <CartPageContent>
          <OrderList />
        </CartPageContent>
      </CartPageWrapper>
    </PageTemplate>
  );
};

export default OrderPage;

const CartPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1140px;
  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 350px;
  }
`;

const CartPageHead = styled.div`
  border-bottom: 4px solid #333;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const CartPageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  position: relative;
  @media screen and (max-width: 1320px) {
    flex-direction: column;
    width: 100%;
  }
`;
