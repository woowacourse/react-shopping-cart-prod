import type { PropsWithChildren } from 'react';
import type React from 'react';
import { useContext, createContext } from 'react';
import styled from 'styled-components';

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

interface ItemStyle {
  style?: React.CSSProperties;
}

export const Image = ({ style }: ItemStyle) => {
  const { image } = useContext(ProductDataContext);

  return <ProductImage style={style} src={image} alt={image} />;
};

const ProductImage = styled.img<{ style: any }>`
  height: 100px;
  width: 100px;

  ${({ style }) => style}
`;

export const Name = ({ style }: ItemStyle) => {
  const { name } = useContext(ProductDataContext);

  return <ProductName style={style}>{name}</ProductName>;
};

const ProductName = styled.strong<{ style: any }>`
  ${({ theme }) => theme.fonts.description}
  ${({ style }) => style}
`;

export const Price = ({ style }: ItemStyle) => {
  const { price } = useContext(ProductDataContext);

  return <ProductPrice style={style}>{price.toLocaleString()}원</ProductPrice>;
};

const ProductPrice = styled.strong<{ style: any }>`
  ${({ theme }) => theme.fonts.description}
  ${({ style }) => style}
`;

export const Quantity = ({ style }: ItemStyle) => {
  const { quantity } = useContext(ProductDataContext);

  return <ProductQuantity style={style}>{quantity}개</ProductQuantity>;
};

const ProductQuantity = styled.strong<{ style: any }>`
  ${({ theme }) => theme.fonts.description}
  ${({ style }) => style}
`;
