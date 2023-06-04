import type { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

import {
  ComponentVariant,
  ImageStyleProps,
  imageStyles,
} from '../../styles/component';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  variant?: ComponentVariant;
}

const Image = ({ variant = 'medium', ...props }: ImageProps) => {
  return <StyledImage {...props} variant={variant} />;
};

const StyledImage = styled.img<ImageStyleProps>`
  ${({ variant }) => imageStyles[variant]}
`;

export default Image;
