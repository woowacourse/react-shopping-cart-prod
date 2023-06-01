import { CheckBox } from '@common/CheckBox';

import * as S from './CartItemBox.style';
import { Stepper } from '@common/Stepper';

import { useCart } from '@views/Cart/recoil/cartState';
import { ProductItemType } from 'types/ProductType';
import { FaTrashAlt } from 'react-icons/fa';

interface CartItemProps {
  cartItemId: number;
  product: ProductItemType;
}

function CartItemBox({ cartItemId, product }: CartItemProps) {
  const {
    setCartItemIsChecked,
    getCartItemIsChecked,
    getCartItemQuantity,
    updateCartItemQuantity,
  } = useCart();

  const quantity = getCartItemQuantity(product.id);
  const isChecked = getCartItemIsChecked(cartItemId);

  const { name, imageUrl, price } = product;

  return (
    <S.CartItemContainer>
      <CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setCartItemIsChecked(cartItemId);
        }}
        size="medium"
      />
      <S.ItemImageWrapper>
        <S.ItemImage src={imageUrl} />
      </S.ItemImageWrapper>
      <S.NameText>{name}</S.NameText>

      <S.ProductInfo>
        <S.DeleteButton>
          <FaTrashAlt size="1.8rem" />
        </S.DeleteButton>

        <Stepper
          quantity={quantity}
          onChange={(event) => {
            if (cartItemId) {
              updateCartItemQuantity(cartItemId, Number(event.target.value));
            }
          }}
          onIncrease={() => {
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
