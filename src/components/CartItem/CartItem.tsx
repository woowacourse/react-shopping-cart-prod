import React from 'react';
import { Product } from 'types';

import * as S from 'components/CartItem/CartItem.styled';
import Checkbox from 'components/Checkbox/Checkbox';
import QuantityInput from 'components/QuantityInput/QuantityInput';

import ICONS from 'constants/icons';

type Props = {
  product: Product;
  quantity: number;
  checked: boolean;
  onChangeQuantity: (value: number) => void;
  onCheck: React.ChangeEventHandler<HTMLInputElement>;
  onClickRemove: React.MouseEventHandler<HTMLButtonElement>;
};

function CartItem({
  product,
  quantity,
  checked,
  onChangeQuantity,
  onCheck,
  onClickRemove,
}: Props) {
  return (
    <S.CartItemBox>
      <S.CartItemInformationBox>
        <Checkbox checked={checked} onChange={onCheck} />
        <S.ImageBox>
          <img src={product.imageUrl} alt={product.name} />
        </S.ImageBox>
        <p>{product.name}</p>
      </S.CartItemInformationBox>
      <S.CartItemControlBox>
        <S.Button onClick={onClickRemove}>{ICONS.REMOVE}</S.Button>
        <QuantityInput
          type="number"
          min="1"
          max="200"
          step="1"
          onClickButton={onChangeQuantity}
          value={quantity}
        />
        <p style={{ alignSelf: 'flex-end' }}>
          {(product.price * quantity).toLocaleString('ko-KR')}원
        </p>
      </S.CartItemControlBox>
    </S.CartItemBox>
  );
}

export default CartItem;
