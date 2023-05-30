import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import * as S from './styles/QuantityInput.styles';

import { cartItemState } from '../../atom/state';
import useQuantityInput from '../hooks/useQuantityInput';
import { checkNaturalStringTypeNumber } from '../../utils/checkNaturalStringTypeNumber';

interface Props {
  cartItemId: number;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
}

export default function QuantityInput({ cartItemId, min = 0, max, style }: Props) {
  const cartItem = useRecoilValue(cartItemState(cartItemId));
  const { input, setInput, setInputWithRequest } = useQuantityInput(cartItemId);

  const getValidRange = (quantity: number) => {
    if (min > quantity) return min;
    if (max && max < quantity) return max;
    return quantity;
  };

  const onChangeInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (checkNaturalStringTypeNumber(value)) {
      setInputWithRequest(getValidRange(Number(value)));
    } else if (value === '') {
      setInput(value);
    }
  };

  const onBlurInput = () => {
    if (input === '') setInputWithRequest(min);
  };

  const quantityIncrease = () => {
    setInputWithRequest(Number(input) + 1);
  };

  const quantityDecrease = () => {
    setInputWithRequest(Number(input) - 1);
  };

  useEffect(() => {
    if (cartItem) setInput(cartItem.quantity.toString());
  }, []);

  return (
    <S.Wrapper style={style}>
      <S.Input type="text" value={input} onChange={onChangeInput} onBlur={onBlurInput} />
      <S.CounterBox>
        <S.Counter onClick={quantityIncrease} disabled={Number(input) === max}>
          <img src="./arrowUp.svg" />
        </S.Counter>
        <S.Counter onClick={quantityDecrease} disabled={Number(input) === min}>
          <img src="./arrowDown.svg" />
        </S.Counter>
      </S.CounterBox>
    </S.Wrapper>
  );
}
