import { ChangeEvent } from 'react';

import * as S from './Stepper.style';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

interface StepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ariaIncreaseLabel?: string;
  ariaDecreaseLabel?: string;
}

function Stepper({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  ariaIncreaseLabel,
  ariaDecreaseLabel,
}: StepperProps) {
  return (
    <S.CartBox>
      <S.QuantityControlButton onClick={onDecrease} aria-label={ariaDecreaseLabel} role="decrease">
        <AiOutlineMinus size="1.5rem" />
      </S.QuantityControlButton>
      <S.QuantityInput data-testid="quantity-input" value={quantity} onChange={onChange} />

      <S.QuantityControlButton onClick={onIncrease} aria-label={ariaIncreaseLabel} role="increase">
        <AiOutlinePlus size="1.5rem" />
      </S.QuantityControlButton>
    </S.CartBox>
  );
}

export default Stepper;
