import Checkbox from '@Components/Checkbox';
import SecondaryButton from '@Components/SecondaryButton';

import useCartItems from '@Hooks/useCartItems';

import * as S from './style';

function CartListController() {
  const {
    toggleAllSelected,
    deleteAllSelectedCartItem,
    isAllSelected,
    isAllUnSelected,
    selectedCartItemsAmount,
    cartItemsAmount,
  } = useCartItems();

  const deleteManyShoppingItem = () => {
    if (isAllUnSelected) return window.alert('선택된 상품이 없습니다.');

    if (!window.confirm('선택한 모든 상품을 장바구니에서 삭제하시겠습니까?')) return;

    deleteAllSelectedCartItem();
  };

  return (
    <S.Container>
      <Checkbox
        isChecked={isAllSelected}
        updateSelectedState={() => {
          toggleAllSelected();
        }}
        size="small"
      />
      <S.SelectedSituation>
        {isAllSelected ? '전체해제' : '전체선택'}({selectedCartItemsAmount}/{cartItemsAmount})
      </S.SelectedSituation>
      <SecondaryButton onClick={deleteManyShoppingItem} text="선택삭제" />
    </S.Container>
  );
}

export default CartListController;
