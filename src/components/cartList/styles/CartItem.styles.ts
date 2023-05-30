import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  width: 736px;
  height: 144px;

  @media (max-width: 736px) {
    width: 100%;
  }

  @media (max-width: 448px) {
    width: 100%;
    height: 112px;
  }
`;

export const Image = styled.img`
  width: 144px;
  height: 144px;

  @media (max-width: 448px) {
    width: 96px;
    height: 96px;
  }
`;

export const ProductName = styled.p`
  width: 400px;

  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;

  @media (max-width: 448px) {
    width: 24%;
    font-size: 14px;
  }
`;

export const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;

  width: 112px;
  height: 100%;
`;

export const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;

  transition: width 0.3s;

  &:hover {
    width: 40px;
  }
`;

export const Price = styled.div`
  line-height: 24px;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: #333333;
`;
