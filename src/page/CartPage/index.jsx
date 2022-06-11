// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import useCart from 'hooks/db/useCart';
import useOrder from 'hooks/db/useOrder';

import { Image, CartProductItem, CheckBox, TotalPrice } from 'components';

import {
  doAddProdcutToOrder,
  doInitializeOrder,
  doOrderFromCart,
  doSelectiveDeleteFromCart,
} from 'modules/cart';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import { getCookie } from 'utils/cookie';
import empty from 'assets/empty.jpeg';
import Styled from './index.style';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deleteCartAPI } = useCart();
  const { postOrderAPI } = useOrder();
  const [renderSnackbar] = useSnackbar();
  const isAuthenticated = getCookie('accessToken');

  const { shoppingCart, order } = useSelector(state => state.cartReducer);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    let total = 0;

    order.forEach(productId => {
      const { price, quantity } = shoppingCart.find(product => product.productId === productId);

      total += quantity * price;
    });

    return total;
  }, [order, shoppingCart]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

  useEffect(() => {
    if (!isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, SNACKBAR.FAILED);
      navigate(PATHNAME.TO_LOGIN);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxClick = () => {
    if (shoppingCart.length === order.length) {
      dispatch(doInitializeOrder());
      return;
    }

    shoppingCart.forEach(product => {
      if (!order.some(productId => productId === product.productId)) {
        dispatch(doAddProdcutToOrder({ id: product.productId }));
      }
    });
  };

  const deleteItem = async () => {
    dispatch(doSelectiveDeleteFromCart());
    await deleteCartAPI(order);
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, SNACKBAR.SUCCESS);
  };

  const postOrder = async () => {
    if (order.length <= 0) return;

    try {
      const response = await postOrderAPI(order);
      const location = response.headers.location.split('/');

      dispatch(doOrderFromCart());
      navigate(`${PATHNAME.TO_PAY}/${location[location.length - 1]}`);
    } catch (error) {}
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
                {shoppingCart.map(({ productId, name, price, image, quantity }) => (
                  <CartProductItem
                    key={productId}
                    id={productId}
                    name={name}
                    price={price}
                    image={image}
                    quantity={quantity}
                  />
                ))}
              </Styled.ProductList>
            </Styled.LeftSide>

            <Styled.RightSide>
              <TotalPrice
                title="결제예상금액"
                price={totalPrice}
                actionType={`주문하기(${order.length}개)`}
                action={postOrder}
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
