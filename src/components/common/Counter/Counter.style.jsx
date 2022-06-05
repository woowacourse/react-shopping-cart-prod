import styled from 'styled-components';

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, disabled }) =>
      disabled ? theme.colorConfig.secondary : theme.colorConfig.primary};
  color: ${({ theme, disabled }) => disabled && theme.colorConfig.secondary};
`;

export const CounterButton = styled.button`
  width: 30px;
  background-color: transparent;
  font-weight: bold;
  padding: 10px;
  border: none;
  cursor: ${({ disabled }) => !disabled && 'pointer'};

  &:hover {
    opacity: ${({ disabled }) => !disabled && '0.5'};
  }
`;

export const Count = styled.p`
  padding: 10px;
`;
