import * as styled from './CartPage.styled';

import { CartContainer } from '../../CartContainer/CartContainer';
import { OrderSummary } from '../../OrderSummary/OrderSummary';
import { PageTitle } from '../../styled/PageTitle';

export const CartPage = () => {
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <styled.Content>
        <CartContainer />
        <OrderSummary />
      </styled.Content>
    </>
  );
};
