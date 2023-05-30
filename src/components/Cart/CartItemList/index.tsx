import * as S from './CartItemList.styles';
import CartItem from 'components/Cart/CartItem';
import Modal from 'components/@common/Modal';
import { useCheckedItemIds } from '../hooks/useCheckedItems';
import { useModal } from 'hooks/useModal';
import { useCart } from '../hooks/useCart';

const CartItemList = () => {
  const { cartList, deleteItem } = useCart();
  const { checkedItemIds, unCheckAllItems, checkAllItems, unCheckItem } =
    useCheckedItemIds();
  const { isModalOpen, openModal, closeModal } = useModal();

  const fetchedCartList =
    cartList.length === 0 ? (
      <S.EmptyList>장바구니가 비어있습니다.</S.EmptyList>
    ) : (
      cartList.map(
        (cartItem) =>
          cartItem && <CartItem cartItem={cartItem} key={cartItem.id} />
      )
    );

  const onToggleCheckAllItems = () => {
    if (checkedItemIds.length === cartList.length) {
      unCheckAllItems();
      return;
    }

    checkAllItems();
  };

  const onDeleteSelectedItems = () => {
    checkedItemIds.forEach((id) => {
      deleteItem(id);
      unCheckItem(id);
    });

    closeModal();
  };

  return (
    <S.ItemWrapper>
      <S.CartItemTitle>
        든든배송 상품({checkedItemIds.length}개)
      </S.CartItemTitle>
      {fetchedCartList}
      <S.CheckBoxWrapper>
        <S.SelectAllCheckBox
          type="checkbox"
          onChange={onToggleCheckAllItems}
          checked={
            checkedItemIds.length === cartList.length && cartList.length !== 0
          }
        />
        <S.Text>
          전체 선택 ({checkedItemIds.length}/{cartList.length})개
        </S.Text>
        <S.SelectDeleteButton onClick={openModal}>
          선택 삭제
        </S.SelectDeleteButton>
      </S.CheckBoxWrapper>
      <Modal
        message="선택한 상품들을 삭제하시겠습니까?"
        isOpen={isModalOpen}
        onCloseModal={closeModal}
        onClickYes={onDeleteSelectedItems}
      />
    </S.ItemWrapper>
  );
};

export default CartItemList;
