import * as S from './CartStepper.style';

import { ProductItemType } from 'types/ProductType';
import { Stepper } from '@common/Stepper';
import cartIcon from '@assets/cart.svg';

import { useCart } from '@views/Cart/recoil/cartState';

interface CartQuantityFieldProps {
  product: ProductItemType;
}

function CartStepper({ product }: CartQuantityFieldProps) {
  const { getCartItemId, getCartItemQuantity, updateCartItemQuantity, addCartItem } = useCart();
  const quantity = getCartItemQuantity(product.id);
  const cartItemId = getCartItemId(product.id);
  const isQuantityZero = quantity > 0;

  return (
    <S.StepperContainer>
      {isQuantityZero ? (
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
            if (cartItemId) {
              updateCartItemQuantity(cartItemId, quantity - 1);
            }
          }}
          ariaIncreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 더하기`}
          ariaDecreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 빼기`}
        />
      ) : (
        <S.CartIcon
          onClick={() => {
            addCartItem(product.id);
          }}
          type="button"
          aria-label={`${product.name}를 장바구니에 담기`}
          role="cart-icon"
        >
          <img src={cartIcon}></img>
        </S.CartIcon>
      )}
    </S.StepperContainer>
  );
}

export default CartStepper;
