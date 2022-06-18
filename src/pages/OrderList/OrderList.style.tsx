import styled from 'styled-components';

export const Container = styled.div`
  min-width: ${({ theme }) => theme.minWidth};
`;

export const Title = styled.h1`
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.blackColor_1};

  font-weight: bold;
  line-height: 1.8;
`;

export const OrderDetailsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
  padding: 36px;
`;
