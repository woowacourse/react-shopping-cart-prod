import styled, { css } from 'styled-components';

export const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 9px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.gray_100};
  border-radius: 4px;
  font-size: 2.4em;
  color: ${({ theme }) => theme.black_50};
  outline: none;

  ${({ isError }) =>
    isError &&
    css`
      background-color: ${({ theme }) => theme.pink_50};
      border: 1px solid ${({ theme }) => theme.pink_100};
    `}
`;
