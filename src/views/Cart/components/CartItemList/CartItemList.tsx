import * as S from './CartItemList.style';
import { CartItemBox } from '@views/Cart/components/CartItemBox';
import { CheckBox } from '@common/CheckBox';
import { useCartReadOnly, useCheckCart } from '@views/Cart/recoil/cartState';

function CartItemList() {
  const cart = useCartReadOnly();

  const { isAllChecked, checkedCount, toggleAllCartItem, deleteCheckedItems } = useCheckCart();

  const cartLength = cart.length;

  if (cartLength === 0) {
    return (
      <S.CartWrapper>
        <span style={{ textAlign: 'center', fontSize: '30px', margin: 'auto' }}>텅</span>
      </S.CartWrapper>
    );
  }

  return (
    <S.CartWrapper>
      {cart.map(({ id, product }) => {
        return (
          <li key={id + product.toString()}>
            <CartItemBox cartItemId={id} product={product} />
          </li>
        );
      })}
      <S.CartItemListContainer>
        <CheckBox
          type="checkbox"
          checked={isAllChecked}
          onChange={() => {
            toggleAllCartItem();
          }}
        />
        <S.CheckAllSpan>{`전체 선택 (${checkedCount} / ${cartLength})`}</S.CheckAllSpan>
        <S.DeleteCheckBox onClick={deleteCheckedItems}>선택삭제</S.DeleteCheckBox>
      </S.CartItemListContainer>
    </S.CartWrapper>
  );
}

export default CartItemList;
