import * as styled from './Cart.styled';

import { CartContainer } from '../../CartContainer/CartContainer';
import { Layout } from '../../common/Layout/Layout';
import { OrderSummary } from '../../OrderSummary/OrderSummary';

export const Cart = () => {
  return (
    <Layout>
      <styled.PageTitle>장바구니</styled.PageTitle>
      <styled.Main>
        <CartContainer />
        <OrderSummary />
      </styled.Main>
    </Layout>
  );
};
