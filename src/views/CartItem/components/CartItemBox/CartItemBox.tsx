import { CheckBox } from '@common/CheckBox';
import { ProductItemType } from 'types/ProductType';
import * as S from './CartItemBox.style';
import { Stepper } from '@common/Stepper';
import deleteIcon from '@assets/delete.svg';
import { useCartItemQuantityBy } from '@recoil/cart/withItemQuantityBy';
import { useCartItemCheckedBy } from '@recoil/cart/withItemCheckBy';

function CartItemBox({ id, imageUrl, name, price }: ProductItemType) {
  // id: cartItem

  const [quantity, setQuantity] = useCartItemQuantityBy(id);
  const { isChecked, toggleCheck } = useCartItemCheckedBy(id);

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
            setQuantity(0);
          }}
        />

        <Stepper
          onChange={(event) => {
            setQuantity(Number(event.target.value));
          }}
          onIncrease={() => {
            setQuantity(quantity + 1);
          }}
          onDecrease={() => {
            if (quantity === 1) return;
            setQuantity(quantity - 1);
          }}
          quantity={quantity}
        />
        <S.PriceText>{`${(price * quantity).toLocaleString('ko-KR')} 원`}</S.PriceText>
      </S.ProductInfo>
    </S.CartItemContainer>
  );
}

export default CartItemBox;
