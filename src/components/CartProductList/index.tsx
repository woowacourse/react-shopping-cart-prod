import { useDispatch } from 'react-redux';
import { CartItem, deleteBySelectedItems, selectAllItems } from 'redux/modules/cart';

import { useCartListSelector } from 'hooks/useCartSelector';
import { Button, CheckBox } from 'components/@shared';
import CartProduct from 'components/CartProduct';

import { MESSAGES } from 'constants/index';
import { CartListTitle, SelectAllContainer } from './styles';

function CartProductList() {
  const dispatch = useDispatch();
  const cartItemList = useCartListSelector();
  const isAllSelected = cartItemList.every((item) => item.isSelected) && cartItemList.length > 0;

  const onToggleAllSelect = () => {
    dispatch(selectAllItems(isAllSelected));
  };

  const onClickDeleteItems = () => {
    confirm(MESSAGES.ASK_DELETE_SELECTED_PRODUCT) && dispatch(deleteBySelectedItems());
  };

  return (
    <div>
      <SelectAllContainer>
        <div>
          <CheckBox checked={isAllSelected} onChange={onToggleAllSelect} />
          <span>{isAllSelected ? '선택해제' : '전체선택'}</span>
        </div>
        <Button onClick={onClickDeleteItems}>상품삭제</Button>
      </SelectAllContainer>
      <CartListTitle>든든배송 상품</CartListTitle>
      {cartItemList.map((item: CartItem) => (
        <CartProduct key={item.id} {...{ item }} />
      ))}
    </div>
  );
}

export default CartProductList;
