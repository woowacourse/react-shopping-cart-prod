import { ChangeEvent } from 'react';
import * as styled from './CartActions.styled';

import { Checkbox } from '@components/styled/Checkbox';

import {
  useCartRepository,
  useCartItems,
  useCheckedCartItems,
  useIsAllCartChecked,
} from '@recoils/cartAtoms';

export const CartActions = () => {
  const cartItems = useCartItems();
  const isAllChecked = useIsAllCartChecked();
  const checkedCartItems = useCheckedCartItems();

  const { deleteCartItem, toggleAllCheckboxBy } = useCartRepository();

  const onChangeAllCheckbox = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    toggleAllCheckboxBy(checked);
  };

  const onClickDeleteCheckedItemsButton = () => {
    checkedCartItems.forEach((item) => {
      deleteCartItem(item.id);
    });
  };

  return (
    <styled.SelectionActions>
      <styled.ToggleAllCheckBox>
        <Checkbox type="checkbox" checked={isAllChecked} onChange={onChangeAllCheckbox} />
        <span>
          전체선택 ({checkedCartItems.length}/{cartItems.length})
        </span>
      </styled.ToggleAllCheckBox>
      <styled.DeleteSelectedItemsButton onClick={onClickDeleteCheckedItemsButton}>
        선택삭제
      </styled.DeleteSelectedItemsButton>
    </styled.SelectionActions>
  );
};
