import { FlexWrapper } from '@pages/Cart/Cart.style';
import { styled } from 'styled-components';

export const CartItemContainer = styled(FlexWrapper)`
  column-gap: 1rem;
  width: 100%;
  margin: 1rem;
  border: ${({ theme }) => theme.secondaryColor} 1px solid;
  padding: 1rem;
  border-radius: 8px;
  width: 95%;

  justify-content: start;
`;

export const ItemImageWrapper = styled.div`
  width: 144px;
  height: 144px;
`;

export const ItemImage = styled.img`
  width: 90%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.large};

  object-fit: cover;
`;

export const NameText = styled.p`
  size: 2rem;
`;

export const ProductInfo = styled.div`
  flex: 1 1 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

export const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 50%;
`;

export const DeleteIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const PriceText = styled.p`
  size: 1.6rem;
`;
