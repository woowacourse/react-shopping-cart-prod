import styled from 'styled-components';

export const CartItemCardBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CartItemCardInformationBox = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ImageBox = styled.div`
  aspect-ratio: 1 / 1;
  overflow: hidden;
  min-width: 144px;
  height: 144px;

  img {
    width: 100%;
  }
`;

export const CartItemCardControlBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: fit-content;
  align-self: flex-end;
`;
