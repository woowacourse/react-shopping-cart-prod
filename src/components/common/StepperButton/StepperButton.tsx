import { useCallback } from 'react';
import type { ChangeEvent, ComponentPropsWithoutRef } from 'react';

import { AddIcon, MinusIcon } from '../../../assets/svg';
import { DEFAULT_MAX_COUNT, DEFAULT_MIN_COUNT } from '../../../constants/ui';
import { isNumber } from '../../../utils/validator';
import Button from '../Button/Button';
import * as S from './StepperButton.styles';

interface StepperButtonProps extends ComponentPropsWithoutRef<'div'> {
  count: number;
  minCount?: number;
  maxCount?: number;
  handleCountChange: (count: number) => void;
}

const StepperButton = ({
  count,
  minCount = DEFAULT_MIN_COUNT,
  maxCount = DEFAULT_MAX_COUNT,
  handleCountChange,
  className,
  ...attributes
}: StepperButtonProps) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!isNumber(event.target.value)) return;

      const currCount = Number(event.target.value);

      if (currCount < minCount || currCount > maxCount) return;

      handleCountChange(currCount);
    },
    [handleCountChange, minCount, maxCount]
  );

  return (
    <S.StepperContainer className={`stepper-button ${className}`} {...attributes}>
      <Button
        css={S.buttonStyle}
        type="button"
        aria-label="카운트 감소"
        disabled={count === minCount}
        variant="textButton"
        size="small"
        onClick={() => handleCountChange(count - 1)}
      >
        <MinusIcon />
      </Button>
      <S.StepperInput
        name="count"
        value={count}
        aria-label="카운트 입력"
        onChange={onChange}
      ></S.StepperInput>
      <Button
        css={S.buttonStyle}
        type="button"
        aria-label="카운트 증가"
        disabled={count === maxCount}
        variant="textButton"
        size="small"
        onClick={() => handleCountChange(count + 1)}
      >
        <AddIcon />
      </Button>
    </S.StepperContainer>
  );
};

export default StepperButton;
