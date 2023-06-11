import { css, styled } from 'styled-components';
import { HiPlusSmall, HiMinusSmall } from 'react-icons/hi2';
import useCounterHandler from './useCounterHandler';
import Colors from '../../../constant/Colors';

export type CounterSize = 'medium' | 'small';

interface CounterProps {
  count: number;
  updateCount: (count: number) => void;
  onClickedButton?: (quantity: number) => void;
  onChangedInput?: (quantity: number) => void;
  onBlurredInput?: (quantity: number) => void;
  size?: CounterSize;
  min?: number;
  max?: number;
}

const Counter = ({
  count,
  updateCount,
  onClickedButton,
  onChangedInput,
  onBlurredInput,
  size = 'medium',
  min = 0,
  max = 99,
}: CounterProps) => {
  const {
    handleDecreaseButtonClick,
    handleIncreaseButtonClick,
    handleInputBlur,
    handleInputChange,
  } = useCounterHandler({
    count,
    updateCount,
    onClickedButton,
    onChangedInput,
    onBlurredInput,
    min,
    max,
  });

  return (
    <CounterContainer size={size}>
      <CounterButton onClick={handleDecreaseButtonClick}>
        <HiMinusSmall size="32px" />
      </CounterButton>
      <Input type="text" value={count} onChange={handleInputChange} onBlur={handleInputBlur} />
      <CounterButton onClick={handleIncreaseButtonClick}>
        <HiPlusSmall size="32px" />
      </CounterButton>
    </CounterContainer>
  );
};

const CounterContainer = styled.span<{ size: CounterSize }>`
  display: flex;

  border: 1px solid ${Colors.grey4};

  ${({ size }) =>
    (size === 'medium' &&
      css`
        width: 120px;
        height: 42px;

        & > * {
          width: 40px;
          height: 40px;

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
  color: ${Colors.grey1};

  text-align: center;
`;

const CounterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${Colors.white};
  border: none;

  cursor: pointer;
`;

export default Counter;
