import styled from 'styled-components';

export const OrderListWrapper = styled.ul`
  border-radius: 16px;
  overflow: hidden;
  color: var(--color-brownish-red);
`;

export const OrderListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: var(--color-header);
`;

export const OrderDetailButton = styled.button`
  border: none;
  background: inherit;
`;

export const OrderList = styled.li`
  display: flex;
  padding: 10px;
  border: 2px solid var(--color-header);
  border-top: none;
`;

export const OrderListImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 16px;
`;

export const OrderListContent = styled.div`
  padding: 5px;
`;

export const OrderQuantity = styled.p`
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.42);
  font-size: 13px;
`;
