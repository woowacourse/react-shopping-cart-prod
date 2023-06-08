import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import useToast from '../../hooks/useToast';
import useQuantityUpdater from '../../hooks/useQuantityUpdater';
import { cartItemState } from '../../recoil/state';
import { isNaturalNumberString } from '../../utils/validator';
import { API_ERROR_MESSAGE, API_INFO_MESSAGE } from '../../constants';

interface Props {
  cartItemId: number;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
}

export default function QuantityInput({ cartItemId, min = 0, max, style }: Props) {
  const cartItem = useRecoilValue(cartItemState(cartItemId));

  const [input, setInput] = useState('');
  const { quantityUpdater } = useQuantityUpdater(cartItemId);
  const { showToast } = useToast();

  const getValidQuantity = (quantity: number) => {
    if (min > quantity) return min;
    if (max && max < quantity) return max;
    return quantity;
  };

  const handleQuantityUpdate = async (quantity: number) => {
    try {
      await quantityUpdater(quantity);
      setInput(String(quantity));
      showToast(
        'info',
        quantity === 0 ? API_INFO_MESSAGE.deleteCartItem : API_INFO_MESSAGE.patchCartItemQuantity
      );
    } catch {
      showToast('error', API_ERROR_MESSAGE.patchCartItemQuantity);
    }
  };

  const setValidInput = async ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (value === '') {
      setInput(value);
    } else if (isNaturalNumberString(value)) {
      handleQuantityUpdate(getValidQuantity(Number(value)));
    }
  };

  const onBlurInput = () => {
    if (input === '') handleQuantityUpdate(min);
  };

  const increase = () => {
    handleQuantityUpdate(Number(input) + 1);
  };

  const decrease = () => {
    handleQuantityUpdate(Number(input) - 1);
  };

  useEffect(() => {
    if (cartItem) setInput(cartItem.quantity.toString());
  }, []);

  return (
    <Wrapper style={style}>
      <Input type="text" value={input} onChange={setValidInput} onBlur={onBlurInput} />
      <CounterBox>
        <Counter onClick={increase} disabled={Number(input) === max}>
          <img src="/arrowUp.svg" />
        </Counter>
        <Counter onClick={decrease} disabled={Number(input) === min}>
          <img src="/arrowDown.svg" />
        </Counter>
      </CounterBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  width: 72px;
  height: 36px;

  text-align: center;
  font-size: 16px;
`;

const Input = styled.input`
  width: 64%;
  height: 100%;
  border: 1px solid #dddddd;

  text-align: center;
  font-size: inherit;
  color: #333333;
`;

const CounterBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 36%;
  height: 100%;
`;

const Counter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50%;
  border: 1px solid #dddddd;
  background: transparent;

  & > img {
    width: 48%;
    height: 32%;
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.1);
    cursor: default;
  }

  &:disabled > img {
    visibility: hidden;
  }
`;
