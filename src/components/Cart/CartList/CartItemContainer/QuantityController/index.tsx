import styled from 'styled-components';
import ControlButton from './ControlButton';
import QuantityInput from './QuantityInput';
import { MouseEventHandler } from 'react';

interface ControllerProps {
  quantity: number;
  onIncreaseClick: MouseEventHandler<HTMLButtonElement>;
  onDecreaseClick: MouseEventHandler<HTMLButtonElement>;
}

const QuantityController = ({ quantity, onIncreaseClick, onDecreaseClick }: ControllerProps) => {
  return (
    <Styled.QuantityController>
      <Styled.IncreaseButton onClick={onIncreaseClick}>▲</Styled.IncreaseButton>
      <Styled.DecreaseButton onClick={onDecreaseClick}>▼</Styled.DecreaseButton>
      <QuantityInput>{quantity}</QuantityInput>
    </Styled.QuantityController>
  );
};

const Styled = {
  QuantityController: styled.div`
    display: grid;
    grid-template-areas:
      ' qp ib'
      'qp db';

    border: solid grey 1px;
  `,

  IncreaseButton: styled(ControlButton)`
    grid-area: ib;
    border: 1px solid ${({ theme }) => theme.colors.grey};
  `,

  DecreaseButton: styled(ControlButton)`
    grid-area: db;
    border: 1px solid ${({ theme }) => theme.colors.grey};
  `,
};

export default QuantityController;
