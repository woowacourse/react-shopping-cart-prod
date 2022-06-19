import styled from '@emotion/styled/macro';

import { COLORS, LAYOUT } from 'styles/theme';

import { getPixelToRem } from 'lib/formatterUtils';

const HoverContainer = styled.div`
  position: absolute;
  z-index: 5;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  padding-top: 1rem;

  width: ${({ width }) => getPixelToRem(width)}rem;

  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${LAYOUT.BORDER_RADIUS}px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0 10px 20px ${COLORS.BLACK_005}, 0 0 5px 5px ${COLORS.BLACK_005};

  transition: transform 0.2s ease;
  transform: translateY(-30%) scale(0.7);

  min-height: ${({ minHeight }) => getPixelToRem(minHeight)}rem;
  padding: ${({ padding }) => getPixelToRem(padding)}rem;

  &::after {
    content: '';

    position: absolute;
    border-bottom: 10px solid ${COLORS.WHITE};
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    top: -10px;

    left: 50%;
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  position: relative;
  display: inline;
  overflow: visible;

  &:hover,
  & > ${HoverContainer}:hover {
    ${HoverContainer} {
      visibility: visible;
      opacity: 1;
    }

    ${ContentContainer} {
      transform: translateY(0%) scale(1);
    }
  }
`;

export { Container, ContentContainer, HoverContainer };
