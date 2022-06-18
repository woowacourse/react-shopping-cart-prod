import { forwardRef, ComponentProps, ForwardedRef } from 'react';
import * as S from 'components/Input/Input.styles';

function Input(
  props: ComponentProps<any>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <S.Input ref={ref} {...props} />;
}

export default forwardRef(Input);
