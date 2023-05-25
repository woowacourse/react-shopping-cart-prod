import * as Styled from './CartSelectList.styles.tsx';
import CartItem from './CartItem/CartItem.tsx';
import useGetCartList from '../../../hooks/requests/useGetCartList.ts';
import { useRecoilValue } from 'recoil';
import { cartSelectedItemsSelector } from '../../../stores/cartListStore.ts';
import useCart from '../../../hooks/useCart.ts';

const CartSelectList = () => {
  const { data: cartList, refetchCartList } = useGetCartList();
  const [selectedItemsCount, allItemsCount] = useRecoilValue(cartSelectedItemsSelector);
  const { selectAllItems } = useCart();

  return (
    <Styled.CartSelectListWrapper>
      <Styled.CartQuantityText>배송 상품 ({cartList?.length || 0})개</Styled.CartQuantityText>
      <Styled.CartQuantityDivider />
      <div>
        <div>
          {cartList &&
            cartList.map((cart) => {
              return <CartItem key={cart.id} cart={cart} refetchCartList={refetchCartList} />;
            })}
          <Styled.SelectAllButton onClick={selectAllItems}>전체선택</Styled.SelectAllButton>
          <span>
            ({selectedItemsCount}/{allItemsCount})
          </span>
        </div>
      </div>
    </Styled.CartSelectListWrapper>
  );
};
export default CartSelectList;
