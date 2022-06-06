import { forwardRef } from 'react';
import * as S from './FormField.styled';
import * as T from './FormField.types';

function FormField({
  label,
  hasButton,
  buttonTitle,
  onClickButton,
  required,
  disabled,
  children,
}: T.Props) {
  return (
    <S.FormFieldBox>
      <S.LeftFlexBox>
        <S.Label required={required}>{label}</S.Label>
      </S.LeftFlexBox>
      <S.CenterFlexBox>{children}</S.CenterFlexBox>
      <S.RightFlexBox>
        {hasButton && (
          <S.Button onClick={onClickButton} disabled={disabled}>
            {buttonTitle}
          </S.Button>
        )}
      </S.RightFlexBox>
    </S.FormFieldBox>
  );
}

export default forwardRef(FormField);
