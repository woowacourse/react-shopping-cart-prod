import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 30px;
  padding: 30px;
  background-color: #fcfcfc;
`;

export const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.span`
  font-size: 18px;
  margin-bottom: 20px;
  color: #333333;
  line-height: 160%;
`;

export const ProductAmount = styled.span`
  color: #888888;
`;
