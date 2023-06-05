import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 660px;
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

export const Image = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
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
