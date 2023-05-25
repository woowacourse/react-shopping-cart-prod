import * as S from './ProductItemList.styles';
import ProductItem from 'components/Product/ProductItem';
import { productListSelector } from 'recoil/productList';
import { useRecoilValue } from 'recoil';

const ProductItemList = () => {
  const data = useRecoilValue(productListSelector);

  const fetchedProductList =
    data &&
    data.map((product) => <ProductItem key={product.id} product={product} />);

  return <S.ProductListWrapper>{fetchedProductList}</S.ProductListWrapper>;
};

export default ProductItemList;
