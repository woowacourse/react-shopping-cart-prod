import { styled } from 'styled-components';

export const OrderItem = styled.div`
  display: flex;

  height: 180px;

  &:not(:last-child) {
    border-bottom: 2px solid var(--grey-300);
  }
`;

export const ProductImage = styled.div<{ path: string }>`
  width: 120px;
  height: 120px;

  margin-right: 30px;

  background-color: var(--grey-300);

  background-image: ${(props) => `url(${props.path})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  border-radius: 4px;
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
