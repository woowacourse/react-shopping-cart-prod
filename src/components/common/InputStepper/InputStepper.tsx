import type { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { NUM, REG } from '../../../abstract/constants';

interface InputStepperProps {
  size: 'small' | 'big';
  quantity: number;
  setQuantity: (value: number) => void;
  minNumber?: number;
}

interface InputStepperStyleProps {
  $size: InputStepperProps['size'];
}

const InputStepper = ({ size, quantity, setQuantity, minNumber = NUM.ZERO }: InputStepperProps) => {
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    const checkNumberRegExp = REG.CHECK_NUM;
    if (!checkNumberRegExp.test(e.target.value)) return;

    if (Number(e.target.value) !== quantity) {
      setQuantity(Number(e.target.value));
    }
  };

  return (
    <InputStepperWrapper>
      <InputStyle $size={size} type="text" value={quantity} onChange={changeText} />
      <StepperButtonWrapper>
        <StepperUpButton
          $size={size}
          onClick={() => quantity < NUM.MAX_QUANTITY && setQuantity(quantity + NUM.ONE)}
        >
          &#9662;
        </StepperUpButton>
        <StepperDownButton
          $size={size}
          onClick={() => quantity > minNumber && setQuantity(quantity - NUM.ONE)}
        >
          &#9662;
        </StepperDownButton>
      </StepperButtonWrapper>
    </InputStepperWrapper>
  );
};

export default InputStepper;

const InputStepperWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputStyle = styled.input<InputStepperStyleProps>`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  ${({ $size }) =>
    $size === 'small'
      ? 'width: 41.6px; height: 28px; font-size: 12px;'
      : 'width: 58px; height: 40px; font-size: 20px; '}

  border: 1px solid #ddd;
  outline: none;

  text-align: center;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.5px;
  color: #333333;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const StepperButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StepperDownButton = styled.button<InputStepperStyleProps>`
  ${({ $size }) =>
    $size === 'small'
      ? 'width: 23.93px; height: 14px; font-size: 12px;'
      : 'width: 32px; height: 20px; font-size: 18px; '}

  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  border-bottom-right-radius: 4px;
`;

const StepperUpButton = styled(StepperDownButton)`
  transform: scaleY(-1);
`;
