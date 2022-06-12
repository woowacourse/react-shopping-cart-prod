import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { selectAllItems } from '@/redux/modules/cart/cartAction';
import { deleteBySelectedItemsAPI, loadCartAPI } from '@/redux/modules/cart/cartThunk';

import { useCartSelector } from '@/hooks/useCartSelector';

import { CartListTitle, SelectAllContainer } from './styles';

import { CartItem, CartState } from '@/types';

import { Button, CheckBox, Loader } from '@/components/@shared';
import { CartProduct } from '@/components';

import { INFO_MESSAGES } from '@/constants';

function CartProductList() {
  const { items, loading }: CartState = useCartSelector();
  const selectedItems = items.filter((item) => item.isSelected);
  const isAllSelected = selectedItems.length !== 0 && items.length === selectedItems.length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartAPI());
  }, [dispatch]);

  const onToggleAllSelect = () => {
    dispatch(selectAllItems(isAllSelected));
  };

  const onClickDeleteItems = () => {
    if (!selectedItems.length) return;

    const selectedItemsId = selectedItems.map((item) => item.id);

    confirm(INFO_MESSAGES.ASK_DELETE_SELECTED_PRODUCT) &&
      dispatch(deleteBySelectedItemsAPI(selectedItemsId));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <SelectAllContainer loading={loading}>
        <div>
          <CheckBox checked={isAllSelected} onChange={onToggleAllSelect} />
          <span>{isAllSelected ? '선택해제' : '전체선택'}</span>
        </div>
        <Button onClick={onClickDeleteItems}>상품삭제</Button>
      </SelectAllContainer>
      <CartListTitle loading={loading}>든든배송 상품</CartListTitle>
      {items.map((item: CartItem) => (
        <CartProduct key={item.id} {...{ item }} />
      ))}
    </div>
  );
}

export default CartProductList;
