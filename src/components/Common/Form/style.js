import styled, { keyframes } from 'styled-components';
const popUp = keyframes`
   100% {
    transform: translateY(-20%);
   }
`;

export const Form = styled.form`
  width: 50%;
  min-width: 300px;
  max-width: 400px;
  height: auto;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid ${({ theme }) => theme.COLOR.CYAN_300};
  border-radius: 10px;
  box-shadow: 0px 0px 14px -3px rgba(0, 0, 0, 0.2);
  padding: 30px;

  transform: translateY(100%);
  animation: ${popUp} 0.8s ease forwards;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.FONT.PRIMARY};
  color: ${({ theme }) => theme.COLOR.CYAN_300};
`;
