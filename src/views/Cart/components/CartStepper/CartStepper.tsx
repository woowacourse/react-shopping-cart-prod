import { Stepper } from "@common/Stepper";
import { useCart } from "@views/Cart/hooks/useCart";

import { ProductItemType } from "types/ProductType";

import * as S from "./CartStepper.style";
import { BsCartPlus } from "react-icons/bs";

interface CartQuantityFieldProps {
  product: ProductItemType;
}

function CartStepper({ product }: CartQuantityFieldProps) {
  const {
    getCartItemId,
    getCartItemQuantity,
    updateCartItemQuantity,
    addCartItem,
  } = useCart();
  const quantity = getCartItemQuantity(product.id);
  const cartItemId = getCartItemId(product.id) ?? -1;

  const changeQuantity = ({ target: value }) => {
    updateCartItemQuantity(cartItemId, Number(value));
  };

  const increaseQuantity = () => {
    updateCartItemQuantity(cartItemId, quantity + 1);
  };

  const decreaseQuantity = () => {
    updateCartItemQuantity(cartItemId, quantity - 1);
  };

  return (
    <S.StepperContainer>
      {quantity > 0 ? (
        <Stepper
          quantity={quantity}
          onChange={changeQuantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          ariaIncreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 더하기`}
          ariaDecreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 빼기`}
        />
      ) : (
        <S.CartIcon
          onClick={addCartItem(product.id)}
          type="button"
          aria-label={`${product.name}를 장바구니에 담기`}
          role="cart-icon"
        >
          <BsCartPlus size="1.8rem" />
        </S.CartIcon>
      )}
    </S.StepperContainer>
  );
}

export default CartStepper;
