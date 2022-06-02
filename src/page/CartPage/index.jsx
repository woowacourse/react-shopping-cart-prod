// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Image, CartProductItem, CheckBox, TotalPrice } from 'components';

import store from 'store/store';
import {
  doAddProductToOrder,
  doInitializeOrder,
  doSelectiveDeleteFromCart,
} from 'actions/actionCreator';
import empty from 'assets/empty.jpeg';
import Styled from 'page/CartPage/index.style';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import { getCookie } from 'utils/cookie';

const CartPage = () => {
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();
  const isAuthenticated = getCookie('accessToken');

  const { products, shoppingCart, order } = useSelector(state => state.reducer);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    let total = 0;

    order.forEach(productId => {
      const { price } = products.find(product => product.id === productId);
      const { quantity } = shoppingCart.find(product => product.id === productId);

      total += quantity * price;
    });

    return total;
  }, [products, shoppingCart, order]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

  useEffect(() => {
    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxClick = () => {
    if (shoppingCart.length === order.length) {
      store.dispatch(doInitializeOrder());
      return;
    }

    shoppingCart.forEach(product => {
      if (!order.some(productId => productId === product.id)) {
        store.dispatch(doAddProductToOrder({ id: product.id }));
      }
    });
  };

  const deleteItem = () => {
    store.dispatch(doSelectiveDeleteFromCart());
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  };

  return (
    <Styled.Container>
      {shoppingCart.length > 0 ? (
        <>
          <Styled.Title>장바구니</Styled.Title>
          <Styled.Division />

          <Styled.OrderSheet>
            <Styled.LeftSide>
              <Styled.SelectController>
                <Styled.CheckBoxContainer>
                  <CheckBox
                    checked={shoppingCart.length === order.length}
                    handleChange={handleCheckboxClick}
                  />
                  선택해제
                </Styled.CheckBoxContainer>
                <Styled.ProductDeleteButton onClick={deleteItem}>
                  상품삭제
                </Styled.ProductDeleteButton>
              </Styled.SelectController>

              <Styled.ProductListTitle>
                든든배송 상품 ({shoppingCart.length}개)
              </Styled.ProductListTitle>
              <Styled.ProductList>
                {shoppingCart.map(({ id, quantity }) => (
                  <CartProductItem key={id} id={id} quantity={quantity} />
                ))}
              </Styled.ProductList>
            </Styled.LeftSide>

            <Styled.RightSide>
              <TotalPrice
                title="결제예상금액"
                price={totalPrice}
                action={`주문하기(${order.length}개)`}
              />
            </Styled.RightSide>
          </Styled.OrderSheet>
        </>
      ) : (
        <Styled.Empty>
          <Image src={empty} alt="empty" size="500px" />
          장바구니가 비어있어요.
        </Styled.Empty>
      )}
    </Styled.Container>
  );
};

export default CartPage;
