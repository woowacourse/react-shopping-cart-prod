import styled from 'styled-components';
import { Layout } from '../layout';
import { CartItemsSection } from '../components/cartPage/cartItemsSection/CartItemsSection';
import { OrderSummarySection } from '../components/cartPage/orderSummarySection/OrderSummarySection';
import { useRecoilValue } from 'recoil';
import { cartItemsLengthState } from '../recoil/selectors/cartListSelector';

export const Cart = () => {
  const cartItemsLength = useRecoilValue(cartItemsLengthState);

  return (
    <Layout>
      <Style.Header>
        <Style.HeaderTitle>장바구니</Style.HeaderTitle>
      </Style.Header>

      {cartItemsLength > 0 ? (
        <Style.Content>
          <CartItemsSection />
          <OrderSummarySection />
        </Style.Content>
      ) : (
        <Style.EmptyCartContainer>
          장바구니가 비어있습니다!
        </Style.EmptyCartContainer>
      )}
    </Layout>
  );
};

const Style = {
  Header: styled.div`
    width: 100%;
    height: 67px;

    display: flex;
    justify-content: center;

    border-bottom: 4px solid #333333;
    margin-bottom: 34px;
  `,
  HeaderTitle: styled.h1`
    padding: 0;
    margin: 0;

    font-size: 32px;
  `,
  Content: styled.div`
    max-width: 1300px;
    height: max-content;

    display: flex;
    gap: 104px;

    margin: 0 auto;

    @media (max-width: 1300px) {
      flex-direction: column;
      align-items: center;
      gap: 0;
    }
  `,
  EmptyCartContainer: styled.div`
    max-width: 1300px;
    min-height: 50vh;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 50px;
  `,
};
