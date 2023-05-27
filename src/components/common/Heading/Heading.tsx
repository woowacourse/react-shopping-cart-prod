import { PropsWithChildren } from 'react';

import * as S from './Heading.styles';

export interface HeadingProps extends PropsWithChildren {
  size?: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge';
}

const HEADING_TAG_BY_SIZE = {
  xxLarge: 'h1',
  xLarge: 'h2',
  large: 'h3',
  medium: 'h4',
  small: 'h5',
  xSmall: 'h6',
} as const;

const Heading = ({ size = 'medium', children }: HeadingProps) => {
  const tag = HEADING_TAG_BY_SIZE[size];

  return (
    <S.Heading as={tag} size={size}>
      {children}
    </S.Heading>
  );
};

export default Heading;
