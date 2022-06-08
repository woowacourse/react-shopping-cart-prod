import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import { fetchGetCartAsync, postOrderListAsync } from '@/store/cart/action';
import * as Styled from './ShoppingCart.style';
import CartList from '@/components/cart/CartList/CartList';
import OrderForm from '@/components/order/OrderForm/OrderForm';
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer';
import Loading from '@/components/common/Loading/Loading';
import { useThunkFetch } from '@/hooks/useFecth';
import { useCartList } from '@/hooks/useCartList';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/route';
import { useDispatch } from 'react-redux';

function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, cartList } = useThunkFetch({
    selector: state => state.cart,
    thunkAction: fetchGetCartAsync,
    deps: [],
  });

  const { amount, selectedCartItem, cartItemStatusUtil, cartItemEvent } = useCartList();

  const onClickOrderButton = async () => {
    const orderList = selectedCartItem.map(cartId => ({ cartItemId: cartId }));

    dispatch(postOrderListAsync(orderList) as any);

    navigate(ROUTE.OrderDetail);
  };

  if (isLoading) {
    return (
      <Loading type="page" fontSize="2rem">
        👻
      </Loading>
    );
  }

  if (cartList.length === 0) {
    return (
      <PageTemplate>
        <Styled.Container>
          <Styled.Title>장바구니</Styled.Title>
          <Styled.Wrapper>
            <ErrorContainer>장바구니가 비어있습니다.</ErrorContainer>
          </Styled.Wrapper>
        </Styled.Container>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>장바구니</Styled.Title>
        <Styled.Wrapper>
          <CartList cartList={cartList} {...cartItemEvent} {...cartItemStatusUtil} />
          <OrderForm amount={amount} onClickOrderButton={onClickOrderButton} />
        </Styled.Wrapper>
      </Styled.Container>
    </PageTemplate>
  );
}

export default ShoppingCart;
