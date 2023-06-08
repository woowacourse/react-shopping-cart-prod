import styled from 'styled-components';
import VIEWPORTS from '../../../constants/VIEWPORTS.ts';
import { ButtonWithHoverScalingEffect } from '../../../styles/CommonStyles.tsx';

export const CartPriceBoxWrapper = styled.div`
  width: calc(28%- 100px);
  margin-top: 75px;

  @media screen and (max-width: ${VIEWPORTS.md}) {
    width: 100%;
    margin: 30px 0;
  }
`;

export const CartPriceBoxContent = styled.div`
  position: fixed;
  width: 30%;
  border: 2.3px solid var(--color-header);
  border-radius: 20px;

  @media screen and (max-width: ${VIEWPORTS.md}) {
    width: 100%;
    position: static;
    border: none;
    padding: 0 20px;
  }
`;

export const CartPriceBoxContentTitle = styled.h3`
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
  padding: 35px 0 35px 30px;
  color: var(--color-brownish-red);

  @media screen and (max-width: ${VIEWPORTS.md}) {
    padding: 20px 0;
    text-align: center;
  }
`;

export const CartPriceTextWrapper = styled.div`
  padding: 35px 30px;

  @media screen and (max-width: ${VIEWPORTS.sm}) {
    padding: 20px 0;
  }
`;

export const PriceTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CartPriceBoxDivider = styled.hr`
  border: 1.3px solid var(--color-header);
`;

export const CartPriceText = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 19px;
  color: var(--color-brownish-red);
`;

export const OrderButton = styled(ButtonWithHoverScalingEffect)`
  width: 100%;
  height: 59px;
  border: none;
  background-color: var(--color-header);

  @media screen and (max-width: ${VIEWPORTS.sm}) {
    height: 50px;
  }
`;

export const ToolText = styled(CartPriceText)`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.66);
`;
