import * as S from './CartItem.styles';

const CartItemSkeleton = () => {
  return (
    <S.CartItemContainer>
      <S.CartItemImageWrapper className="skeleton" />
      <S.CartItemInformationContainer>
        <S.CartItemName className="skeleton" />
        <S.CartItemPriceContainer className="skeleton" />
        <S.CartItemPriceContainer className="skeleton" />
        <S.CartItemDeleteButton className="skeleton" />
      </S.CartItemInformationContainer>
    </S.CartItemContainer>
  );
};

export default CartItemSkeleton;
