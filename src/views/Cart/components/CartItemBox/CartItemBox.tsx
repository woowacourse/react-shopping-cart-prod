import { CheckBox } from '@common/CheckBox';

import * as S from './CartItemBox.style';
import { Stepper } from '@common/Stepper';
import deleteIcon from '@assets/delete.svg';
import { useCartItem } from '@views/Cart/recoil/cartState';
import { ProductItemType } from 'types/ProductType';
import { useCartItemCheckedBy } from '@views/Cart/recoil/withItemCheckBy';

interface CartItemProps {
  cartItemId: number;
  product: ProductItemType;
}

function CartItemBox({ cartItemId, product }: CartItemProps) {
  const { quantity, updateCartItemQuantity } = useCartItem(product.id);
  const { isChecked, toggleCheck } = useCartItemCheckedBy(cartItemId);

  const { name, id: productId, imageUrl, price } = product;

  return (
    <S.CartItemContainer>
      <CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          toggleCheck();
        }}
        size="medium"
      />
      <S.ItemImageWrapper>
        <S.ItemImage src={imageUrl} />
      </S.ItemImageWrapper>
      <S.NameText>{name}</S.NameText>

      <S.ProductInfo>
        <S.DeleteIcon
          src={deleteIcon}
          onClick={() => {
            if (cartItemId) {
              updateCartItemQuantity(cartItemId, quantity - 1);
            }
          }}
        />

        <Stepper
          quantity={quantity}
          onChange={(event) => {
            if (cartItemId) {
              updateCartItemQuantity(cartItemId, Number(event.target.value));
            }
          }}
          onIncrease={() => {
            console.log('increased');

            if (cartItemId) {
              updateCartItemQuantity(cartItemId, quantity + 1);
            }
          }}
          onDecrease={() => {
            if (quantity !== 1 && cartItemId) {
              updateCartItemQuantity(cartItemId, quantity - 1);
            }
          }}
        />
        <S.PriceText>{`${(price * quantity).toLocaleString('ko-KR')} 원`}</S.PriceText>
      </S.ProductInfo>
    </S.CartItemContainer>
  );
}

export default CartItemBox;
