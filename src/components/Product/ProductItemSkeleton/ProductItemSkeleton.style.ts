import styled from 'styled-components';

export const ProductItemBox = styled.div`
  padding: 8px;
`;

export const ProductItemImageBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProductItemImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;

  background-color: ${({ theme }) => theme.color.gray200};
`;

export const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const ProductName = styled.div`
  height: 16px;
  width: 150px;
  background-color: ${({ theme }) => theme.color.gray200};
  margin-bottom: 2px;
`;
export const ProductPrice = styled.div`
  height: 20px;
  width: 100px;
  background-color: ${({ theme }) => theme.color.gray200};
`;

export const ProductInfo = styled.div``;
