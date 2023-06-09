import * as S from './ProductItemList.styles';
import ProductItem from 'components/Product/ProductItem';
import { productListAtom } from 'recoil/productList';
import { useRecoilValue } from 'recoil';

const ProductItemList = () => {
  const productList = useRecoilValue(productListAtom);

  const fetchedProductList =
    productList &&
    productList.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));

  return <S.ProductListWrapper>{fetchedProductList}</S.ProductListWrapper>;
};

export default ProductItemList;
