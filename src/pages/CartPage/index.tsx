import PaymentsAmount from 'components/Cart/PaymentsAmount';
import CartList from 'components/Cart/CartList';
import RequestFail from 'components/@common/RequestFail';
import { Styled } from './styles';
import { useCart } from './useCart';

const CartPage = () => {
  const { cartList, errorGetCartList } = useCart();

  if (errorGetCartList) return <RequestFail />;

  return (
    <Styled.CartPage>
      <Styled.Header>장바구니</Styled.Header>
      <CartList cartList={cartList} />
      <PaymentsAmount cartList={cartList} />
    </Styled.CartPage>
  );
};

export default CartPage;
