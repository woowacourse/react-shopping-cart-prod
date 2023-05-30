import { ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import serverState from '@recoil/server/serverState';
import { useQuantityCounter } from '@hooks/useQuantityCounter';
import { useRecoilCart } from '@hooks/useRecoilCart';
import Stepper from '@components/common/Stepper';
import { findCartItemById } from '@utils/cart/cart';
import {
  addItemToCartApi,
  removeCartItemApi,
  updateCartItemQuantityApi,
} from '@utils/cart/fetchCart';
import { ProductItemType } from '@type/productType';
import cartIcon from '@assets/cart.svg';
import * as S from './CartQuantityField.style';

interface CartQuantityFieldProps {
  product: ProductItemType;
}

function CartQuantityField({ product }: CartQuantityFieldProps) {
  const serverName = useRecoilValue(serverState);
  const cart = useRecoilValue(cartState);
  const cartId = findCartItemById({ cart, productId: product.id });
  const findCart = cart.find((cartItem) => cartItem.id === cartId);
  const { addCartItem, updateCartListItemQuantity, getCartItemQuantity, deleteCartItem } =
    useRecoilCart();

  const updateItem = (value: number) => {
    updateCartListItemQuantity({ cartId, quantity: value });
    updateCartItemQuantityApi({ cartId, quantity: value, serverName });
  };

  const deleteItem = () => {
    deleteCartItem(cartId);
    removeCartItemApi({ cartId, serverName });
  };

  const {
    quantity,
    onQuantityChange,
    countInputRef,
    increaseQuantity,
    decreaseQuantity,
    onQuantityBlur,
  } = useQuantityCounter(getCartItemQuantity(product.id), {
    deleteItem,
    updateItem,
  });

  const onClick = async () => {
    const cartId = await addItemToCartApi({ productId: product.id, serverName });
    addCartItem({ cartId: Number(cartId), product });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    const targetValue = Number(value);

    if (isNaN(targetValue)) return;

    onQuantityChange(targetValue);
  };

  return (
    <S.StepperContainer>
      {findCart ? (
        <Stepper
          onChange={onChange}
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
          onClick={onClick}
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
