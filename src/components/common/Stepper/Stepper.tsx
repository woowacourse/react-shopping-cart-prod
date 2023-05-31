import { ChangeEvent } from 'react';
import * as styled from './Stepper.styled';

import { Button } from '@components/common/Button/Button';

import { useApiBaseUrlValue } from '@recoils/recoilApiBaseUrl';

import { useUpdateRecoilCart } from '@hooks/useUpdateRecoilCart';
import { useMutation } from '@hooks/useMutation';

import { FETCH_METHOD, FETCH_URL, QUANTITY } from '@constants/index';

interface Props {
  cartItemId: number;
  quantity: number;
}

export const Stepper = ({ cartItemId, quantity }: Props) => {
  const baseUrl = useApiBaseUrlValue();
  const { mutation: updateQuantityMutation } = useMutation(FETCH_METHOD.PATCH);

  const {
    increaseRecoilProductQuantity,
    decreaseRecoilProductQuantity,
    updateRecoilProductQuantity,
  } = useUpdateRecoilCart();

  const onClickPlusButton = () => {
    if (quantity === QUANTITY.MAX) return;

    increaseRecoilProductQuantity(cartItemId, quantity + 1);

    updateQuantityMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`, {
      quantity,
    });
  };

  const onClickMinusButton = () => {
    if (quantity === QUANTITY.MIN) return;

    decreaseRecoilProductQuantity(cartItemId, quantity - 1);

    updateQuantityMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`, {
      quantity,
    });
  };

  const onChangeQuantity = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    updateRecoilProductQuantity(cartItemId, Number(value) || 1);

    updateQuantityMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`, {
      quantity,
    });
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
