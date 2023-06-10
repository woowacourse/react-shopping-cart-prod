import { ProductItem } from "@views/Product/components/ProductItem";
import { useProductList } from "@views/Product/recoil/productListState";
import { Column, Row } from "@styles/style";

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
