import { useCartToggleSelection } from '@hooks/recoil/cart/useCartToggleSelection';
import { useCartOperations } from '@hooks/useCartOperations';
import CheckBox from '@components/common/CheckBox';
import Stepper from '@components/common/Stepper';
import deleteIcon from '@assets/delete.svg';
import * as S from './CartItemBox.style';

interface CartItemProps {
  cartId: number;
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
}

function CartItemBox({ cartId, productId, imageUrl, name, price }: CartItemProps) {
  const { isChecked, toggleCheck } = useCartToggleSelection(cartId);

  const {
    onQuantityInputChange,
    decreaseQuantity,
    increaseQuantity,
    countInputRef,
    quantity,
    onQuantityBlur,
    removeCartItemAndDelete,
  } = useCartOperations({ id: productId, imageUrl, name, price });

  return (
    <S.CartItemContainer>
      <CheckBox type="checkbox" checked={isChecked} onChange={toggleCheck} size="medium" />
      <S.ItemImageWrapper>
        <S.ItemImage src={imageUrl} />
      </S.ItemImageWrapper>
      <S.NameText>{name}</S.NameText>
      <S.ProductInfo>
        <S.DeleteIcon src={deleteIcon} onClick={removeCartItemAndDelete} />
        <Stepper
          onChange={onQuantityInputChange}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
          countInputRef={countInputRef}
          quantity={quantity}
          onQuantityBlur={onQuantityBlur}
          ariaIncreaseLabel={`${name}의 장바구니에 담긴 개수에서 하나 더하기`}
          ariaDecreaseLabel={`${name}의 장바구니에 담긴 개수에서 하나 빼기`}
        />
        <S.PriceText>{`${(price * quantity).toLocaleString('ko-KR')} 원`}</S.PriceText>
      </S.ProductInfo>
    </S.CartItemContainer>
  );
}

export default CartItemBox;
