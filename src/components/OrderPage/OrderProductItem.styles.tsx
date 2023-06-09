import styled from 'styled-components';

export const Item = styled.li`
  display: flex;
  &:not(:last-child) {
    border-bottom: 1px solid #aaa;
  }
  padding: 4rem 2.5rem;
`;

export const ProductImg = styled.img`
  height: 140px;
  width: 140px;
`;

export const ProductInfo = styled.div`
  margin-left: 3rem;
`;

export const ProductName = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

export const ProductQuantity = styled.p`
  font-size: 2rem;
  color: #888;
`;
