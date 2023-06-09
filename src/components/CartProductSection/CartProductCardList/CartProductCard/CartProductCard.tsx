import styled from 'styled-components';
import FlexBox from 'components/@common/FlexBox';
import CheckBox from 'components/@common/CheckBox/CheckBox';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import CartQuantityStepper from 'components/CartQuantityStepper/CartQuantityStepper';
import useShoppingCart from 'hooks/useShoppingCart';
import useModal from 'components/@common/Modal/hooks/useModal';
import { ReactComponent as RecycleBinIcon } from 'assets/recycle-bin-icon.svg';
import type { CartProduct } from 'types/product';
import useCartCheckBox from 'hooks/useCartCheckBox';
import emptyCartImg from 'assets/gradiation-min.png';
import SkeletonImg from 'components/@common/SkeletonImg';

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
    <CartProductCardContainer justify="flex-start" gap="16px" role="list">
      <CheckBox checked={isChecked(id)} onChange={() => toggleCheck(id)} />
      <ProductImageWrapper>
        <SkeletonImg src={imageUrl} placeholderSrc={emptyCartImg} width={150} height={150} />
      </ProductImageWrapper>
      <ProductInfoContainer flexDirection="column" justify="space-between">
        <Container>
          <Title>{name}</Title>
          <ProductDeleteButton onClick={openModal} />
          <ConfirmModal isOpen={isModalOpen} closeModal={closeModal} onClickConfirmButton={() => deleteCartProduct(id)}>
            해당 상품을 삭제하시겠습니까??
          </ConfirmModal>
        </Container>
        <StepperContainer justify="flex-end">
          <CartQuantityStepper
            quantity={quantity}
            initialIncrement={() => initialAddCart(product)}
            increaseQuantity={() => increaseQuantity(id)}
            decreaseQuantity={() => decreaseQuantity(id)}
          />
          <TotalPrice>{totalPrice.toLocaleString('ko-KR')}원</TotalPrice>
        </StepperContainer>
      </ProductInfoContainer>
    </CartProductCardContainer>
  );
};

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const StepperContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;

  @media (max-width: 1080px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }
`;

const ProductInfoContainer = styled(FlexBox)`
  position: relative;
  width: 100%;
  min-height: 150px;
`;

const CartProductCardContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  border-top: 1px solid #dddddd;
`;

const ProductImageWrapper = styled.div`
  width: 150px;
`;

// const ProductImage = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 4px;
//   filter: brightness(96%);
// `;

const Title = styled.span`
  width: 100%;
  font-size: 18px;
  overflow: hidden;
`;

const TotalPrice = styled.span`
  min-width: 100px;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

const ProductDeleteButton = styled(RecycleBinIcon)`
  cursor: pointer;
`;

export default CartProductCard;
