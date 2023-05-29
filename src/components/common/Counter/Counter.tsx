import { css, styled } from 'styled-components';
import useCounter from './useCounter';
import { isNumericString } from '../../../utils/isNumericString';
import { MinusIcon, PlusIcon } from '../../../assets/svg';
import type { ChangeEventHandler, FocusEventHandler } from 'react';

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
        <MinusIcon />
      </CounterButton>
      <Input
        type="text"
        maxLength={2}
        value={count}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <CounterButton onClick={increaseCount}>
        <PlusIcon />
      </CounterButton>
    </CounterContainer>
  );
};

const CounterContainer = styled.span<{ size: CounterSize }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(33%, auto));
  border: 1px solid ${(props) => props.theme.color.gray300};

  ${({ size }) => {
    if (size === 'medium') {
      return css`
        width: 120px;
        height: 42px;
      `;
    }

    if (size === 'small') {
      return css`
        width: 92px;
      `;
    }
  }}
`;

const Input = styled.input`
  font-size: 22px;
  text-align: center;
  border: none;
  color: ${(props) => props.theme.color.black};
`;

const CounterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;
`;

export default Counter;
