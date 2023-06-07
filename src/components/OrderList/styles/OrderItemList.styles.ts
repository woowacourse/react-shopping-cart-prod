import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

export const OrderIdTitle = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  background-color: #f6f6f6;
  border: 1px solid #aaaaaa;
  font-size: 18px;
`;

export const ImageWrapper = styled.div`
  & > img {
    width: 140px;
    height: 140px;
    object-fit: cover;
  }
`;

export const OrderDetail = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  border: 1px solid #aaaaaa;
  font-size: 16px;
  padding: 0 20px;

  div:nth-of-type(1) {
    margin-right: 40px;
  }
`;

export const ItemNameText = styled.p`
  font-size: 20px;
  margin-bottom: 12px;
`;

export const ItemCountText = styled.p`
  margin-bottom: 28px;
  color: #aaaaaa;
`;

export const ItemPriceText = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
`;
