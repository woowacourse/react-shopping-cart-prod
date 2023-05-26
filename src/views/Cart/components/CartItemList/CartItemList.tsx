import { useCartList, useCheckCart } from '@views/Cart/recoil/cartState';
import * as S from './CartItemList.style';
import { CartItemBox } from '@views/Cart/components/CartItemBox';
import { CheckBox } from '@common/CheckBox';

function CartItemList() {
  const cartList = useCartList();

  const { isAllChecked, checkedCount, toggleAllCartItem, deleteCheckedItems } = useCheckCart();

  const productCount = cartList.length;

  if (productCount === 0) {
    return (
      <S.CartWrapper>
        <span style={{ textAlign: 'center', fontSize: '30px', margin: 'auto' }}>텅</span>
      </S.CartWrapper>
    );
  }

  return (
    <S.CartWrapper>
      {cartList.map(({ id, product }) => {
        return (
          <li key={id}>
            <CartItemBox
              cartId={id}
              productId={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
            />
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
        <S.CheckAllSpan>{`전체 선택 (${checkedCount} / ${productCount})`}</S.CheckAllSpan>
        <S.DeleteCheckBox onClick={deleteCheckedItems}>선택삭제</S.DeleteCheckBox>
      </S.CartItemListContainer>
    </S.CartWrapper>
  );
}

export default CartItemList;
