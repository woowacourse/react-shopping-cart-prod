import styled, { css } from 'styled-components';

const PriceContainer = styled.div`
  min-height: 28px;
  margin-top: 2px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-weight: 600;
  letter-spacing: -0.3px;
`;

const discountRateStyle = css`
  margin-right: ${({ theme }) => theme.spacer.spacing2};
  color: ${({ theme }) => theme.color.red};
`;

const discountedPriceStyle = css`
  margin-right: ${({ theme }) => theme.spacer.spacing2};
`;

const priceStyle = css`
  position: relative;
  top: 1px;
  color: #b1b3b5;
  font-weight: normal;
  text-decoration: line-through;
`;

export { PriceContainer, discountRateStyle, discountedPriceStyle, priceStyle };
