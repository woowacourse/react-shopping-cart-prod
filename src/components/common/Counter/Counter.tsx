import { css, styled } from 'styled-components';
import useCounter from './useCounter';
import { isNumericString } from '../../../utils/isNumericString';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import type { ChangeEventHandler, FocusEventHandler } from 'react';
import colors from '../../../colors';
export type CounterSize = 'medium' | 'small';

interface CounterProps {
  count: number;
  onChange: (count: number) => void;
  onBlur: (count: number) => void;
  size?: CounterSize;
}

const Counter = ({
  count,
  onChange,
  onBlur,
  size = 'medium',
}: CounterProps) => {
  const { increaseCount, decreaseCount, updateCount } = useCounter({
    count,
    onChange,
    onBlur,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isNumericString(e.target.value)) return;

    updateCount(Number(e.target.value));
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur(Number(e.target.value));
  };

  return (
    <CounterContainer size={size}>
      <CounterButton onClick={decreaseCount}>
        <AiOutlineMinus />
      </CounterButton>
      <Input
        type="text"
        maxLength={2}
        value={count}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <CounterButton onClick={increaseCount}>
        <AiOutlinePlus />
      </CounterButton>
    </CounterContainer>
  );
};

const CounterContainer = styled.span<{ size: CounterSize }>`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.3s;

  ${({ size }) =>
    (size === 'medium' &&
      css`
        width: 120px;
        height: 42px;

        & > * {
          width: 42px;
          height: 42px;

          font-size: 24px;
        }
      `) ||
    (size === 'small' &&
      css`
        width: 92px;

        & > * {
          width: 30px;
          height: 30px;

          font-size: 16px;
        }
      `)}
`;

const Input = styled.input`
  border: none;
  font-weight: 400;
  color: ${colors.gold};
  background-color: ${colors.pureBlack};
  text-align: center;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.faintGold};
  }
`;

const CounterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.pureBlack};
  border: none;
  cursor: pointer;
  transition: 0.3s;

  & {
    color: ${colors.gold};
  }

  &:hover {
    background-color: ${colors.faintGold};
  }
`;

export default Counter;
