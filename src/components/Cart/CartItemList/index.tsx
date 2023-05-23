import { useEffect } from 'react';
import * as S from './CartItemList.styles';
import { useRecoilState } from 'recoil';
import { cartListAtom } from 'recoil/cartList';
import CartItem from 'components/Cart/CartItem';
import Spinner from 'components/@common/Spinner';
import Modal from 'components/@common/Modal';
import { useGet } from 'hooks/useGet';
import { useCheckedItemIds } from '../hooks/useCheckedItems';
import { useModal } from 'hooks/useModal';
import { Cart } from 'types';
import { deleteCartItem, getCartList } from 'api/requests';

const CartItemList = () => {
  const { isLoading } = useGet<{ cartList: Cart[] }>(getCartList);
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const { checkedItemIds, emptyCheckedItemIds, checkAllItems, unCheckItem } =
    useCheckedItemIds();
  const { isModalOpen, onOpenModal, onCloseModal } = useModal();

  useEffect(() => {
    checkAllItems();
  }, []);

  const loading = (
    <S.Loading>
      <Spinner />
      <S.LoadingText>장바구니를 불러오는 중입니다...</S.LoadingText>
    </S.Loading>
  );

  const fetchedCartList =
    cartList.length === 0 ? (
      <S.EmptyList>장바구니가 비어있습니다.</S.EmptyList>
    ) : (
      cartList.map(
        (cartItem) =>
          cartItem && <CartItem cartItem={cartItem} key={cartItem.id} />
      )
    );

  const onChangeAllCheckBoxes = () => {
    if (checkedItemIds.length === cartList.length) {
      emptyCheckedItemIds();
      return;
    }

    checkAllItems();
  };

  const onDeleteSelectedItems = () => {
    checkedItemIds.forEach((id) => {
      deleteCartItem(id);
      unCheckItem(id);
    });

    setCartList((prev) =>
      prev.filter((item) => !checkedItemIds.includes(item.id))
    );

    onCloseModal();
  };

  return (
    <S.ItemWrapper>
      <S.CartItemTitle>
        든든배송 상품({checkedItemIds.length}개)
      </S.CartItemTitle>
      {isLoading ? loading : fetchedCartList}
      <S.CheckBoxWrapper>
        <S.SelectAllCheckBox
          type="checkbox"
          onChange={onChangeAllCheckBoxes}
          checked={checkedItemIds.length === cartList.length}
        />
        <S.Text>
          전체 선택 ({checkedItemIds.length}/{cartList.length})개
        </S.Text>
        <S.SelectDeleteButton onClick={onOpenModal}>
          선택 삭제
        </S.SelectDeleteButton>
      </S.CheckBoxWrapper>
      <Modal
        isOpen={isModalOpen}
        onCloseModal={onCloseModal}
        onDeleteSelectedItems={onDeleteSelectedItems}
      />
    </S.ItemWrapper>
  );
};

export default CartItemList;
