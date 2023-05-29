import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 30px;
`;

export const ProductImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  color: #333333;
`;

export const ProductAmount = styled.div`
  color: #888888;
`;
