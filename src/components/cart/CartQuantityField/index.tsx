import { useCartOperations } from '@hooks/useCartOperations';
import Stepper from '@components/common/Stepper';
import { ProductItemType } from '@type/productType';
import cartIcon from '@assets/cart.svg';
import * as S from './CartQuantityField.style';

interface CartQuantityFieldProps {
  product: ProductItemType;
}

function CartQuantityField({ product }: CartQuantityFieldProps) {
  const {
    findCart,
    onQuantityInputChange,
    decreaseQuantity,
    increaseQuantity,
    countInputRef,
    quantity,
    onQuantityBlur,
    onAddItemToCartAndSyncClick,
  } = useCartOperations(product);
  return (
    <S.StepperContainer>
      {findCart ? (
        <Stepper
          onChange={onQuantityInputChange}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
          countInputRef={countInputRef}
          quantity={quantity}
          onQuantityBlur={onQuantityBlur}
          ariaIncreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 더하기`}
          ariaDecreaseLabel={`${product.name}의 장바구니에 담긴 개수에서 하나 빼기`}
        />
      ) : (
        <S.CartIcon
          onClick={onAddItemToCartAndSyncClick}
          type="button"
          aria-label={`${product.name}를 장바구니에 담기`}
          role="cart-icon"
        >
          <img src={cartIcon} alt="장바구니 모양" />
        </S.CartIcon>
      )}
    </S.StepperContainer>
  );
}

export default CartQuantityField;
