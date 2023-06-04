import styled from 'styled-components';

import ArrowUpIcon from '../../assets/ArrowUpIcon';
import ArrowDownIcon from '../../assets/ArrowDownIcon';
import {
  AmountCounterStyleProps,
  ComponentVariant,
  amountCounterStyles,
} from '../../styles/component';

interface AmountCounterProps {
  variant: ComponentVariant;
  count: number;
  minCount?: number;
  addCount: () => void;
  subtractCount: () => void;
}

const AmountCounter = ({
  variant,
  count,
  minCount = 0,
  addCount,
  subtractCount,
}: AmountCounterProps) => {
  return (
    <InputGroup variant={variant}>
      <CounterInput type='number' value={count} variant={variant} readOnly />
      <CountBtnContainer>
        <CountBtn type='button' onClick={addCount} variant={variant}>
          <ArrowUpIcon />
        </CountBtn>
        <CountBtn
          type='button'
          onClick={subtractCount}
          variant={variant}
          disabled={count <= minCount}
        >
          <ArrowDownIcon />
        </CountBtn>
      </CountBtnContainer>
    </InputGroup>
  );
};

const InputGroup = styled.div<AmountCounterStyleProps>`
  display: flex;
  ${({ variant }) => amountCounterStyles[variant].group}
`;

const CounterInput = styled.input<AmountCounterStyleProps>`
  ${({ variant }) => amountCounterStyles[variant].input}
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  outline: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
`;

const CountBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CountBtn = styled.button<AmountCounterStyleProps>`
  ${({ variant }) => amountCounterStyles[variant].button}
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  flex-wrap: 1;

  &:disabled {
    svg > path {
      fill: ${({ theme }) => theme.colors.gray200};
    }
    cursor: not-allowed;
  }
`;

export default AmountCounter;
