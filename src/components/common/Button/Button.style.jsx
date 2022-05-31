import styled, { css } from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 15px;

  border: none;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colorConfig.primary};
  color: ${({ theme }) => theme.colorConfig.textWhite};
  font-size: 24px;

  cursor: pointer;

  ${({ isWithInput }) =>
    isWithInput &&
    css`
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      width: 200px;
      font-size: 20px;
    `}

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
