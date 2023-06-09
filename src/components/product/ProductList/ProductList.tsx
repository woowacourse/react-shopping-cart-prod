import { useRecoilValue } from 'recoil';

import { productListState } from '../../../store/product';
import ProductItem from '../ProductItem/ProductItem';
import * as S from './ProductList.styles';

const ProductList = () => {
  const productList = useRecoilValue(productListState);

  return (
    <S.ListContainer>
      {productList.map((productItem) => (
        <ProductItem key={productItem.id} {...productItem} />
      ))}
    </S.ListContainer>
  );
};

export default ProductList;
