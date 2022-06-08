import * as S from './CheckBox.styled';
import { Props } from './CheckBox.type';

function CheckBox({
  id,
  checked = false,
  marginBottom = '95px',
  onChange,
}: Props) {
  return (
    <>
      <S.Input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <S.Label htmlFor={id} onClick={onChange} marginBottom={marginBottom}>
        <div />
      </S.Label>
    </>
  );
}

export default CheckBox;
