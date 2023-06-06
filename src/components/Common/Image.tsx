import { ImgHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { XS } from '../../constants/screenSizes';

type ImageType = 'small' | 'medium';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: ImageType;
}

const defaultImage = `${process.env.PUBLIC_URL}/images/error.png`;

const Image = ({ size, ...props }: ImageProps) => {
  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = defaultImage;
  };

  return <ImageBox size={size} onError={handleError} {...props} />;
};

const ImageStyled = {
  small: css`
    width: 144px;
    height: 144px;

    @media (max-width: ${XS}) {
      width: 80px;
      height: 80px;
      font-size: 20px;
    }
  `,
  medium: css`
    width: 282px;
    height: 282px;
  `,
};

const ImageBox = styled.img<ImageProps>`
  ${({ size }) => ImageStyled[size]}
  background-color: ${({ theme }) => theme.colors.gray200};
`;

export default Image;
