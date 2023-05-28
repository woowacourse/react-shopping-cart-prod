import { useProductListReadOnly } from '@recoil/product/productListState';
import { ProductItem } from 'components/home/ProductItem';
import { Column, Row } from '@styles/style';

function ProductList() {
  const productList = useProductListReadOnly();

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
