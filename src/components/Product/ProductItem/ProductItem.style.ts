import styled from 'styled-components';

export const ProductItemBox = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    border: 1px ${({ theme }) => theme.color.blue400} solid;
    transform: translate3d(0, -3px, 0);
    transition-duration: 0.3s;
    box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
  }
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
  font-size: 16px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ProductPrice = styled.div`
  margin-top: 8px;
  font-size: 20px;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const CartCountWrapper = styled.div`
  flex: 0 0 26px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.green100};
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const CartCount = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.white};
`;
