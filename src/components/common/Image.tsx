import { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export default function Image(props: ImageProps) {
  const setAltSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = './emptyProduct.svg';
  };

  return <img src={props.src} alt={props.alt || '이미지'} onError={setAltSrc} />;
}
