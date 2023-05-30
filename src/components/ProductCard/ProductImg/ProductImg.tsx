import { memo } from 'react';
import styled from 'styled-components';

interface ProductImgProps {
  imageUrl: string;
}

const ProductImg = ({ imageUrl }: ProductImgProps) => {
  return <Img src={imageUrl} />;
};

const Img = styled.img`
  width: 100%;
`;

export default memo(ProductImg);
