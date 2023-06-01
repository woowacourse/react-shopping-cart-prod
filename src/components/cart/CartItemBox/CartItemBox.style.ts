import { styled } from 'styled-components';
import { FlexWrapper } from '@pages/Cart/Cart.style';
import { theme } from '@styles/theme';

export const CartItemContainer = styled(FlexWrapper)`
  column-gap: 1rem;
  width: 100%;
  margin: 1rem;
  border-bottom: ${({ theme }) => theme.colors.secondaryColor} 1px solid;
  padding: 1rem;
  width: 95%;

  justify-content: start;
`;

export const ItemImageWrapper = styled.div`
  width: 144px;
  height: 144px;
`;

export const ItemImage = styled.img`
  height: 100%;
  aspect-ratio: 1/1;

  object-fit: cover;
`;

export const NameText = styled.p`
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.4rem;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
`;

export const ProductInfo = styled.div`
  flex: 1 1 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;

  padding-bottom: 2.4rem;
`;

export const DeleteIcon = styled.img`
  width: 18px;
  height: 18px;

  margin-bottom: 2.4rem;

  cursor: pointer;
`;

export const PriceText = styled.p`
  margin-top: 2rem;

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;

  text-align: right;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
`;
