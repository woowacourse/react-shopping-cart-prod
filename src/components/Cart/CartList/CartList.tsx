import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  allCartCheckedSelector,
  cartCountSelector,
  cartState,
  checkedCartCountSelector,
  checkedCartSelector,
  switchAllCartCheckboxSelector,
} from '../../../recoil/cartAtoms';
import { CartItem } from '../CartItem';
import * as S from './CartList.style';
import { fetchCartList, fetchDeleteCart } from '../../../api/api';
import { serverState } from '../../../recoil/serverAtom';
import { Input, Label } from '../CartItem/CartItem.style';
import checkIcon from '../../../assets/check.svg';

function CartList() {
  const [cartList, setCartList] = useRecoilState(cartState);
  const checkedCartList = useRecoilValue(checkedCartSelector);
  const checkedCartListCount = useRecoilValue(checkedCartCountSelector);
  const cartCount = useRecoilValue(cartCountSelector);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);
  const server = useRecoilValue(serverState);
  const switchAllCheckboxes = useSetRecoilState(switchAllCartCheckboxSelector);

  const removeCheckedCartItems = async () => {
    if (confirm('정말로 삭제 하시겠습니까?')) {
      const targetIds = checkedCartList.map((cartList) => cartList.id);
      await Promise.all(targetIds.map((cartId) => fetchDeleteCart(server, cartId)));
      const newCartList = await fetchCartList(server);
      setCartList(newCartList);
    }
  };

  return (
    <S.Wrapper>
      <S.CartListTitle>든든배송 상품 ({cartCount}개)</S.CartListTitle>
      <S.CartListWrapper>
        {cartList.map((cart) => (
          <CartItem key={cart.id} cart={cart} />
        ))}
      </S.CartListWrapper>
      <S.CartListController>
        <Label>
          <Input
            type='checkbox'
            icon={checkIcon}
            checked={isAllCartItemChecked}
            onChange={() => switchAllCheckboxes(undefined)}
          />
        </Label>
        <S.CartListCheckCounter onClick={() => switchAllCheckboxes(undefined)}>
          전체선택 ({checkedCartListCount}/{cartCount})
        </S.CartListCheckCounter>
        <S.CartsDeleteButton onClick={() => removeCheckedCartItems()}>선택삭제</S.CartsDeleteButton>
      </S.CartListController>
    </S.Wrapper>
  );
}

export default CartList;
