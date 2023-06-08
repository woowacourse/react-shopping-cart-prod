import { PRODUCT_LIST_SKELETON_ITEM_LENGTH } from '../../../constants/ui';
import ProductItemSkeleton from '../ProductItem/ProductItemSkeleton';
import * as S from './ProductList.styles';

const ProductListSkeleton = () => {
  return (
    <S.ListContainer>
      {Array.from({ length: PRODUCT_LIST_SKELETON_ITEM_LENGTH }, (_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </S.ListContainer>
  );
};

export default ProductListSkeleton;
