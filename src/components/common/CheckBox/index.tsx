import * as S from './CheckBox.style';

export const CheckBox = ({ ...restProps }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <S.CheckBoxInput data-testid="checkbox" type="checkbox" {...restProps}></S.CheckBoxInput>
);

export default CheckBox;
