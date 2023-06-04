import styled from 'styled-components';

export const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 28px 0;
`;

export const EmptyOrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 60vh;
  font-size: 2rem;
`;

export const Title = styled.div`
  font-size: 20rem;
  font-weight: bold;
`;

export const Description = styled.div`
  font-size: 2rem;
`;

export const HomeButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.primary};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
