import { ChangeEvent } from 'react';
import * as styled from './Stepper.styled';

import { Button } from '@components/common/Button/Button';

import { useCartRepository } from '@recoils/cartAtoms';

import { QUANTITY } from '@constants/index';

interface Props {
  cartItemId: number;
  quantity: number;
}

export const Stepper = ({ cartItemId, quantity }: Props) => {
  const { updateQuantity } = useCartRepository();

  const onClickPlusButton = () => {
    if (quantity === QUANTITY.MAX) return;

    updateQuantity(cartItemId, quantity + 1);
  };

  const onClickMinusButton = () => {
    if (quantity === QUANTITY.MIN) return;

    updateQuantity(cartItemId, quantity - 1);
  };

  const onChangeQuantity = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const count = Number(value) || 1;
    const quantity = count > QUANTITY.MAX ? QUANTITY.MAX : count;

    updateQuantity(cartItemId, quantity);
  };

  return (
    <styled.Container>
      <Button designType="square" disabled={quantity === QUANTITY.MIN} onClick={onClickMinusButton}>
        -
      </Button>
      <styled.CountInput value={quantity} onChange={onChangeQuantity} />
      <Button designType="square" disabled={quantity === QUANTITY.MAX} onClick={onClickPlusButton}>
        +
      </Button>
    </styled.Container>
  );
};
