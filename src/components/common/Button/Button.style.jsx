import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 15px;

  border: none;

  background-color: ${({ theme }) => theme.colorConfig.primary};
  color: ${({ theme }) => theme.colorConfig.textWhite};
  font-size: 24px;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colorConfig.secondary};

    &:hover {
      opacity: 1;
    }
  }
`;
