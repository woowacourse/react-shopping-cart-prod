import styled, { css } from 'styled-components';

import { ButtonHTMLAttributes } from 'react';
import { XS } from '../../constants/screenSizes';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  designType: 'delete' | 'order';
  buttonLabel?: string;
}

const Button = ({ designType, buttonLabel, ...props }: ButtonProps) => {
  return (
    <ButtonBox designType={designType} {...props}>
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
    height: 63px;
    font-size: 20px;
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};

    @media (max-width: ${XS}) {
      width: 270px;
      height: 50px;
      font-size: 18px;
    }
  `,
};

const ButtonBox = styled.button<ButtonProps>`
  ${({ designType }) => buttonStyles[designType]}
`;

export default Button;
