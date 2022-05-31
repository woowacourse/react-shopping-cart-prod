import { forwardRef, ComponentProps, ForwardedRef } from 'react';
import styled from 'styled-components';

function Input(
  props: ComponentProps<any>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <StyledInput ref={ref} {...props} />;
}

const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 14px;
  box-sizing: border-box;
  color: ${({ theme: { colors } }) => colors.black};
  outline: ${({ theme: { colors } }) => colors.gray} solid 1px;
  border: none;
  border-radius: 4px;

  ::placeholder {
    color: ${({ theme: { colors } }) => colors.gray};
  }

  :focus {
    outline: 2px solid ${({ theme: { colors } }) => colors.blue};
  }

  :disabled {
    background-color: ${({ theme: { colors } }) => colors.lightGray};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default forwardRef(Input);
