import { Column, Row } from '@styles/style';
import { ProductItem } from '@views/Product/components/ProductItem';
import { useProductList } from '@views/Product/recoil/productListState';

function ProductList() {
  const productList = useProductList();

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
