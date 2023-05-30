import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 282px;
  height: 362px;

  color: #333333;
`;

export const Image = styled.img`
  width: 100%;
  height: 282px;
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 282px;
  padding-top: 16px;
  padding-left: 8px;
`;

export const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Name = styled.p`
  margin-top: 4px;

  font-size: 16px;
  font-weight: 400;
`;

export const Price = styled.p`
  margin-top: 10px;

  vertical-align: center;
  font-size: 20px;
  font-weight: 600;
`;

export const CartItemAddButton = styled.button`
  width: 32px;
  height: 30px;
  margin-right: 10px;

  background: transparent;

  transition: transform 0.2s;

  & > img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: rotate(12deg);
  }

  &:disabled {
    cursor: wait;
  }
  &:disabled > img {
    visibility: hidden;
  }
`;

export const ControlBox = styled.div`
  width: auto;
`;
