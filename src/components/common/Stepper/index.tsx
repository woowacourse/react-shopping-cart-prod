import { ChangeEvent } from 'react';
import * as S from './Stepper.style';

export type StepperStyleType = 'small' | 'large';

interface StepperProps {
  stepperstyle: StepperStyleType;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ariaIncreaseLabel?: string;
  ariaDecreaseLabel?: string;
  countInputRef: React.RefObject<HTMLInputElement>;
  onQuantityBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  isCartPage: boolean;
}

function Stepper({
  stepperstyle,
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  ariaIncreaseLabel,
  ariaDecreaseLabel,
  countInputRef,
  onQuantityBlur,
  isCartPage,
}: StepperProps) {
  return (
    <S.CartBox>
      <S.QuantityInput
        stepperstyle={stepperstyle}
        ref={countInputRef}
        data-testid="quantity-input"
        value={quantity === 0 ? '' : quantity}
        onChange={onChange}
        onBlur={onQuantityBlur}
      />
      <S.ButtonBox>
        <S.QuantityControlButton
          stepperstyle={stepperstyle}
          onClick={onIncrease}
          aria-label={ariaIncreaseLabel}
          role="increase"
        >
          ⏶
        </S.QuantityControlButton>
        <S.QuantityControlButton
          stepperstyle={stepperstyle}
          onClick={onDecrease}
          aria-label={ariaDecreaseLabel}
          role="decrease"
          disabled={isCartPage && quantity === 1}
        >
          ⏷
        </S.QuantityControlButton>
      </S.ButtonBox>
    </S.CartBox>
  );
}

export default Stepper;
