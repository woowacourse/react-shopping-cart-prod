import { useCartItemQuantityBy } from '@recoil/cart/withItemQuantityBy';
import { useCartToggleSelection } from '@hooks/recoil/cart/useCartToggleSelection';
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
  const [cartQuantity, setCartQuantity] = useCartItemQuantityBy(productId);
  const { isChecked, toggleCheck } = useCartToggleSelection(cartId);

  const { quantity } = cartQuantity;

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
            setCartQuantity({
              cartId,
              quantity: 0,
            });
          }}
        />

        <Stepper
          onChange={(event) => {
            setCartQuantity({
              cartId,
              quantity: Number(event.target.value),
            });
          }}
          onIncrease={() => {
            setCartQuantity({
              cartId,
              quantity: quantity + 1,
            });
          }}
          onDecrease={() => {
            if (quantity === 1) return;
            setCartQuantity({
              cartId,
              quantity: quantity - 1,
            });
          }}
          quantity={quantity}
        />
        <S.PriceText>{`${(price * quantity).toLocaleString('ko-KR')} 원`}</S.PriceText>
      </S.ProductInfo>
    </S.CartItemContainer>
  );
}

export default CartItemBox;
