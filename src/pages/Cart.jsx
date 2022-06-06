import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckBox, useCartItem } from 'hooks';

import { requestAddCartItem, requestDeleteCartItem } from 'api';
import Layout from 'components/Layout';
import PageHeader from 'components/@common/PageHeader';
import CartList from 'components/CartList';
import CartReceipt from 'components/CartReceipt';
import { snackbar } from 'actions/snackbar';
import { deleteCartItem, initCartList, modifyCartItemQuantity } from 'actions/cart';
import { hideSpinner, showSpinner } from 'actions/spinner';

import { 비동기_요청, 알림_메시지 } from 'constants/';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Cart = () => {
  const cartList = useCartItem();
  const dispatch = useDispatch();
  const { checkboxItems, setCheckboxItems, handleChecked, isChecked, clearCheckBoxItems } =
    useCheckBox(cartList);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const checkAllSelectButton = () => {
    if (cartList.length < 0) {
      return;
    }
    if (checkboxItems.length >= cartList.length) {
      setCheckboxItems([]);
      return;
    }
    setCheckboxItems(cartList.map((item) => Number(item.id)));
  };

  useEffect(() => {
    dispatch(showSpinner());
    fetch(`${process.env.REACT_APP_API_URL}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((cartdata) => {
        if (cartdata.length > 0 && cartdata) {
          console.log('cartdata', cartdata);
          const cartListInfo = cartdata.map((item) => {
            const { id, name, price, thumbnail } = item.product;
            const { quantity } = item;
            return {
              id,
              name,
              price,
              thumbnail,
              quantity,
            };
          });
          dispatch(initCartList(cartListInfo));
          setCheckboxItems(cartListInfo.map((item) => Number(item.id)));
        }
        dispatch(hideSpinner());
      })
      .catch(() => {
        alert('서버로 부터 장바구니 정보를 받아오는데 실패하였습니다!');
        navigator('/');
      });
  }, []);

  useEffect(() => {
    setTotalPrice(
      cartList && cartList.length > 0
        ? cartList.reduce((prev, cur) => {
            if (checkboxItems.includes(Number(cur.id))) {
              return prev + cur.price * cur.quantity;
            }
            return prev;
          }, 0)
        : 0,
    );
    setIsAllChecked(cartList && cartList.length === checkboxItems.length);
  }, [cartList, checkboxItems]);

  const deleteSelectedItem = async () => {
    if (checkboxItems.length <= 0) {
      return;
    }
    const response = await requestDeleteCartItem(checkboxItems);
    if (response.status === 비동기_요청.SUCCESS) {
      dispatch(deleteCartItem({ productIds: checkboxItems }));
      clearCheckBoxItems();
      dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_다중_삭제));
      return;
    }
    alert('상품제거에 실패하였습니다');
  };

  const handleItemCount = async (productId, count) => {
    const response = await requestAddCartItem(productId, count);
    if (response.status === 비동기_요청.SUCCESS) {
      dispatch(modifyCartItemQuantity(productId, count));
      return;
    }
    alert('상품 수량 조정에 실패하였습니다!');
  };

  return (
    <Layout>
      <Styled.CartListContainer>
        <PageHeader>장바구니</PageHeader>
        <CommonStyled.Container alignItems="flex-start" width="100%" margin="0">
          <CommonStyled.FlexWrapper margin="2rem" flexDirection="column" alignItems="flex-start">
            {cartList && cartList.length > 0 ? (
              <CartList
                cartList={cartList}
                isAllChecked={isAllChecked}
                checkboxItemCount={checkboxItems !== [] ? checkboxItems.length : 0}
                checkAllSelectButton={() => checkAllSelectButton}
                deleteSelectedItem={() => deleteSelectedItem}
                isChecked={isChecked}
                handleChecked={() => handleChecked}
                handleItemCount={() => handleItemCount}
              />
            ) : (
              <div>상품이 텅 비었습니다</div>
            )}
          </CommonStyled.FlexWrapper>
          <CartReceipt totalPrice={totalPrice} checkboxItemCount={checkboxItems.length} />
        </CommonStyled.Container>
      </Styled.CartListContainer>
    </Layout>
  );
};

export default Cart;
