import { Product } from 'types';

import ProductCard from 'components/ProductCard/ProductCard';
import * as S from 'components/ProductCardGrid/ProductCardGrid.styled';

type Props = {
  productList: Array<Product>;
};

function ProductCardGrid({ productList }: Props) {
  return (
    <S.ProductCardGridBox>
      {productList.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </S.ProductCardGridBox>
  );
}

export default ProductCardGrid;
