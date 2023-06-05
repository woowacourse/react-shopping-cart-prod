import styled, { css } from 'styled-components';

import ArrowUpIcon from '../../assets/ArrowUpIcon';
import ArrowDownIcon from '../../assets/ArrowDownIcon';

type designtype = 'main' | 'cart';
type DesignProps = Pick<AmountCounterProps, 'designtype'>;

interface AmountCounterProps {
  designtype: designtype;
  count: number;
  addCount: () => void;
  subtractCount: () => void;
  maxCount: number;
}

const AmountCounter = ({
  designtype,
  count,
  addCount,
  subtractCount,
  maxCount,
}: AmountCounterProps) => {
  return (
    <InputGroup designtype={designtype}>
      <CounterInput
        type='number'
        defaultValue={count}
        designtype={designtype}
        max={maxCount}
      />
      <CountBtnContainer>
        <CountBtn
          designtype={designtype}
          onClick={addCount}
          aria-label='수량 더하기 버튼'
        >
          <ArrowUpIcon />
        </CountBtn>
        <CountBtn
          designtype={designtype}
          onClick={subtractCount}
          aria-label='수량 빼기 버튼'
        >
          <ArrowDownIcon />
        </CountBtn>
      </CountBtnContainer>
    </InputGroup>
  );
};

const counterStyles = {
  main: {
    group: css`
      height: 28px;
    `,
    input: css`
      width: 42px;
      font-size: 16px;
    `,
    button: css`
      width: 24px;
      height: 14px;
    `,
  },
  cart: {
    group: css`
      height: 45px;
    `,
    input: css`
      width: 53px;
      font-size: 20px;
    `,
    button: css`
      width: 32px;
    `,
  },
};

const InputGroup = styled.div<DesignProps>`
  display: flex;
  ${({ designtype }) => counterStyles[designtype].group}
`;

const CounterInput = styled.input<DesignProps>`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  outline: none;
  ${({ designtype }) => counterStyles[designtype].input}

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
`;

const CountBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
`;

const CountBtn = styled.button<DesignProps>`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  flex: 1;

  ${({ designtype }) => counterStyles[designtype].button}
`;

export default AmountCounter;
