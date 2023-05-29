import CheckBox from 'components/@common/CheckBox/CheckBox';
import FlexBox from 'components/@common/FlexBox';
import useModal from 'components/@common/Modal/hooks/useModal';
import CartProductCardList from './CartProductCardList/CartProductCardList';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import useCartCheckBox from 'hooks/useCartCheckBox';
import useShoppingCart from 'hooks/useShoppingCart';
import styled from 'styled-components';

const CartProductSection = () => {
  const { checkedCartProductIds, isAllChecked, toggleCheckAllBox } = useCartCheckBox();
  const { deleteCheckedCartProducts } = useShoppingCart();
  const { isModalOpen, openModal, closeModal } = useModal();

  const checkBoxLabel = isAllChecked ? '선택해제' : '전체선택';
  const isCheckedProductExist = checkedCartProductIds.size > 0;

  return (
    <ProductSection flexDirection="column" align="flex-start">
      <CheckBoxTab justify="space-between" align="flex-end">
        <CheckBox checked={isAllChecked} onChange={toggleCheckAllBox}>
          {checkBoxLabel}
        </CheckBox>
        <CheckedProductDeleteButton onClick={openModal} isActive={isCheckedProductExist}>
          선택 삭제
        </CheckedProductDeleteButton>
        <ConfirmModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          onClickConfirmButton={() => deleteCheckedCartProducts(checkedCartProductIds)}
        >
          {`선택한 ${checkedCartProductIds.size}개의 상품을 삭제하시겠습니까?`}
        </ConfirmModal>
      </CheckBoxTab>
      <CartProductCardList />
    </ProductSection>
  );
};

export default CartProductSection;

const ProductSection = styled(FlexBox)`
  position: relative;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CheckBoxTab = styled(FlexBox)`
  position: sticky;
  top: 80px;
  z-index: 10;
  width: 100%;
  height: 60px;
  padding-bottom: 10px;
  border-bottom: 3px solid var(--color-grayscale-200);
  background-color: var(--color-pure-white);
`;

const CheckedProductDeleteButton = styled.button<{ isActive: boolean }>`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 4px;
  background-color: ${({ isActive }) => (isActive ? 'var(--color-primary-tone-down)' : 'var(--color-grayscale-200)')};
  font-size: 16px;
  font-weight: 700;
  color: ${({ isActive }) => (isActive ? 'var(--color-pure-white)' : 'var(--color-grayscale-500)')};
  cursor: pointer;
  user-select: none;
  pointer-events: ${({ isActive }) => (isActive ? 'initial' : 'none')};

  :hover {
    filter: brightness(1.2);
    transition: background-color 100ms ease;
  }
`;
