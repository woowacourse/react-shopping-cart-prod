import type { RuleSet } from 'styled-components';
import { css, styled } from 'styled-components';

type StepperVariant = 'small' | 'large';

const InputContainerStylesByVariant: Record<StepperVariant, RuleSet<object>> = {
  small: css({
    width: '50px',
    height: '26px',
    fontSize: '12px',
  }),
  large: css({
    width: '80px',
    height: '60px',
    fontSize: '24px',
  }),
};

type InputContainerProps = {
  $variant: StepperVariant;
};

const InputContainer = styled.div<InputContainerProps>`
  ${(props) => InputContainerStylesByVariant[props.$variant]}

  display: flex;
  align-items: stretch;

  height: 25px;
  margin-top: 5px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  text-align: center;
  font-size: 10px;

  outline: none;
`;

const InputButtonStylesByVariant: Record<StepperVariant, RuleSet<object>> = {
  small: css({
    width: '24px',
    '& > img': {
      width: '5px',
    },
  }),
  large: css({
    width: '48px',
    '& > img': {
      width: '8px',
    },
  }),
};

type InputButtonProps = {
  $variant: StepperVariant;
};

const InputButton = styled.button<InputButtonProps>`
  ${(props) => InputButtonStylesByVariant[props.$variant]}

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fonts.text}
`;

type StepperProps = {
  variant?: StepperVariant;
  min?: number;
  max?: number;
  value: number;
  onChange?: (value: number) => void;
};

const Stepper = (props: StepperProps) => {
  const { variant = 'small', min, max, value, onChange } = props;

  const handleClick = (type: 'increase' | 'decrease') => () => {
    const newValue = value + (type === 'increase' ? 1 : -1);

    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;

    onChange?.(newValue);
  };

  return (
    <InputContainer $variant={variant}>
      <InputButton $variant={variant} onClick={handleClick('decrease')}>
        -
      </InputButton>
      <Input value={value} readOnly />
      <InputButton $variant={variant} onClick={handleClick('increase')}>
        +
      </InputButton>
    </InputContainer>
  );
};

export default Stepper;
