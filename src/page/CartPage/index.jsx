// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Image, CartProductItem, CheckBox, TotalPrice } from 'components';

import store from 'store/store';
import {
  doAddProductToOrder,
  doDecideOrder,
  doInitializeCartList,
  doInitializeOrder,
  doSelectiveDeleteFromCart,
} from 'actions/actionCreator';
import empty from 'assets/empty.jpeg';
import Styled from 'page/CartPage/index.style';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import { productApiClient } from 'apis/apiClient';

const CartPage = () => {
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useSelector(state => state.authReducer);

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

  // TODO [API] 장바구니 목록 가져오기(GET)
  // const getCarts = async () => {
  //   const response = await productApiClient.get('/carts');
  //   store.dispatch(doInitializeCartList({ shoppingCart: response.data }));
  // };

  // useEffect(() => {
  //   getCarts();
  // }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate('/login');
    }
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

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

  // TODO . 장바구니 내 선택된 상품들 삭제(DELETE)
  // const deleteSelectedItems = async () => {
  //   const accessToken = getCookie('accessToken');
  //   const cartIdList = shoppingCart.map(product => product.id);
  //   const targetIdList = cartIdList.filter(id => !order.includes(id));

  //   try {
  //     await productApiClient.delete(
  //       `/carts`,
  //       targetIdList, // targetIdList : [2, 4] 삭제할 상품 id 목록
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );

  //     store.dispatch(doSelectiveDeleteFromCart());
  //     renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  //   } catch (error) {
  //     renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
  //     navigate('/login');
  //   }
  // };

  const deleteItem = () => {
    store.dispatch(doSelectiveDeleteFromCart());
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  };

  const handleOrder = () => {
    const orderList = shoppingCart.filter(product => order.includes(product.id));
    store.dispatch(doDecideOrder({ orderList }));
    navigate('/order');
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
                actionType={`주문하기(${order.length}개)`}
                action={handleOrder}
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
