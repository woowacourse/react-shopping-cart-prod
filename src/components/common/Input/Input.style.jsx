import styled, { css } from 'styled-components';

export const Label = styled.label`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;

  font-weight: bolder;
  font-size: 20px;
`;

export const Input = styled.input`
  width: 100%;

  padding: 16px 32px;

  border-radius: 4px;
  border: ${({ theme }) => theme.colorConfig.secondary} 1px solid;

  font-size: 20px;

  ${({ isValid }) =>
    !isValid &&
    css`
      border: red 2px solid;
    `}

  &::placeholder {
    color: ${({ theme }) => theme.colorConfig.secondary};
  }

  ${({ hasButton }) =>
    hasButton &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `};
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;
