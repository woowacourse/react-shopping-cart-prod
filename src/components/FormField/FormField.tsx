import { ForwardedRef, forwardRef } from 'react';
import Input from '../Input/Input';
import * as S from './FormField.styled';
import * as T from './FormField.types';

function FormField(props: T.Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <S.FormFieldBox>
      <S.LeftFlexBox>
        <S.Label required={props.required}>아이디</S.Label>
      </S.LeftFlexBox>
      <S.CenterFlexBox>
        <Input ref={ref} {...props} />
      </S.CenterFlexBox>
      <S.RightFlexBox>
        <S.Button disabled={props.disabled}>중복 확인</S.Button>
      </S.RightFlexBox>
    </S.FormFieldBox>
  );
}

export default forwardRef(FormField);
