import type { PropsWithChildren } from 'react';
import { useContext, createContext } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';

const ProductDataContext = createContext({
  image: '',
  name: '',
  price: 0,
  quantity: 0,
});

interface ProductItemProps {
  productData: any;
  containerStyle: any;
}

export const ItemContainer = (props: PropsWithChildren<ProductItemProps>) => {
  const { children, productData, containerStyle } = props;

  return (
    <ProductItemContainer containerStyle={containerStyle}>
      <ProductDataContext.Provider value={productData}>{children}</ProductDataContext.Provider>
    </ProductItemContainer>
  );
};

const ProductItemContainer = styled.section<{ containerStyle: any }>`
  ${({ containerStyle }) => containerStyle}
`;

export const Image = ({ imageStyle }: any) => {
  const { image } = useContext(ProductDataContext);

  return <ProductImage imageStyle={imageStyle} src={image} alt={image} />;
};

const ProductImage = styled.img<{ imageStyle: any }>`
  ${({ imageStyle }) => imageStyle}
`;

export const Name = ({ fontStyle }: any) => {
  const { name } = useContext(ProductDataContext);

  return <ProductName fontStyle={fontStyle}>{name}</ProductName>;
};

const ProductName = styled.strong<{ fontStyle: any }>`
  ${({ theme, fontStyle }) => theme.fonts[fontStyle]}
`;

export const Price = ({ fontStyle }: any) => {
  const { price } = useContext(ProductDataContext);

  return <ProductPrice fontStyle={fontStyle}>{price}</ProductPrice>;
};

const ProductPrice = styled.strong<{ fontStyle: any }>`
  ${({ theme, fontStyle }) => theme.fonts[fontStyle]}
`;

export const Quantity = ({ fontStyle }: any) => {
  const { quantity } = useContext(ProductDataContext);

  return <ProductQuantity fontStyle={fontStyle}>{quantity}</ProductQuantity>;
};

const ProductQuantity = styled.strong<{ fontStyle: any }>`
  ${({ theme, fontStyle }) => theme.fonts[fontStyle]}
`;
