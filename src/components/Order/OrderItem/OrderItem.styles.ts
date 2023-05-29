import styled from 'styled-components';

export const OrderItemWrapper = styled.li`
  display: flex;
  padding: 16px;
`;

export const OrderItemImage = styled.img`
  width: 142px;
  height: 142px;
`;

export const OrderInfoWrapper = styled.div`
  margin-left: 32px;
`;

export const OrderProductName = styled.p`
  margin-bottom: 16px;
  font: ${(props) => props.theme.font.medium};
`;

export const PriceQuantityWrapper = styled.div`
  display: flex;
`;

export const OrderPrice = styled.p`
  font: ${(props) => props.theme.font.small};
  color: ${(props) => props.theme.color.gray};
`;

export const OrderQuantity = styled.p`
  font: ${(props) => props.theme.font.small};
  color: ${(props) => props.theme.color.gray};
`;
