import { Button } from '@common/Button';
import { FlexColWrapper, FlexWrapper } from '@pages/CartPage/CartPage.style';
import { styled } from 'styled-components';

export const PayingContainer = styled.div`
  display: flex;
  flex: 1 1 150px;
  align-items: start;
  justify-content: start;
`;

export const PayingBox = styled(FlexColWrapper)`
  column-gap: 1rem;
  width: 90%;
  margin: 1rem;

  color: ${({ theme }) => theme.primaryColor};

  /* padding: 2rem 1.5rem; */
  justify-content: start;
`;

export const PayingBackground = styled.div`
  border: ${({ theme }) => theme.grayBorderColor} 1px solid;
  padding: 1rem;

  margin: 0 0 2rem 0;
`;

export const CouponContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  background-color: ${({ theme }) => theme.grayColor};
`;

export const CouponTitleWrapper = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;

  font-weight: 700;
  padding: 1rem;
`;

export const CouponTitle = styled.span`
  padding-left: 1rem;
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 20px;
`;

export const ContentText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem;
`;

export const CouponText = styled(ContentText)<{ info?: boolean }>`
  color: ${({ theme, info }) => (info ? theme.infoColor : theme.secondaryColor)};
  font-weight: ${({ info }) => (info ? 800 : 400)};
`;

export const TotalText = styled(ContentText)`
  font-size: 1.7rem;
  font-weight: 800;
`;

export const TotalPriceContainer = styled(FlexWrapper)`
  border-top: ${({ theme }) => theme.primaryColor} 2px solid;
  padding-top: 0.5rem;
  color: ${({ theme }) => theme.primaryColor};
`;

export const CouponButton = styled(Button)`
  margin-top: 1rem;
`;
