import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Summary = styled.div`
  width: 30%;
  text-align: center;
  font-size: 30px;
  flex: 0 0 60px;
`;

export const Description = styled.p`
  width: 30%;
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
  color: #777;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
`;

export const HomeButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: ${({ theme }) => theme.color.primary};
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
`;

export const ResetButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: ${({ theme }) => theme.color.secondary};
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
`;
