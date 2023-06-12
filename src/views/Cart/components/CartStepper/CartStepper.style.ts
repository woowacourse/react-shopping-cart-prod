import styled from 'styled-components';

export const StepperContainer = styled.div`
  display: flex;
  align-items: start;
`;

export const CartIcon = styled.button`
  width: 4rem;
  height: 4rem;
  border: ${({ theme }) => theme.secondaryColor} solid 1px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.lightColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
