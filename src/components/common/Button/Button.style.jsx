import styled, { css } from 'styled-components';

const buttonColors = {
  default: 'primary',
  warning: 'warning',
};
export const Button = styled.button`
  width: 100%;
  padding: 15px;

  border: none;
  border-radius: 4px;

  background-color: ${({ theme, variant }) => theme.colorConfig[buttonColors[variant]]};
  color: ${({ theme }) => theme.colorConfig.textWhite};
  font-size: 20px;

  cursor: pointer;

  ${({ isWithInput }) =>
    isWithInput &&
    css`
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      width: 200px;
      font-size: 20px;
    `}

  ${({ variant }) => variant && css``}

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colorConfig.secondary};

    &:hover {
      opacity: 1;
      cursor: default;
    }
  }
`;
