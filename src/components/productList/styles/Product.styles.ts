import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 240px;
  height: 340px;
  position: relative;

  color: #333333;

  @media (max-width: 520px) {
    width: 180px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;

  @media (max-width: 520px) {
    height: 180px;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding-top: 8px;
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
  margin: 2px 0 0 2px;
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

export const ControlBox = styled.div<{ hasCartItem: boolean }>`
  ${({ hasCartItem }) => getControlBoxStyle(hasCartItem)}
`;

const getControlBoxStyle = (hasCartItem: boolean) => {
  return hasCartItem
    ? css`
        width: 40px;
        height: 40px;
        border: 1px solid #aaaaaa;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 112px;
        right: 12px;
      `
    : css`
        width: auto;
        position: absolute;
        bottom: 112px;
        right: 50%;
        transform: translateX(50%);
      `;
};
