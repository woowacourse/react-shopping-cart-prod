import useRecoilProductList from '@hooks/useRecoilProductList';
import { Column, Row } from '@styles/style';
import ProductItem from '../ProductItem';

function ProductList() {
  const { productList } = useRecoilProductList();

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
