import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #aaaaaa;
  color: #333333;
`;

export const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  padding: 30px;
  background: #f6f6f6;

  border-bottom: 2px solid #aaaaaa;
`;

export const OrderDate = styled.div``;

export const MoveDetailPage = styled.div`
  cursor: pointer;
`;

export const OrderItems = styled.div`
  display: grid;
  background-color: #aaaaaa;
  row-gap: 1px;
`;
