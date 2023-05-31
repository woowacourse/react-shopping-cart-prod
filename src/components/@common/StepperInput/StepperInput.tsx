/* eslint-disable react-hooks/exhaustive-deps */
import UpTriangle from '../../../assets/triangle.svg';
import DownTriangle from '../../../assets/triangle-down.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import * as S from './StepperInput.styles';
import { isNumber } from '../../../utils/validation';

type StepperInputProps = {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  $width?: number;
  getValue: (value: number) => void;
};

const StepperInput = ({ min = 0, max = 99, step = 1, initialValue = 0, $width = 65, getValue }: StepperInputProps) => {
  const [inputValue, setInputValue] = useState(String(initialValue));

  useEffect(() => {
    if (inputValue !== '') getValue(Number(inputValue));
  }, [inputValue]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') setInputValue('');
    if (!isNumber(e.target.value)) return;

    const currentValue = Number(e.target.value);

    if (currentValue >= min && currentValue <= max) setInputValue(String(currentValue));
  };

  const handleBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') setInputValue(String(min));
  };

  const handleIncreaseStepper = () => {
    const nextValue = Number(inputValue) + step;

    if (nextValue <= max) setInputValue(String(nextValue));
  };

  const handleDecreaseStepper = () => {
    const nextValue = Number(inputValue) - step;

    if (nextValue >= min) setInputValue(String(nextValue));
  };

  return (
    <S.StepperInputWrapper>
      <S.Input $width={$width} type='text' value={inputValue} onChange={handleChangeInput} onBlur={handleBlurInput} />
      <S.StepperWrapper>
        <S.Stepper $width={$width} type='button' onClick={handleIncreaseStepper}>
          <S.StepperImg $width={$width} src={UpTriangle} alt='수량올리기' />
        </S.Stepper>
        <S.Stepper $width={$width} type='button' onClick={handleDecreaseStepper}>
          <S.StepperImg $width={$width} src={DownTriangle} alt='수량내리기' />
        </S.Stepper>
      </S.StepperWrapper>
    </S.StepperInputWrapper>
  );
};

export default StepperInput;
