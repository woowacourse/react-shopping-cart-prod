import * as styled from './CartActions.styled';

import { Checkbox } from '@components/styled/Checkbox';

import { useApiBaseUrlValue } from '@recoils/recoilApiBaseUrl';
import { useCartStateValue } from '@recoils/recoilCart';
import { useCheckedValue } from '@recoils/recoilChecked';

import { useUpdateRecoilCart } from '@hooks/useUpdateRecoilCart';
import { useMutation } from '@hooks/useMutation';
import { useUpdateCheckbox } from '@hooks/useUpdateCheckbox';

import { FETCH_METHOD, FETCH_URL } from '@constants/index';

export const CartActions = () => {
  const baseUrl = useApiBaseUrlValue();
  const { mutation: deleteCartMutation } = useMutation(FETCH_METHOD.DELETE);

  const cart = useCartStateValue();
  const checkedState = useCheckedValue();

  const { deleteRecoilCartItem } = useUpdateRecoilCart();
  const { toggleAllCheckbox } = useUpdateCheckbox();

  const onChangeAllCheckbox = () => {
    toggleAllCheckbox(cart);
  };

  const onClickDeleteCheckedItemButton = () => {
    const { all, ...selectedItems } = checkedState;
    const checkedItemsId = Object.keys(selectedItems).map(Number);

    checkedItemsId.forEach((cartItemId) => {
      deleteCartMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`);
    });

    deleteRecoilCartItem(...checkedItemsId);
  };

  return (
    <styled.SelectionActions>
      <styled.ToggleAllCheckBox>
        <Checkbox type="checkbox" checked={checkedState.all} onChange={onChangeAllCheckbox} />
        <span>
          전체선택 ({Object.keys(checkedState).length - 1}/{cart.length})
        </span>
      </styled.ToggleAllCheckBox>
      <styled.DeleteSelectedItemButton onClick={onClickDeleteCheckedItemButton}>
        선택삭제
      </styled.DeleteSelectedItemButton>
    </styled.SelectionActions>
  );
};
