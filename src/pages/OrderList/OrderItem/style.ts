import styled from 'styled-components';

export const Container = styled.li`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  column-gap: 20px;

  background-color: #ffffff;
  padding: 39px 20px;

  border: 1px solid #aaaaaa;
  border-top: none;
`;

export const ShoppingItemImage = styled.img`
  width: 141px;
  height: 141px;
  object-fit: cover;
  font-size: 20px;
  line-height: 24px;
`;

export const ShoppingItemName = styled.div`
  color: #333333;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
`;

export const PriceAndQuantity = styled.div`
  margin-top: 20px;

  color: #888888;
  font-weight: 400;
`;
