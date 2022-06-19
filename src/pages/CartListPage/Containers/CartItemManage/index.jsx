import PropTypes from 'prop-types';

import useCart from 'hooks/useCart';
import useDispatchEvent from 'hooks/useDispatchEvent';

import { Button, Checkbox, ToolTip } from 'components/@common';

import { ICON_CODE } from 'constants/';

import * as S from './styles';

function CartItemManage({ isAllChecked }) {
  const { dispatch, dispatchEvent } = useDispatchEvent();
  const { cartActions, cartThunk, computed } = useCart();

  const handleAllCheckItem = () => {
    dispatch(cartActions.setAllItemCheck(!isAllChecked));
  };

  const handleRemoveItemList = async () => {
    if (!confirm('정말 선택한 상품을 모두 제거하시겠습니까?')) {
      return;
    }

    const checkedIdList = computed.checkedItemList.map(({ id }) => id);

    dispatchEvent({
      action: cartThunk.removeItems(checkedIdList),
      onStateUpdated: ({ cart }) => {
        cart.curdAsyncState.error && alert(cart.curdAsyncState.error);
      },
    });
  };

  return (
    <S.ItemManageContainer>
      <Checkbox size="medium" checked={isAllChecked} onChange={handleAllCheckItem}>
        {isAllChecked ? '선택 해제' : '전체 선택'}
      </Checkbox>

      <ToolTip text="선택한 상품을 장바구니에서 삭제합니다." align="bottom">
        <Button icon={ICON_CODE.TRASH} onClick={handleRemoveItemList}>
          선택 삭제
        </Button>
      </ToolTip>
    </S.ItemManageContainer>
  );
}

CartItemManage.defaultProps = {
  isAllChecked: PropTypes.bool,
};

CartItemManage.propTypes = {
  isAllChecked: PropTypes.bool,
};

export default CartItemManage;
