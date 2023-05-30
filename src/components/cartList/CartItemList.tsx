import { useRecoilState, useRecoilValue } from 'recoil';
import * as S from './styles/CartItemList.styles';
import CartItem from './CartItem';
import CheckBox from '../common/CheckBox';
import * as api from '../../api';
import useToast from '../hooks/useToast';
import { cartState, checkedListState, serverNameState } from '../../atom/state';
import { API_ERROR_MESSAGE } from '../../constants';

export default function CartItemList() {
  const serverName = useRecoilValue(serverNameState);
  const [cart, setCart] = useRecoilState(cartState);
  const [checkedList, setCheckedList] = useRecoilState(checkedListState);
  const { showToast } = useToast();

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

    try {
      await api.deleteCartItems(serverName, cartItemIdList);
    } catch {
      showToast('error', API_ERROR_MESSAGE.deleteCartItem);
    }

    try {
      const cart = await api.getCart(serverName);
      setCart(cart);
      setCheckedList(Array(cart.length).fill(false));
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
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
          전체선택 ({checkedCount}/{checkedList.length})
        </S.RemoveLabel>
        <S.RemoveButton onClick={removeCheckedCartItem}>선택삭제</S.RemoveButton>
      </S.RemoveBox>
    </S.Wrapper>
  );
}
