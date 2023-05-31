import * as styled from './CartActions.styled';
import { Checkbox } from '../../../styled/Checkbox';

import { useUpdateRecoilCart } from '../../../../hooks/useUpdateRecoilCart';

import { useApiBaseUrlValue } from '../../../../recoils/recoilApiBaseUrl';
import { useMutation } from '../../../../hooks/useMutation';
import { FETCH_METHOD, FETCH_URL } from '../../../../constants';
import { useUpdateCheckbox } from '../../../../hooks/useUpdateCheckbox';
import { useCartStateValue } from '../../../../recoils/recoilCart';
import { useCheckedValue } from '../../../../recoils/recoilChecked';

export const CartActions = () => {
  const baseUrl = useApiBaseUrlValue();
  const { mutation: deleteCartMutation } = useMutation(FETCH_METHOD.DELETE);

  const { deleteRecoilCartItem } = useUpdateRecoilCart();

  const cart = useCartStateValue();

  const checkedState = useCheckedValue();
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
