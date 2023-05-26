import { useProductListReadOnly } from '@views/Product/recoil/productListState';
import { Column, Row } from '@styles/style';
import { ProductItem } from '@views/Product/components/ProductItem';

function ProductList() {
  const productList = useProductListReadOnly();

  return (
    <Row>
      {productList.map((product) => (
        <Column key={Math.random()}>
          <ProductItem product={product} />
        </Column>
      ))}
    </Row>
  );
}

export default ProductList;
