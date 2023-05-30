import { useId } from 'react';
import * as S from './styles/CheckBox.styles';

interface Props {
  checked: boolean;
  onClickCheckbox?: () => void;
}

export default function CheckBox({ checked, onClickCheckbox }: Props) {
  const id = useId();

  return (
    <S.Wrapper>
      <input id={id} type="checkbox" checked={checked} />
      <S.CheckboxLabel htmlFor={id} onClick={onClickCheckbox}>
        {checked && <img src="./whiteCheck.svg" />}
      </S.CheckboxLabel>
    </S.Wrapper>
  );
}
