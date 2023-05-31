import { memo, useCallback } from 'react';

import { CloseIcon } from '../../../assets';
import { CART_LIST_CHECKBOX_KEY } from '../../../constants/store';
import { useCheckbox } from '../../../hooks/common/useCheckbox';
import { useModal } from '../../../hooks/common/useModal';
import { useCart } from '../../../hooks/useCart';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Checkbox from '../../common/Checkbox/Checkbox';
import Modal from '../../common/Modal/Modal';
import StepperButton from '../../common/StepperButton/StepperButton';
import CartItemDelete from '../CartItemDelete/CartItemDelete';
import * as S from './CartItem.styles';

interface CartItemProps extends ProductItemData {
  cartItemId: number;
  quantity: number;
}

const CartItem = ({ cartItemId, quantity, name, price, imageUrl }: CartItemProps) => {
  const { updateItemQuantity, removeItem } = useCart();
  const { isChecked, toggleItemCheckbox } = useCheckbox(CART_LIST_CHECKBOX_KEY, cartItemId);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

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
    <S.CartItemContainer>
      <Checkbox checked={isChecked} onChange={toggleItemCheckbox} />
      <S.CartItemImageWrapper>
        <S.CartItemImage src={imageUrl} alt={name} />
      </S.CartItemImageWrapper>
      <S.CartItemName>{name}</S.CartItemName>
      <StepperButton
        className="stepper-button"
        count={quantity}
        handleCountChange={handleQuantityChange}
      />
      <S.CartItemPrice>{priceFormatter(price * quantity)}</S.CartItemPrice>
      <S.CartItemDeleteButton aria-label="상품 삭제" variant="textButton" onClick={handleModalOpen}>
        <CloseIcon />
      </S.CartItemDeleteButton>
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <CartItemDelete handleModalClose={handleModalClose} removeItem={handleRemoval} />
      </Modal>
    </S.CartItemContainer>
  );
};

export default memo(CartItem);
