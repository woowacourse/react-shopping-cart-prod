import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import styled, { CSSProp } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  css?: CSSProp;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, ...props }: Props) => {
  return (
    <S.Button type='button' {...props}>
      {children}
    </S.Button>
  );
};

const S = {
  Button: styled.button<{ css?: CSSProp }>`
    background: none;
    cursor: pointer;

    ${(props) => props.css}
  `,
};

export default Button;
