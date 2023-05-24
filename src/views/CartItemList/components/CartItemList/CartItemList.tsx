import { useCheckCart, useProductListInCart } from '@recoil/cart/cartState';
import * as S from './CartItemList.style';
import { CartItemBox } from '@views/CartItem/components/CartItemBox';
import { CheckBox } from '@common/CheckBox';

function CartItemList() {
  const productListInCart = useProductListInCart();

  const { isAllChecked, checkedCount, toggleAllCartItem, deleteCheckedItems } = useCheckCart();

  const productCount = productListInCart.length;

  if (productCount === 0) {
    return (
      <S.CartWrapper>
        <span style={{ textAlign: 'center', fontSize: '30px', margin: 'auto' }}>텅</span>
      </S.CartWrapper>
    );
  }

  return (
    <S.CartWrapper>
      {productListInCart.map(({ id, imageUrl, name, price }) => {
        return (
          <li key={id}>
            {/* id: CartItem */}
            <CartItemBox id={id} imageUrl={imageUrl} name={name} price={price} />
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
