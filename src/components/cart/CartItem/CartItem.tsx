import { memo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { CloseIcon } from '../../../assets/svg';
import { useModal } from '../../../hooks/common/useModal';
import { useCart } from '../../../hooks/useCart';
import { useCartCheckbox } from '../../../hooks/useCartCheckbox';
import { checkedCartItemState } from '../../../store/cartCheckbox';
import { ProductItemData } from '../../../types/product';
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
    <S.CartItemContainer>
      <Checkbox checked={isChecked} onChange={onCheckboxChange} />
      <S.CartItemImageWrapper>
        <S.CartItemImage src={imageUrl} alt={name} />
      </S.CartItemImageWrapper>
      <S.CartItemInformationContainer>
        <S.CartItemName>{name}</S.CartItemName>
        <StepperButton
          className="stepper-button"
          count={quantity}
          handleCountChange={handleQuantityChange}
        />
        <S.CartItemPriceContainer>
          <S.CustomerPrice>{priceFormatter(discountedPrice)}원</S.CustomerPrice>
          {discountRate > 0 && (
            <S.OriginalPrice size="small">{priceFormatter(price)}원</S.OriginalPrice>
          )}
        </S.CartItemPriceContainer>
        <S.CartItemDeleteButton
          aria-label="상품 삭제"
          variant="textButton"
          onClick={handleModalOpen}
        >
          <CloseIcon />
        </S.CartItemDeleteButton>
      </S.CartItemInformationContainer>
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <CartItemDelete handleModalClose={handleModalClose} removeItem={handleRemoval} />
      </Modal>
    </S.CartItemContainer>
  );
};

export default memo(CartItem);
