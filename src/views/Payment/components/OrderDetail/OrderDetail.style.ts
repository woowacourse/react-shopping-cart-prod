import {styled} from "styled-components";

export const OrderWrapper = styled.div`
  text-align: right;
`;

export const ContentText = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0.5rem;
`;

export const CouponText = styled(ContentText)<{ info?: boolean }>`
  color: ${({ theme, info }) => (info ? theme.infoColor : theme.secondaryColor)};
  font-weight: ${({ info }) => (info ? 800 : 400)};
`;
