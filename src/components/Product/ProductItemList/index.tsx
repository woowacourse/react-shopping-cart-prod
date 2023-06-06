import * as S from './ProductItemList.styles';
import ProductItem from 'components/Product/ProductItem';
import { productListSelector } from 'recoil/productList';
import { useRecoilValue } from 'recoil';
import { useFetchCart } from 'components/Cart/hooks/useFetchCart';

const ProductItemList = () => {
  const data = useRecoilValue(productListSelector);
  const { cartList } = useFetchCart();

  const fetchedProductList =
    data &&
    data.map((product) => (
      <ProductItem key={product.id} cartList={cartList} product={product} />
    ));

  return <S.ProductListWrapper>{fetchedProductList}</S.ProductListWrapper>;
};

export default ProductItemList;
