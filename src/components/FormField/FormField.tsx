import { ForwardedRef, forwardRef } from 'react';
import Input from '../Input/Input';
import * as S from './FormField.styled';
import * as T from './FormField.types';

function FormField(props: T.Props, ref: ForwardedRef<HTMLInputElement>) {
  const { required, disabled } = props;

  return (
    <S.FormFieldBox>
      <S.LeftFlexBox>
        <S.Label required={required}>아이디</S.Label>
      </S.LeftFlexBox>
      <S.CenterFlexBox>
        <Input ref={ref} {...props} />
      </S.CenterFlexBox>
      <S.RightFlexBox>
        <S.Button disabled={disabled}>중복 확인</S.Button>
      </S.RightFlexBox>
    </S.FormFieldBox>
  );
}

export default forwardRef(FormField);
