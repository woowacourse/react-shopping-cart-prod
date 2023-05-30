import styled from 'styled-components';

export const StepperInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid var(--color-header);
  border-radius: 5px;
`;

export const Input = styled.input<{ usedplace: string }>`
  width: ${({ usedplace }) => (usedplace === 'listPage' ? '44px' : usedplace === 'cartPage' ? '88px' : 'auto')};
  flex: 1;
  border: none;
`;

export const Button = styled.button`
  background-color: var(--color-header);
  color: var(--color-white);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(var(--color-header), 0.8);
    color: var(--color-brownish-red);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
