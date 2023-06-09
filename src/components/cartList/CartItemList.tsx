import { useRecoilState, useRecoilValue } from 'recoil';
import * as S from './styles/CartItemList.styles';
import CartItem from './CartItem';
import CheckBox from '../common/CheckBox';
import { cartState, checkedListState } from '../../atom/cart';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { useGetCartList } from '../hooks/useGetCartList';
import { useDeleteCartItems } from '../hooks/useDeleteCartItems';

export default function CartItemList() {
  const serverName = useRecoilValue(serverNameState);
  const cart = useRecoilValue(cartState);
  const [checkedList, setCheckedList] = useRecoilState(checkedListState);
  const loginCredential = useRecoilValue(loginState);
  const { getCartsThroughApi } = useGetCartList();
  const { deleteCartItemsThroughApi } = useDeleteCartItems();

  const checkedCount = checkedList.filter((checked) => checked).length;
  const allChecked = checkedCount === cart.length;

  const checkAll = () => {
    setCheckedList(checkedList.map(() => true));
  };

  const uncheckAll = () => {
    setCheckedList(checkedList.map(() => false));
  };

  const toggleCheckedList = (index: number) => () => {
    setCheckedList(checkedList.toSpliced(index, 1, !checkedList[index]));
  };

  const deleteCheckedList = (index: number) => () => {
    setCheckedList(checkedList.toSpliced(index, 1));
  };

  const removeCheckedCartItem = async () => {
    const cartItemIdList = cart
      .filter((_, index) => checkedList[index])
      .map((cartItem) => cartItem.id);

    await deleteCartItemsThroughApi(serverName, loginCredential, cartItemIdList);

    getCartsThroughApi(serverName, loginCredential, true);
  };

  return (
    <S.Wrapper>
      <S.CountMessage>배송 상품 ({cart.length}개)</S.CountMessage>
      <S.List>
        {cart.map((cartItem, index) => (
          <S.ListItemBox key={cartItem.id}>
            <CartItem
              {...cartItem}
              checked={checkedList[index]}
              toggleChecked={toggleCheckedList(index)}
              deleteChecked={deleteCheckedList(index)}
            />
          </S.ListItemBox>
        ))}
      </S.List>
      <S.RemoveBox>
        <CheckBox checked={allChecked} onClickCheckbox={allChecked ? uncheckAll : checkAll} />
        <S.RemoveLabel>
          전체선택 ({checkedCount}/{cart.length})
        </S.RemoveLabel>
        <S.RemoveButton onClick={removeCheckedCartItem}>선택삭제</S.RemoveButton>
      </S.RemoveBox>
    </S.Wrapper>
  );
}
