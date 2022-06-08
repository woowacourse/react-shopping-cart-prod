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

export const OrderNumber = styled.p`
  margin-top: 60px;
  font-size: 20px;
  line-height: 24px;
  padding: 36px 39px;
  border-bottom: 1px solid grey;
`;

export const OrderItemContainer = styled.li`
  display: flex;
  gap: 40px;
  width: 100%;
  padding: 20px;

  -webkit-box-shadow: 1px 1.5px 3px 0px rgba(20, 24, 82, 0.27);
  box-shadow: 2px 3px 6px 0px rgba(20, 24, 82, 0.27);
`;

export const OrderDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
