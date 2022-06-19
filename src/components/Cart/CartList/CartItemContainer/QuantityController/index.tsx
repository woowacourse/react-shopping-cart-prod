import { MouseEventHandler } from 'react';
import { Styled } from './styles';

interface ControllerProps {
  quantity: number;
  onIncreaseClick: MouseEventHandler<HTMLButtonElement>;
  onDecreaseClick: MouseEventHandler<HTMLButtonElement>;
}

const QuantityController = ({ quantity, onIncreaseClick, onDecreaseClick }: ControllerProps) => {
  return (
    <Styled.QuantityController>
      <Styled.QuantityInput>{quantity}</Styled.QuantityInput>
      <Styled.ButtonWrapper>
        <Styled.ControlButton onClick={onIncreaseClick}>▲</Styled.ControlButton>
        <Styled.ControlButton onClick={onDecreaseClick}>▼</Styled.ControlButton>
      </Styled.ButtonWrapper>
    </Styled.QuantityController>
  );
};

export default QuantityController;
