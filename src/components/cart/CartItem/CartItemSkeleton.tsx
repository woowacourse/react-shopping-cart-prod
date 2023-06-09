import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartItem.styles';

const CartItemSkeleton = () => {
  return (
    <S.ItemContainer>
      <S.ImageWrapper className="skeleton" />
      <S.ItemContent>
        <Text css={S.nameStyle} className="skeleton" />
        <S.PriceContainer className="skeleton" />
        <S.PriceContainer className="skeleton" />
        <Button css={S.buttonStyle} className="skeleton" />
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export default CartItemSkeleton;
