import { useId } from 'react';
import * as S from './styles/CheckBox.styles';
import Image from './Image';

interface Props {
  checked: boolean;
  onClickCheckbox?: () => void;
}

export default function CheckBox({ checked, onClickCheckbox }: Props) {
  const id = useId();

  return (
    <S.Wrapper>
      <input id={id} type="checkbox" checked={checked} readOnly />
      <S.CheckboxLabel htmlFor={id} onClick={onClickCheckbox}>
        {checked && <Image src="./whiteCheck.svg" />}
      </S.CheckboxLabel>
    </S.Wrapper>
  );
}
