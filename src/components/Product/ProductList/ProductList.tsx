import { useRecoilValueLoadable } from 'recoil';
import { productListSelector } from '../../../recoil/productAtoms.ts';
import type { ProductItem as ProductItemType } from '../../../types/types.ts';
import ProductItem from '../ProductItem/index.tsx';
import { Col, Row } from '../../../style/style.ts';
import { ProductListWrapper } from './ProductList.style.ts';
import ProductItemSkeleton from '../ProductItemSkeleton/index.tsx';

function ProductList() {
  const productLoadable = useRecoilValueLoadable<ProductItemType[]>(productListSelector);

  switch (productLoadable.state) {
    case 'hasValue':
      return (
        <ProductListWrapper>
          <Row>
            {productLoadable?.contents?.map((product: ProductItemType) => (
              <Col key={product.id}>
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
        </ProductListWrapper>
      );
    case 'loading':
      return (
        <ProductListWrapper>
          <Row>
            {Array.from({ length: 30 }).map((_, i) => (
              <Col key={i}>
                <ProductItemSkeleton />
              </Col>
            ))}
          </Row>
        </ProductListWrapper>
      );
    case 'hasError':
      throw productLoadable?.contents?.message;
    default:
      return null;
  }
}

export default ProductList;
