import type { PropsWithChildren } from 'react';
import { createContext } from 'react';
import type React from 'react';
import styled from 'styled-components';

export const ProductDataContext = createContext({
  image: '',
  name: '',
  price: 0,
  quantity: 0,
});

interface ProductData {
  image: string;
  name: string;
  price: number;
  quantity: number;
}
interface ProductItemProps {
  productData: ProductData;
  containerStyle?: React.CSSProperties;
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
  display: flex;
  padding: 20px 20px 20px 0;
  width: 100%;

  ${({ containerStyle }) => containerStyle}
`;
