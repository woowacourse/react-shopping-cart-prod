import { useProductListBy } from '@views/Product/recoil/productListState';
import { Column, Row } from '@styles/style';
import { ProductItem } from '@views/Product/components/ProductItem';
import { useServerUrl } from '@recoil/server/serverUrlState';

function ProductList() {
  const { serverUrl } = useServerUrl();
  const productList = useProductListBy(serverUrl);

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
