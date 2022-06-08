import React from 'react';
import { CartItem, Product } from 'types';
import Input from 'components/QuantityInput/QuantityInput';
import Checkbox from 'components/Checkbox/Checkbox';
import ICONS from 'constants/icons';
import * as S from 'components/CartItemCard/CartItemCard.styled';

type Props = {
  product: Product;
  quantity: CartItem['quantity'];
  checked: boolean;
  onChangeQuantity: React.ChangeEventHandler<HTMLInputElement>;
  onCheck: React.ChangeEventHandler<HTMLInputElement>;
  onClickRemove: React.MouseEventHandler<HTMLButtonElement>;
};

function CartItemCard({
  product,
  quantity,
  checked,
  onChangeQuantity,
  onCheck,
  onClickRemove,
}: Props) {
  return (
    <S.CartItemCardBox>
      <S.CartItemCardInformationBox>
        <Checkbox checked={checked} onChange={onCheck} />
        <S.ImageBox>
          <img src={product.imageUrl} alt={product.name} />
        </S.ImageBox>
        <p>{product.name}</p>
      </S.CartItemCardInformationBox>
      <S.CartItemCardControlBox>
        <S.Button onClick={onClickRemove}>{ICONS.REMOVE}</S.Button>
        <Input
          type="number"
          min="1"
          max="200"
          step="1"
          onChange={onChangeQuantity}
          value={quantity}
        />
        <p style={{ alignSelf: 'flex-end' }}>
          {(product.price * quantity).toLocaleString('ko-KR')}원
        </p>
      </S.CartItemCardControlBox>
    </S.CartItemCardBox>
  );
}

export default CartItemCard;
