import styled from 'styled-components';

import ArrowUpIcon from '../../assets/ArrowUpIcon';
import ArrowDownIcon from '../../assets/ArrowDownIcon';
import useProductQuantity from '../../hooks/useProductQuantity';

type AmountCounterSizeType = 'small' | 'medium';
type AmountCounterStyle = Pick<AmountCounterProps, 'variant'>;

interface AmountCounterProps {
  variant: AmountCounterSizeType;
  cartItemId: number;
  count: number;
  minCount?: number;
}

const AmountCounter = ({
  variant,
  cartItemId,
  count,
  minCount = 0,
}: AmountCounterProps) => {
  const { addCount, subtractCount } = useProductQuantity(cartItemId, count);

  return (
    <InputGroup variant={variant}>
      <CounterInput type="number" value={count} variant={variant} readOnly />
      <CountBtnContainer>
        <CountBtn type="button" onClick={addCount} variant={variant}>
          <ArrowUpIcon />
        </CountBtn>
        <CountBtn
          type="button"
          onClick={subtractCount}
          variant={variant}
          disabled={count <= minCount}
        >
          {count <= minCount ? null : <ArrowDownIcon />}
        </CountBtn>
      </CountBtnContainer>
    </InputGroup>
  );
};

const amountCounterStyles = {
  small: {
    group: {
      height: '28px',
    },
    input: {
      width: '42px',
      fontSize: '16px',
    },
    button: {
      width: '24px',
      height: '14px',
    },
  },
  medium: {
    group: {
      height: '48px',
    },
    input: {
      width: '54px',
      fontSize: '20px',
    },
    button: {
      width: '32px',
      height: '24px',
    },
  },
};

const InputGroup = styled.div<AmountCounterStyle>`
  display: flex;
  ${({ variant }) => amountCounterStyles[variant].group}

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    height: 40px;
  }
`;

const CounterInput = styled.input<AmountCounterStyle>`
  ${({ variant }) => amountCounterStyles[variant].input}
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  outline: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    width: 80px;
  }
`;

const CountBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CountBtn = styled.button<AmountCounterStyle>`
  ${({ variant }) => amountCounterStyles[variant].button}
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  flex-wrap: 1;

  &:disabled {
    svg > path {
      fill: ${({ theme }) => theme.colors.gray200};
    }
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    width: 40px;
    height: 20px;
  }
`;

export default AmountCounter;
