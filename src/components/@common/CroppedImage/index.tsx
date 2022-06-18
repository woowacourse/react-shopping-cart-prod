import { Styled } from './styles';

interface CroppedImageProps {
  src: string;
  width: string;
  height: string;
  alt: string;
}

const CroppedImage = ({ src, width, height, alt }: CroppedImageProps) => {
  return (
    <Styled.ImageWrapper width={width} height={height}>
      <Styled.Image src={src} alt={alt}></Styled.Image>
    </Styled.ImageWrapper>
  );
};

export default CroppedImage;
