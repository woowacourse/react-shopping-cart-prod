import { Text } from '../../common/Text/Text.styles';
import * as S from './ProductItem.styles';

const ProductItemSkeleton = () => {
  return (
    <S.ItemContainer>
      <S.ItemImageContainer className="skeleton" />
      <Text css={S.nameStyle} className="skeleton" />
      <Text css={S.nameStyle} className="skeleton" />
    </S.ItemContainer>
  );
};

export default ProductItemSkeleton;
