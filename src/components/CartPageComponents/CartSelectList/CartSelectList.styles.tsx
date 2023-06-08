import styled from 'styled-components';
import VIEWPORTS from '../../../constants/VIEWPORTS.ts';
import { ButtonWithHoverScalingEffect } from '../../../styles/CommonStyles.tsx';

export const CartSelectListWrapper = styled.div`
  width: 60%;
  margin: 30px 0;

  @media screen and (max-width: ${VIEWPORTS.md}) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const CartQuantityText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  color: var(--color-brownish-red);

  @media screen and (max-width: ${VIEWPORTS.sm}) {
    font-size: 18px;
    line-height: 28px;
  }
`;
export const CartQuantityDivider = styled.hr`
  width: 100%;
  height: 3.3px;
  border: none;
  border-radius: 10px;

  background: linear-gradient(90deg, transparent, var(--color-header), transparent);
  background-size: 200% 200%;
`;

export const SelectAllButton = styled(ButtonWithHoverScalingEffect)`
  padding: 10px 30px;
  margin-right: 10px;
  border: none;
  background: var(--color-header);
  font-size: 16px;
  font-weight: 500;
  background: var(--color-header);
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  outline: none;
  overflow: hidden;
  position: relative;

  &:hover {
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
  }
`;
