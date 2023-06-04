import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

interface WrapperProps extends Props {
  loaded: boolean;
}

export default function Image(props: Props) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  const setAltImgSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/emptyProduct.svg';
  };

  return <Wrapper {...props} onError={setAltImgSrc} onLoad={onLoad} loaded={loaded} />;
}

const skeletonBackground = keyframes`
  0%    { background-color: rgba(165, 165, 165, 0.1) }
  50%   { background-color: rgba(165, 165, 165, 0.3) }
  100%  { background-color: rgba(165, 165, 165, 0.2) }
`;

const Wrapper = styled.img<WrapperProps>`
  width: 100%;
  height: 100%;

  animation: ${skeletonBackground} 1s infinite;
  ${({ loaded }) => (loaded ? 'animation: none;' : '')}

  object-fit: cover;
`;
