import { memo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { CloseIcon } from '../../../assets/svg';
import { useModal } from '../../../hooks/common/useModal';
import { useCart } from '../../../hooks/useCart';
import { useCartCheckbox } from '../../../hooks/useCartCheckbox';
import { checkedCartItemState } from '../../../store/cartCheckbox';
import type { ProductItemData } from '../../../types/product';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import Checkbox from '../../common/Checkbox/Checkbox';
import Modal from '../../common/Modal/Modal';
import StepperButton from '../../common/StepperButton/StepperButton';
import { Text } from '../../common/Text/Text.styles';
import CartItemDelete from '../CartItemDelete/CartItemDelete';
import * as S from './CartItem.styles';

interface CartItemProps extends ProductItemData {
  cartItemId: number;
  quantity: number;
}

const CartItem = ({
  cartItemId,
  quantity,
  name,
  price,
  discountRate,
  discountedPrice,
  imageUrl,
}: CartItemProps) => {
  const isChecked = useRecoilValue(checkedCartItemState(cartItemId));
  const { updateItemQuantity, removeItem } = useCart();
  const { toggleItemCheckbox } = useCartCheckbox();
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const onCheckboxChange = useCallback(() => {
    toggleItemCheckbox(cartItemId);
  }, [cartItemId, toggleItemCheckbox]);

  const handleQuantityChange = useCallback(
    (quantity: number) => {
      updateItemQuantity({ cartItemId, quantity });
    },
    [updateItemQuantity, cartItemId]
  );

  const handleRemoval = useCallback(() => {
    handleModalClose();
    removeItem(cartItemId);
  }, [cartItemId, handleModalClose, removeItem]);

  return (
    <S.ItemContainer>
      <Checkbox checked={isChecked} onChange={onCheckboxChange} />
      <S.ImageWrapper>
        <S.ItemImage src={imageUrl} alt={name} />
      </S.ImageWrapper>
      <S.ItemContent>
        <Text css={S.nameStyle}>{name}</Text>
        <StepperButton
          className="stepper-button"
          count={quantity}
          handleCountChange={handleQuantityChange}
        />
        <S.PriceContainer>
          <Text className="medium">{priceFormatter(discountedPrice * quantity)}원</Text>
          {discountRate > 0 && (
            <Text css={S.originalPriceStyle} size="small">
              {priceFormatter(price * quantity)}원
            </Text>
          )}
        </S.PriceContainer>
        <Button
          css={S.buttonStyle}
          aria-label="상품 삭제"
          variant="textButton"
          onClick={handleModalOpen}
        >
          <CloseIcon />
        </Button>
      </S.ItemContent>
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <CartItemDelete handleModalClose={handleModalClose} removeItem={handleRemoval} />
      </Modal>
    </S.ItemContainer>
  );
};

export default memo(CartItem);
