import type { PropsWithChildren } from 'react';
import type { CSSProp } from 'styled-components';

import * as S from './Heading.styles';

export interface HeadingProps extends PropsWithChildren {
  size?: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge';
  css?: CSSProp;
}

const HEADING_TAG_BY_SIZE = {
  xxLarge: 'h1',
  xLarge: 'h2',
  large: 'h3',
  medium: 'h4',
  small: 'h5',
  xSmall: 'h6',
} as const;

const Heading = ({ size = 'medium', children, ...attributes }: HeadingProps) => {
  const tag = HEADING_TAG_BY_SIZE[size];

  return (
    <S.Heading as={tag} size={size} className="heading" {...attributes}>
      {children}
    </S.Heading>
  );
};

export default Heading;
