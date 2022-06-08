import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import { CartState, loadCartsAPI, selectCartState } from 'redux/modules/cart';

import { useCartAmount } from 'hooks/useCartSelector';
import { PageLayout, CartProductList, PaymentBox } from 'components';
import { Loader } from 'components/@shared';

import { GridContainer } from './styles';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = useCartAmount();
  const { loading }: CartState = useSelector(selectCartState);

  useEffect(() => {
    dispatch(loadCartsAPI());
  }, []);

  if (loading) {
    return <Loader />;
  }

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
