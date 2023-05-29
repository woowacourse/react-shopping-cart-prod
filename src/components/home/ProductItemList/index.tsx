import { useProductListReadOnly } from '@hooks/recoil/productList/useProductListReadOnly';
import { Column, Row } from '@styles/style';
import ProductItem from '../ProductItem';

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
