import { Stepper } from '@common/Stepper';
import { useCart } from '@views/Cart/hooks/useCart';

import { ProductItemType } from '../../../../types/ProductType';

import * as S from './CartProductInfo.style';
import { FaTrashAlt } from 'react-icons/fa';

interface CartProductInfoProps {
  cartItemId: number;
  product: ProductItemType;
}

function CartProductInfo({ cartItemId, product }: CartProductInfoProps) {
  const { updateCartItemQuantity, getCartItemQuantity } = useCart();
  const quantity = getCartItemQuantity(product.id);
  const deleteQuantity = () => {
    updateCartItemQuantity(cartItemId, 0);
  };

  const increaseQuantity = () => {
    if (!cartItemId) return;
    updateCartItemQuantity(cartItemId, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1 || !cartItemId) return;
    updateCartItemQuantity(cartItemId, quantity - 1);
  };

  const updateQuantity = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!cartItemId) return;
    updateCartItemQuantity(cartItemId, Number(value));
  };

  return (
    <S.ProductContainer>
      <S.DeleteButton>
        <FaTrashAlt size="1.8rem" onClick={deleteQuantity} />
      </S.DeleteButton>
      <Stepper
        quantity={quantity}
        onChange={updateQuantity}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
      />

      <S.PriceText>{`${(product.price * quantity).toLocaleString('ko-KR')} 원`}</S.PriceText>
    </S.ProductContainer>
  );
}

export default CartProductInfo;
