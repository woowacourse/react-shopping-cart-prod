import styled from 'styled-components';
import { CartMainText, MainTextBorder } from '../CartPage/CartPage.styles.tsx';
import viewports from '../../constants/viewports.ts';

export const OrderDetailPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
`;

export const OrderDetailPageContent = styled.div`
  width: 60%;
`;

export const OrderDetailPageTitle = styled(CartMainText)``;

export const OrderDetailPageTitleBorder = styled(MainTextBorder)``;

export const PriceBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  @media screen and (max-width: ${viewports.md}) {
    justify-content: center;
  }
`;

export const PriceBoxContent = styled.div`
  width: 40%;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--color-header);
  color: var(--color-brownish-red);

  @media screen and (max-width: ${viewports.md}) {
    width: 100%;
  }
`;

export const PriceBoxHeader = styled.div`
  padding: 15px;
  text-align: center;
  background: var(--color-header);
`;

export const PriceInnerContent = styled.ul`
  padding: 0 15px;

  li {
    margin-top: 10px;

    &:nth-child(2) {
      color: rgba(0, 0, 0, 0.49);
    }
  }
`;

export const DetailPageButton = styled.button`
  margin: 10px 10px 0 0;
  padding: 10px;
  background: var(--color-header);
  border: none;
  border-radius: 16px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.04);
  }
`;
