import { styled } from 'styled-components';
import { FlexColWrapper, FlexWrapper } from '@pages/Cart/Cart.style';

export const CartWrapper = styled(FlexColWrapper)`
  flex: 2;
`;

export const CartItemListContainer = styled(FlexWrapper)`
  column-gap: 1rem;
  width: 100%;
  margin: 1rem;
  border: ${({ theme }) => theme.colors.lightColor} 1px solid;
  padding: 1rem;
  border-radius: 8px;
  justify-content: start;
  align-items: center;
`;

export const DeleteCheckBox = styled.button`
  padding: 0.5rem 1.8rem;

  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.1rem;

  color: ${({ theme }) => theme.colors.primaryColor};
  border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
`;

export const CheckAllSpan = styled.span`
  font-size: 1.6rem;
  width: 12rem;
`;
