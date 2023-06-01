import styled from 'styled-components';

export const ItemWrapper = styled.div`
  width: 224px;
  height: 320px;
`;

export const ItemImage = styled.img`
  width: 224px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductName = styled.p`
  font: ${(props) => props.theme.font.small};
`;

export const ProductPrice = styled.p`
  font: ${(props) => props.theme.font.medium};
`;

export const SalePriceBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SalePercentage = styled.div`
  font: ${(props) => props.theme.font.small};
  color: red;
  padding-right: 10px;
`;

export const ProductOriginalPrice = styled.div`
  font: ${(props) => props.theme.font.small};
  color: gray;
  text-decoration: line-through;
`;
