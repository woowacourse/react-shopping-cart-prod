import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckBox, useCartItem } from 'hooks';

import Layout from 'components/Layout';
import PageHeader from 'components/@common/PageHeader';
import CartList from 'components/CartList';
import CartReceipt from 'components/CartReceipt';

import { deleteCartItem, getCartList, modifyCartItemQuantity } from 'actions/cart';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Cart = () => {
  const cartList = useCartItem();
  const dispatch = useDispatch();
  const {
    checkboxItems,
    isAllChecked,
    handleChecked,
    isChecked,
    checkAllSelectButton,
    clearCheckBoxItems,
  } = useCheckBox(cartList);

  useEffect(() => {
    dispatch(getCartList());
  }, [dispatch]);

  const deleteSelectedItem = () => {
    if (checkboxItems.length <= 0) {
      return;
    }

    dispatch(deleteCartItem(checkboxItems));
    clearCheckBoxItems();
  };

  const handleItemQuantity = (productId, quantity) => {
    dispatch(modifyCartItemQuantity(productId, quantity));
  };

  return (
    <Layout>
      <Styled.CartListContainer>
        <PageHeader>장바구니</PageHeader>
        <CommonStyled.Container alignItems="flex-start" width="100%" margin="0">
          <CommonStyled.FlexWrapper margin="2rem" flexDirection="column" alignItems="flex-start">
            <CartList
              cartList={cartList}
              isAllChecked={isAllChecked}
              checkboxItemCount={checkboxItems.length}
              checkAllSelectButton={() => checkAllSelectButton}
              deleteSelectedItem={() => deleteSelectedItem}
              isChecked={isChecked}
              handleChecked={() => handleChecked}
              handleItemQuantity={() => handleItemQuantity}
            />
          </CommonStyled.FlexWrapper>
          <CartReceipt
            cartList={cartList}
            checkboxItems={checkboxItems}
            clearCheckBoxItems={clearCheckBoxItems}
          />
        </CommonStyled.Container>
      </Styled.CartListContainer>
    </Layout>
  );
};

export default Cart;
