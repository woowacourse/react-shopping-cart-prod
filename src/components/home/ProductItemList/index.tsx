import { useRecoilValue } from 'recoil';
import { productListState } from '@recoil/product/productListState';
import { Column, Row } from '@styles/style';
import ProductItem from '../ProductItem';

function ProductList() {
  const productList = useRecoilValue(productListState);

  return (
    <Row>
      {productList.map((product) => (
        <Column key={product.id}>
          <ProductItem product={product} />
        </Column>
      ))}
    </Row>
  );
}

export default ProductList;
