import { styled } from 'styled-components';

export const OrdersList = styled.ul``;

export const OrderBox = styled.div`
  border: 1px solid var(--grey-300);
  border-radius: 8px;

  overflow: hidden;

  font-size: 13px;

  & > * {
    padding: 20px 24px;
  }
`;

export const OrderBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--grey-200);

  border-bottom: 3px solid var(--grey-300);
`;

export const OrderItem = styled.div`
  display: flex;

  height: 180px;

  &:not(:last-child) {
    border-bottom: 2px solid var(--grey-300);
  }
`;

export const ProductImage = styled.div`
  width: 120px;
  height: 120px;

  margin-right: 30px;

  background-color: var(--grey-300);
`;

export const OrderInfo = styled.div`
  height: fit-content;
`;

export const ProductName = styled.div`
  font-size: 15px;

  padding-top: 3px;

  margin-bottom: 25px;
`;

export const TotalPriceWithQuantity = styled.div`
  opacity: 0.5;
`;
