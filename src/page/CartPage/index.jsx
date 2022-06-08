// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';

import { Image, CartProductItem, CheckBox, TotalPrice } from 'components';
import empty from 'assets/empty.jpeg';
import Styled from 'page/CartPage/index.style';

import {
  doAddProductToOrder,
  doDecideOrder,
  doInitializeCartList,
  doInitializeOrder,
  doSelectiveDeleteFromCart,
} from 'reducers/cart.reducer';
import { MESSAGE } from 'utils/constants';
import apiClient from 'apis/apiClient';

const CartPage = () => {
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useSelector(state => state.authReducer);

  const { shoppingCart, order } = useSelector(state => state.cartReducer);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    let total = 0;

    order.forEach(id => {
      const product = shoppingCart.find(product => product.productId === id);
      if (product) {
        const { price, quantity } = product;
        total += price * quantity;
      }
    });
    return total;
  }, [shoppingCart, order]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate('/login');
    }
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

  // TODO 3. get 장바구니 목록 가져오기
  const getCart = useCallback(async () => {
    const response = await apiClient.get('/cart');
    console.log('장바구니', response.data);
    dispatch(doInitializeCartList({ shoppingCart: response.data }));
  }, [dispatch]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleCheckboxClick = () => {
    if (shoppingCart.length === order.length) {
      dispatch(doInitializeOrder());
      return;
    }

    shoppingCart.forEach(product => {
      if (!order.some(id => id === product.productId)) {
        dispatch(doAddProductToOrder({ id: product.productId }));
      }
    });
  };

  // TODO 5. delete 장바구니 내 선택된 상품 삭제
  const deleteSelectedItems = async () => {
    const productIdsInCart = shoppingCart.map(product => product.productId);
    const productIds = productIdsInCart.filter(id => !order.includes(id));

    try {
      await apiClient.delete('/cart', { data: { productIds } });

      dispatch(doSelectiveDeleteFromCart());
      renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message, 'FAILED');
    }
  };

  // TODO 6. POST 주문 추가하기
  const orderSelectedCart = async () => {
    try {
      const response = await apiClient.post('/orders', { productIds: order });
      dispatch(doDecideOrder({ orderList: response.data }));
      console.log(response.data);
      navigate('/order');
      renderSnackbar(MESSAGE.ORDER_PASS_SUCCESS, 'SUCCESS');
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message, 'FAILED');
    }
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
                <Styled.ProductDeleteButton onClick={deleteSelectedItems}>
                  상품삭제
                </Styled.ProductDeleteButton>
              </Styled.SelectController>

              <Styled.ProductListTitle>
                든든배송 상품 ({shoppingCart.length}개)
              </Styled.ProductListTitle>
              <Styled.ProductList>
                {shoppingCart.map(({ productId, name, price, image, quantity }) => {
                  return (
                    <CartProductItem
                      key={productId}
                      productId={productId}
                      name={name}
                      price={price}
                      image={image}
                      quantity={quantity}
                    />
                  );
                })}
              </Styled.ProductList>
            </Styled.LeftSide>

            <Styled.RightSide>
              <TotalPrice
                title="결제예상금액"
                price={totalPrice}
                actionType={`주문하기(${order.length}개)`}
                action={orderSelectedCart}
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
