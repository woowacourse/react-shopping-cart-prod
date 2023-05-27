import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { AddIcon } from '../../../assets';
import { useCart } from '../../../hooks/useCart';
import { cartItemIdState, cartItemQuantityState } from '../../../store/cart';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import StepperButton from '../../common/StepperButton/StepperButton';
import Toast from '../../common/Toast/Toast';
import * as S from './ProductItem.styles';

type ProductItemProps = ProductItemData;

const ProductItem = ({ ...information }: ProductItemProps) => {
  const cartId = useRecoilValue(cartItemIdState(information.id));
  const cartQuantity = useRecoilValue(cartItemQuantityState(cartId!));
  const { isAdded, addItem, updateItemQuantity } = useCart();

  const handleAddButtonClick = useCallback(() => {
    addItem(information);
  }, [addItem, information]);

  const handleQuantityChange = useCallback(
    (quantity: number) => {
      updateItemQuantity({ cartItemId: cartId!, quantity });
    },
    [updateItemQuantity, cartId]
  );

  return (
    <>
      <S.ProductItemContainer>
        <S.ItemImageContainer>
          <S.ItemImage src={information.imageUrl} alt={information.name} />
          <S.ItemButtonWrapper>
            {cartId ? (
              <StepperButton count={cartQuantity} handleCountChange={handleQuantityChange} />
            ) : (
              <S.ItemButton
                type="button"
                aria-label="상품 추가"
                variant="textButton"
                onClick={handleAddButtonClick}
              >
                <AddIcon width={16} height={16} />
              </S.ItemButton>
            )}
          </S.ItemButtonWrapper>
        </S.ItemImageContainer>
        <S.ItemName size="small">{information.name}</S.ItemName>
        <S.ItemPrice size="large">{priceFormatter(information.price)}원</S.ItemPrice>
      </S.ProductItemContainer>
      {isAdded && <Toast>장바구니에 상품을 추가했습니다.</Toast>}
    </>
  );
};

export default ProductItem;
