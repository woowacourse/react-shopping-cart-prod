import styled from 'styled-components';

export const OrderListWrapper = styled.ul`
  margin-bottom: 48px;
`;

export const OrderListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 92px;
  padding: 0 20px;
  background: #f6f6f6;
  font: ${(props) => props.theme.font.small};
`;
