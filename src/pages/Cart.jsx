import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCheckBox, useCartItem } from 'hooks';
import { useTotalPrice } from 'hooks/useTotalPrice';

import { 비동기_요청, 알림_메시지 } from 'constants/';

import { requestChangeItemQuantity, requestPurchaseCartItem } from 'api';
import Layout from 'components/Layout';
import PageHeader from 'components/@common/PageHeader';
import CartList from 'components/CartList';
import CartReceipt from 'components/CartReceipt';

import { handleRequestDeleteCartItem } from 'utils/deleteCartItem';
import { checkIsLogin } from 'utils/addCartItem';
import { snackbar } from 'actions/snackbar';
import { deleteCartItem, setCartList, modifyCartItemQuantity } from 'actions/cart';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Cart = () => {
  const cartList = useCartItem();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    checkboxItems,
    handleChecked,
    isChecked,
    isAllChecked,
    clearCheckBoxItems,
    checkAllSelectButton,
  } = useCheckBox(cartList);
  const { totalPrice } = useTotalPrice(cartList, checkboxItems);

  useEffect(() => {
    dispatch(setCartList());
    if (!checkIsLogin()) {
      navigate('/login');
      dispatch(snackbar.pushMessageSnackbar('로그인 후에 사용해주세요!'));
    }
  }, [dispatch]);

  const deleteSelectedItem = async () => {
    if (checkboxItems.length <= 0) {
      return;
    }
    const requestResult = await handleRequestDeleteCartItem(checkboxItems, dispatch);
    if (requestResult) {
      clearCheckBoxItems();
      dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_다중_삭제));
    }
  };

  const handleItemCount = async (productId, count) => {
    const response = await requestChangeItemQuantity(productId, count);
    if (response.status === 비동기_요청.SUCCESS) {
      dispatch(modifyCartItemQuantity(productId, count));
      return;
    }
    alert('상품 수량 조정에 실패하였습니다!');
  };

  const onPurchaseButtonClick = async () => {
    const response = await requestPurchaseCartItem({ productIds: checkboxItems });
    if (response.status === 비동기_요청.SUCCESS) {
      const checkItemList = cartList.filter((item) => checkboxItems.includes(item.id));
      const purchaseResult = checkItemList.reduce((prev, cur) => {
        return prev.concat(`상품: ${cur.name}, 수량: ${cur.quantity}     `);
      }, '');

      alert(purchaseResult);
      dispatch(deleteCartItem(checkboxItems));
    }
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
                checkboxItemCount={checkboxItems.length}
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
          <CartReceipt
            totalPrice={totalPrice}
            checkboxItemCount={checkboxItems.length}
            onPurchaseButtonClick={onPurchaseButtonClick}
          />
        </CommonStyled.Container>
      </Styled.CartListContainer>
    </Layout>
  );
};

export default Cart;
