import { ReactNode } from 'react';

import styled from 'styled-components';
import { getCommaAddedNumber } from '../../../utils/number';

interface CaptionContainerProps {
  title: string;
  price?: number;
  marginBottom: number;
  children?: ReactNode;
  isMobile?: boolean;
}

export const CaptionContainer = ({
  title,
  price,
  marginBottom,
  children,
  isMobile,
}: CaptionContainerProps) => {
  return (
    <Style.Container $margin={marginBottom} $isMobile={isMobile ?? false}>
      <Style.Caption>{title}</Style.Caption>
      {children ? (
        children
      ) : (
        <Style.Caption $color="black" $isPrice={true}>
          {getCommaAddedNumber(price ?? 0)}원
        </Style.Caption>
      )}
    </Style.Container>
  );
};

const Style = {
  Container: styled.div<{ $margin: number; $isMobile: boolean }>`
    width: ${(props) => (props.$isMobile ? '90vw' : '388px')};
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: ${(props) => props.$margin}px;
  `,
  Caption: styled.span<{ $color?: string; $isPrice?: boolean }>`
    color: ${(props) => (props.$color ? props.$color : `#747474`)};

    font-size: ${(props) => (props.$isPrice === true ? 25 : 18)}px;
  `,
};
