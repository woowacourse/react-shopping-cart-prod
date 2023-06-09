import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 28px 0;
`;

export const OrderItemList = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray400};
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 28px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.color.gray100};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
`;

export const DetailButton = styled.button`
  font-size: 18px;
  cursor: pointer;
`;
