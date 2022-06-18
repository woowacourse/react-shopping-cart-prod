import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import * as S from 'components/Checkbox/Checkbox.styled';

function Checkbox(
  props: ComponentProps<any>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <S.Checkbox ref={ref} {...props} type="checkbox" />;
}

export default forwardRef(Checkbox);
