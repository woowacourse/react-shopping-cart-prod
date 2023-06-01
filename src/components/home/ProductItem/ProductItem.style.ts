import { styled } from 'styled-components';

export const ProductItemBox = styled.div`
  padding: 8px;
`;

export const ProductItemImage = styled.img`
  aspect-ratio: 1/1;

  object-fit: cover;
`;

export const ProductDetails = styled.div`
  display: flex;

  margin-top: 1.8rem;
`;

export const ProductName = styled.div`
  width: 100%;

  font-weight: 400;
  font-size: 1.6rem;
  letter-spacing: 0.5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProductPrice = styled.div`
  margin: 0.5rem 0;

  font-weight: 400;
  font-size: 2rem;
  letter-spacing: 0.5px;
`;

export const ProductInfo = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
