import styled from 'styled-components';
import Box from 'components/@common/Box';
import CheckBox from 'components/@common/CheckBox/CheckBox';
import useModal from 'components/@common/Modal/hooks/useModal';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import CartQuantityStepper from 'components/CartQuantityStepper/CartQuantityStepper';
import useShoppingCart from 'hooks/useShoppingCart';
import useCartCheckBox from 'hooks/useCartCheckBox';
import { ReactComponent as RecycleBinIcon } from 'assets/recycle-bin-icon.svg';
import type { CartProduct } from 'types/product';

type CartProductCardProps = {
  cartProduct: CartProduct;
};

const CartProductCard = ({ cartProduct }: CartProductCardProps) => {
  const { product, quantity } = cartProduct;
  const { id, name, price, imageUrl } = product;
  const { isChecked, toggleCheck } = useCartCheckBox();
  const { initialAddCart, decreaseQuantity, increaseQuantity, deleteCartProduct } = useShoppingCart();
  const { isModalOpen, openModal, closeModal } = useModal();
  const totalPrice = price * quantity;

  return (
    <Container sizing={{ width: '100%', height: '100%' }} flex={{ gap: '16px', justify: 'flex-start' }} role="list">
      <CheckBox checked={isChecked(id)} onChange={() => toggleCheck(id)} />
      <ProductImage src={imageUrl} />
      <Box sizing={{ width: '100%', minHeight: '130px' }} flex={{ flexDirection: 'column', justify: 'space-between' }}>
        <Box sizing={{ width: '100%', height: '100%' }}>
          <Title>{name}</Title>
          <ProductDeleteButton onClick={openModal} />
          <ConfirmModal isOpen={isModalOpen} closeModal={closeModal} onClickConfirmButton={() => deleteCartProduct(id)}>
            해당 상품을 삭제하시겠습니까??
          </ConfirmModal>
        </Box>
        <StepperContainer sizing={{ width: '100%', height: '100%' }} flex={{ justify: 'flex-end' }}>
          <CartQuantityStepper
            quantity={quantity}
            initialIncrement={() => initialAddCart(product)}
            increaseQuantity={() => increaseQuantity(id)}
            decreaseQuantity={() => decreaseQuantity(id)}
          />
          <TotalPrice>{totalPrice.toLocaleString('ko-KR')}원</TotalPrice>
        </StepperContainer>
      </Box>
    </Container>
  );
};

const Container = styled(Box)`
  padding: 20px 0;
  border-top: 1px solid var(--color-grayscale-200);
`;

const StepperContainer = styled(Box)`
  @media (max-width: 1080px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }
`;

const ProductImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 4px;
`;

const Title = styled.span`
  width: 100%;
  font-size: 18px;
  overflow: hidden;
`;

const TotalPrice = styled.span`
  min-width: 100px;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

const ProductDeleteButton = styled(RecycleBinIcon)`
  cursor: pointer;
`;

export default CartProductCard;
