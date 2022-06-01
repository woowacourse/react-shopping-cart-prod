import CartList from 'components/Cart/CartList';
import LayoutWithTitle from 'components/common/LayoutWithTitle';
import Loading from 'components/common/Loading';
import PaymentBox from 'components/common/PaymentBox';
import RequestFail from 'components/common/RequestFail';
import { useAppSelector } from 'hooks/useAppSelector';
import useThunkFetch from 'hooks/useThunkFetch';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartListRequest } from 'redux/cartList/thunk';
import { getItemList } from 'redux/itemList/thunk';
import { PATH } from 'Routers';
import styled from 'styled-components';

const Cart = () => {
  const {
    data: itemList,
    error: error_getItemList,
    loading: loading_itemList,
  } = useThunkFetch(state => state.itemList, getItemList());
  const {
    data: cartList,
    error: error_getCartList,
    loading: loading_cartList,
  } = useThunkFetch(state => state.cartList, getCartListRequest());
  const isLogin = useAppSelector(state => !!state.user.data);
  const navigate = useNavigate();

  const itemListInCart = cartList.map(cartItem => {
    const itemInfo = itemList.find(item => item.id === cartItem.id);

    return {
      ...cartItem,
      ...itemInfo,
    };
  });

  const selectedItem = itemListInCart.filter(item => item.isSelected);
  const totalPrice = selectedItem.reduce((acc, item) => item.price * item.quantity + acc, 0);

  useEffect(() => {
    if (!isLogin) {
      alert('잘못된 접근입니다.');
      navigate(PATH.home);
    }
  }, [isLogin]);

  if (loading_itemList || loading_cartList === 'getCartList') return <Loading />;
  if (error_getItemList || error_getCartList) return <RequestFail />;

  return (
    <LayoutWithTitle title='장바구니'>
      <StyledMain>
        <CartList itemList={itemListInCart} />
        <PaymentBox
          title='결제예샹금액'
          priceDescription='결제예샹금액'
          price={totalPrice}
          buttonText={`주문하기 (${selectedItem.length}개)`}
          style={{ position: 'sticky', top: '50%' }}
        />
      </StyledMain>
    </LayoutWithTitle>
  );
};

export default Cart;

const StyledMain = styled.main`
  display: flex;
  gap: 15.7rem;
  height: 100%;
`;
