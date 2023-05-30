import * as styled from './CartActions.styled';
import { Checkbox } from '../../styled/Checkbox';

import { useCartStateValue } from '../../../recoils/recoilCart';
import { useCheckedState } from '../../../recoils/recoilChecked';
import { useUpdateRecoilCart } from '../../../hooks/useUpdateRecoilCart';

import { CheckedStateType } from '../../../types';
import { useApiBaseUrlValue } from '../../../recoils/recoilApiBaseUrl';
import { useMutation } from '../../../hooks/useMutation';
import { FETCH_METHOD, FETCH_URL } from '../../../constants';

export const CartActions = () => {
  const baseUrl = useApiBaseUrlValue();
  const { mutation: deleteCartMutation } = useMutation(FETCH_METHOD.DELETE);

  const { deleteRecoilCartItem } = useUpdateRecoilCart();

  const cart = useCartStateValue();
  const [checkedState, setCheckedState] = useCheckedState();

  const onChangeAllCheckbox = () => {
    setCheckedState((prev) => {
      const updatedCheckedState: CheckedStateType = {
        all: !prev.all,
      };

      if (!prev.all) {
        for (const item of cart) {
          updatedCheckedState[item.id] = true;
        }
      }

      return updatedCheckedState;
    });
  };

  const onClickDeleteSelectedItemButton = () => {
    const { all, ...selectedItems } = checkedState;
    const targetItemsId = Object.keys(selectedItems).map(Number);

    targetItemsId.forEach((cartItemId) => {
      deleteCartMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`);
    });

    deleteRecoilCartItem(...targetItemsId);

    setCheckedState({ all: false });
  };

  return (
    <styled.SelectionActions>
      <styled.ToggleAllCheckBox>
        <Checkbox type="checkbox" checked={checkedState.all} onChange={onChangeAllCheckbox} />
        <span>
          전체선택 ({Object.keys(checkedState).length - 1}/{cart.length})
        </span>
      </styled.ToggleAllCheckBox>
      <styled.DeleteSelectedItemButton onClick={onClickDeleteSelectedItemButton}>
        선택삭제
      </styled.DeleteSelectedItemButton>
    </styled.SelectionActions>
  );
};
