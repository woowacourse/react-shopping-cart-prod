import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { AddIcon } from '../../../assets/svg';
import { useCart } from '../../../hooks/useCart';
import { cartItemIdState, cartItemQuantityState } from '../../../store/cart';
import type { ProductItemData } from '../../../types/product';
import Button from '../../common/Button/Button';
import StepperButton from '../../common/StepperButton/StepperButton';
import { Text } from '../../common/Text/Text.styles';
import Toast from '../../common/Toast/Toast';
import Price from './Price/Price';
import * as S from './ProductItem.styles';

type ProductItemProps = ProductItemData;

const ProductItem = ({ ...information }: ProductItemProps) => {
  const cartId = useRecoilValue(cartItemIdState(information.id));
  const cartQuantity = useRecoilValue(cartItemQuantityState(cartId!));
  const { isToastAdded, addItem, updateItemQuantity } = useCart();

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
      <S.ItemContainer>
        <S.ItemImageContainer>
          <S.ItemImage src={information.imageUrl} alt={information.name} />
          <S.ItemButtonWrapper>
            {cartId ? (
              <StepperButton
                aria-label="상품 추가"
                count={cartQuantity}
                handleCountChange={handleQuantityChange}
              />
            ) : (
              <Button
                css={S.buttonStyle}
                type="button"
                aria-label="상품 추가"
                variant="textButton"
                onClick={handleAddButtonClick}
              >
                <AddIcon width={16} height={16} />
              </Button>
            )}
          </S.ItemButtonWrapper>
        </S.ItemImageContainer>
        <Text css={S.nameStyle} size="small">
          {information.name}
        </Text>
        <Price
          price={information.price}
          discountRate={information.discountRate}
          discountedPrice={information.discountedPrice}
        />
      </S.ItemContainer>
      {isToastAdded && <Toast>장바구니에 상품을 추가했습니다.</Toast>}
    </>
  );
};

export default ProductItem;
