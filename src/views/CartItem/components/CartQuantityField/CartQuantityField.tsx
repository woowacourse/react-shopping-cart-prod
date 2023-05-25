import { useCartItemQuantityBy } from '@recoil/cart/withItemQuantityBy';
import * as S from './CartQuantityField.style';

import { ProductItemType } from 'types/ProductType';
import { Stepper } from '@common/Stepper';
import cartIcon from '@assets/cart.svg';
import fetchCartItems from '@views/CartItemList/remote/fetchCartItem';

interface CartQuantityFieldProps {
  product: ProductItemType;
}

function CartQuantityField({ product }: CartQuantityFieldProps) {
  const [cartQuantity, setCartQuantity] = useCartItemQuantityBy(product.id);
  const { quantity, cartId } = cartQuantity;

  const isQuantityZero = quantity > 0;

  return (
    <S.StepperContainer>
      {isQuantityZero ? (
        <Stepper
          quantity={quantity}
          onChange={(event) => {
            setCartQuantity({ cartId, quantity: Number(event.target.value) });
          }}
          onIncrease={() => {
            setCartQuantity({ cartId, quantity: quantity + 1 });
          }}
          onDecrease={() => {
            setCartQuantity({ cartId, quantity: quantity - 1 });
          }}
          ariaIncreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 더하기`}
          ariaDecreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 빼기`}
        />
      ) : (
        <S.CartIcon
          onClick={async () => {
            const response = await fetchCartItems.add(product.id);
            const newCartId = response.headers.get('Location')?.split('/').pop();
            console.log('>>> newCartId:', newCartId);

            if (!newCartId) return;

            setCartQuantity({
              cartId: Number(newCartId),
              quantity: 1,
            });
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

export default CartQuantityField;
