import {
  forwardRef,
  ComponentProps,
  ForwardedRef,
  useImperativeHandle,
  useRef,
} from 'react';
import * as S from './Input.styles';

function Input(
  props: ComponentProps<any>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement>();
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  return <S.Input ref={inputRef} {...props} />;
}

export default forwardRef(Input);
