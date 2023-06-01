import { ChangeEvent } from 'react';
import * as S from './Stepper.style';

export type StepperStyleType = 'small' | 'large';

interface StepperProps {
  stepperStyle: StepperStyleType;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ariaIncreaseLabel?: string;
  ariaDecreaseLabel?: string;
  countInputRef: React.RefObject<HTMLInputElement>;
  onQuantityBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function Stepper({
  stepperStyle,
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  ariaIncreaseLabel,
  ariaDecreaseLabel,
  countInputRef,
  onQuantityBlur,
}: StepperProps) {
  return (
    <S.CartBox>
      <S.QuantityInput
        stepperStyle={stepperStyle}
        ref={countInputRef}
        data-testid="quantity-input"
        value={quantity === 0 ? '' : quantity}
        onChange={onChange}
        onBlur={onQuantityBlur}
      />
      <S.ButtonBox>
        <S.QuantityControlButton
          stepperStyle={stepperStyle}
          onClick={onIncrease}
          aria-label={ariaIncreaseLabel}
          role="increase"
        >
          ⏶
        </S.QuantityControlButton>
        <S.QuantityControlButton
          stepperStyle={stepperStyle}
          onClick={onDecrease}
          aria-label={ariaDecreaseLabel}
          role="decrease"
        >
          ⏷
        </S.QuantityControlButton>
      </S.ButtonBox>
    </S.CartBox>
  );
}

export default Stepper;
