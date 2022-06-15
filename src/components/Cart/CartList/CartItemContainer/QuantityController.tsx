import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import { MouseEventHandler } from 'react';

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

const Styled = {
  QuantityController: styled.div`
    display: flex;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,

  ControlButton: styled.button`
    width: 4.2rem;
    height: 3rem;
    grid-area: ib;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    cursor: pointer;
  `,

  QuantityInput: styled.div`
    ${flexCenter}

    font-size: 2.4rem;
    grid-area: qp;
    width: 7.3rem;
    height: 6rem;
    border: solid grey 1px;
  `,
};

export default QuantityController;
