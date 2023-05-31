import { CartListWithSelected } from '../../../../../types/CartList.ts';
import useOrderItems from '../../../../../hooks/cartItemOperations/useOrderItems.ts';
import useModal from '../../../../../hooks/useModal.ts';
import * as Styled from './OrderReviewList.styles.tsx';

const OrderReviewList = ({ cartListForReview }: { cartListForReview: CartListWithSelected }) => {
  const { handleOrderItems } = useOrderItems();
  const { closeModal } = useModal();

  const handleOrderButton = async () => {
    await handleOrderItems();
  };

  const handleCloseButton = () => {
    closeModal();
  };

  return (
    <>
      <Styled.List>
        {cartListForReview.map((cartItem) => {
          return (
            <Styled.ListItem key={cartItem.id}>
              <Styled.Image src={cartItem.product.imageUrl} alt='cart item image' aria-label={cartItem.product.name} />
              <Styled.Title>{cartItem.product.name}</Styled.Title>
              <Styled.Price>{cartItem.product.price.toLocaleString()}원</Styled.Price>
              <Styled.Price>*{cartItem.quantity}개</Styled.Price>
              <Styled.Price>{(cartItem.product.price * cartItem.quantity).toLocaleString()}원</Styled.Price>
            </Styled.ListItem>
          );
        })}
      </Styled.List>
      <Styled.Button onClick={handleOrderButton}>주문하기</Styled.Button>
      <Styled.Button onClick={handleCloseButton}>닫기</Styled.Button>
    </>
  );
};

export default OrderReviewList;
