import { useNavigate } from 'react-router-dom';
import routes from 'routes';

import { useCartAmount } from 'hooks/useCartSelector';
import { PageLayout, CartProductList, PaymentBox } from 'components';

import { GridContainer } from './styles';

function Cart() {
  const navigate = useNavigate();
  const totalAmount = useCartAmount();

  return (
    <PageLayout title="장바구니">
      <GridContainer>
        <CartProductList />
        <PaymentBox
          title="결제 예상 금액"
          subTitle="결제 예상 금액"
          amount={totalAmount.toLocaleString()}
          onClick={() => navigate(routes.orderList)}
          buttonName="주문하기"
        />
      </GridContainer>
    </PageLayout>
  );
}

export default Cart;
