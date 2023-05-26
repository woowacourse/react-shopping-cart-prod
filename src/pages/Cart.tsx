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
    width: 1320px;
    height: 67px;

    display: flex;
    justify-content: center;

    border-bottom: 4px solid #333333;
    margin-bottom: 34px;

    @media screen and (max-width: 480px) {
      width: 90vw;
      margin-bottom: 25px;
    }
  `,
  HeaderTitle: styled.h1`
    padding: 0;
    margin: 0;

    font-size: 32px;

    @media screen and (max-width: 480px) {
      font-size: 25px;
    }
  `,
  Content: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    gap: 104px;

    @media screen and (max-width: 480px) {
      width: 100vw;
    }
  `,
  EmptyCartContainer: styled.div`
    width: 1320px;
    min-height: 50vh;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 50px;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
};
