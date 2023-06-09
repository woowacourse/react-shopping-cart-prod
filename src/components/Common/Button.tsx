import styled, { css } from 'styled-components';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  designtype: 'delete' | 'order';
  buttonLabel?: string;
}

const Button = ({ designtype, buttonLabel, ...props }: ButtonProps) => {
  return (
    <ButtonBox designtype={designtype} {...props}>
      {buttonLabel}
    </ButtonBox>
  );
};

const buttonStyles = {
  delete: css`
    width: 98px;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.gray300};
  `,
  order: css`
    width: 388px;
    height: 73px;
    font-size: 24px;
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};

    @media (max-width: 420px) {
      width: 270px;
      height: 50px;
      font-size: 20px;
    }
  `,
};

const ButtonBox = styled.button<ButtonProps>`
  ${({ designtype }) => buttonStyles[designtype]}
`;

export default Button;
