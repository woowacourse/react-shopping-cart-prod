import { useCheckCart } from '@hooks/recoil/cart/useCheckCart';
import CartItemBox from '@components/cart/CartItemBox';
import CheckBox from '@components/common/CheckBox';
import { CartItemType } from '@type/cartType';
import * as S from './CartItemList.style';

interface CartItemListProps {
  cart: CartItemType[];
}

function CartItemList({ cart }: CartItemListProps) {
  const { isAllChecked, toggleAllCartItem, deleteCheckedItems, checkedCount } = useCheckCart();
  const productCount = cart.length;

  if (productCount === 0) {
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
          checked={isAllChecked()}
          onChange={() => toggleAllCartItem(!isAllChecked())}
        />
        <S.CheckAllSpan>{`전체 선택 (${checkedCount} / ${productCount})`}</S.CheckAllSpan>
        <S.DeleteCheckBox onClick={deleteCheckedItems}>선택삭제</S.DeleteCheckBox>
      </S.CartItemListContainer>
    </S.CartWrapper>
  );
}

export default CartItemList;
