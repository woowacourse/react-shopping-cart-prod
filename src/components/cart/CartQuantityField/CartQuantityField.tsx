import { ProductItemType } from 'types/ProductType';
import { useCartItemQuantityBy } from '@recoil/cart/withItemQuantityBy';
import { Stepper } from 'components/common/Stepper';
import cartIcon from '@assets/cart.svg';
import * as S from './CartQuantityField.style';

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
        <S.CartIcon type="button" aria-label={`${product.name}를 장바구니에 담기`} role="cart-icon">
          <img src={cartIcon} alt="장바구니 모양" />
        </S.CartIcon>
      )}
    </S.StepperContainer>
  );
}

export default CartQuantityField;
