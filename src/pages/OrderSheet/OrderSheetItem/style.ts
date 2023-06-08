import styled from 'styled-components';

export const Container = styled.li`
  display: grid;
  background-color: #cccccc;
  row-gap: 1px;
  border: 1px solid #cccccc;
  border-radius: 10px;
`;

export const DeliveryInfo = styled.div`
  font-size: 14px;
  background-color: #fcfcfc;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7f8082;
  color: #ffffff;

  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const ExpectArrive = styled.span``;

export const DeliveryType = styled.div`
  background-color: #ffffff;
  color: #333333;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
`;

export const ProductInfo = styled.div`
  background-color: #fcfcfc;
  padding: 20px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;

  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const ProductWrapper = styled.div`
  display: grid;
  row-gap: 10px;
`;

export const ProductName = styled.span`
  font-weight: 600;
`;

export const ProductQuantity = styled.span`
  color: #7f8082;
`;

export const ProductPrice = styled.span`
  font-weight: 600;
`;
