import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import * as S from './Checkbox.styled';

function Checkbox(
  props: ComponentProps<any>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement>();
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  return <S.Checkbox ref={inputRef} {...props} type="checkbox" />;
}

export default forwardRef(Checkbox);
