import { useDispatch, useSelector } from 'react-redux';
import {
  CartItem,
  CartState,
  deleteBySelectedItems,
  selectAllItems,
  selectCartState,
} from 'redux/modules/cart';

import { Button, CheckBox } from 'components/@shared';
import CartProduct from 'components/CartProduct';

import { MESSAGES } from 'constants/index';
import { CartListTitle, SelectAllContainer } from './styles';

function CartProductList() {
  const dispatch = useDispatch();
  const { items: cartList }: CartState = useSelector(selectCartState);
  const isAllSelected = cartList.every((item) => item.isSelected) && cartList.length > 0;

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
      {cartList.map((item: CartItem) => (
        <CartProduct key={item.id} {...{ item }} />
      ))}
    </div>
  );
}

export default CartProductList;
