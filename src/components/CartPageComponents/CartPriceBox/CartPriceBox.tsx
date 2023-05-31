import * as Styled from './CartPriceBox.styles.tsx';
import { useRecoilValue } from 'recoil';
import { cartTotalPriceSelector } from '../../../stores/cartListStore.ts';
import useOrderItems from '../../../hooks/cartItemOperations/useOrderItems.ts';
import useModal from '../../../hooks/useModal.ts';
import OrderReviewList from '../../@common/Modal/ModalContents/OrderReviewList/OrderReviewList.tsx';

const CartPriceBox = () => {
  const totalItemPrice = useRecoilValue(cartTotalPriceSelector);
  const { cartList } = useOrderItems();
  const { openModal } = useModal();

  const handleOrderButton = () => {
    if (!cartList) return;
    const selectedCartList = cartList.filter((cartItem) => cartItem.isSelected);
    openModal(<OrderReviewList cartListForReview={selectedCartList} />);
  };

  const discountedPrice = totalItemPrice >= 50000 ? 5000 : totalItemPrice >= 30000 ? 3000 : 0;

  return (
    <>
      {totalItemPrice > 0 && (
        <Styled.CartPriceBoxWrapper>
          <Styled.CartPriceBoxContent>
            <Styled.CartPriceBoxContentTitle>결제예상금액</Styled.CartPriceBoxContentTitle>
            <Styled.CartPriceBoxDivider />
            <Styled.CartPriceTextWrapper>
              <Styled.PriceTextWrapper>
                <Styled.CartPriceText>총 상품가격</Styled.CartPriceText>
                <Styled.CartPriceText>{totalItemPrice.toLocaleString()}원</Styled.CartPriceText>
              </Styled.PriceTextWrapper>
              <Styled.PriceTextWrapper>
                <Styled.CartPriceText> ㄴ할인가격</Styled.CartPriceText>
                <Styled.CartPriceText>-{discountedPrice.toLocaleString()}원</Styled.CartPriceText>
              </Styled.PriceTextWrapper>
              <Styled.PriceTextWrapper>
                <Styled.CartPriceText>총 배송비</Styled.CartPriceText>
                <Styled.CartPriceText>3,000원</Styled.CartPriceText>
              </Styled.PriceTextWrapper>
              <Styled.PriceTextWrapper>
                <Styled.CartPriceText>총 주문금액</Styled.CartPriceText>
                <Styled.CartPriceText>{(totalItemPrice + 3000 - discountedPrice).toLocaleString()}원</Styled.CartPriceText>
              </Styled.PriceTextWrapper>
              <Styled.OrderButton onClick={handleOrderButton}>주문 검토하기</Styled.OrderButton>
            </Styled.CartPriceTextWrapper>
          </Styled.CartPriceBoxContent>
        </Styled.CartPriceBoxWrapper>
      )}
    </>
  );
};

export default CartPriceBox;
