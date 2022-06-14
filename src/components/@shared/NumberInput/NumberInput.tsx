import preventClickEvent from 'utils/event';

import * as S from './NumberInput.styled';
import { Props } from './NumberInput.type';

function NumberInput({ min = 1, max = 99, value, setValue }: Props) {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);

    if (inputValue < min) {
      setValue(min);

      return;
    }
    if (inputValue > max) {
      setValue(max);

      return;
    }

    setValue(inputValue);
  };

  const onClickUpButton = () => {
    const newValue = value + 1;

    if (newValue > max) {
      setValue(max);
      return;
    }

    setValue(newValue);
  };

  const onClickDownButton = () => {
    const newValue = value - 1;

    if (newValue < min) {
      setValue(min);
      return;
    }

    setValue(newValue);
  };

  return (
    <S.NumberInputContainer onClick={preventClickEvent}>
      <S.Input
        type="number"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={onChangeValue}
      />
      <S.ControlButton>
        <button type="button" onClick={onClickUpButton}>
          ▲
        </button>
        <button type="button" onClick={onClickDownButton}>
          ▼
        </button>
      </S.ControlButton>
    </S.NumberInputContainer>
  );
}

export default NumberInput;
