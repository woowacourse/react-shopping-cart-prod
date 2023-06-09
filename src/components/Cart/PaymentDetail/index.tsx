import { useRecoilValue } from 'recoil';
import { checkedItemIdsAtom, couponAtom } from 'recoil/carts';
import * as S from './PaymentDetail.styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/constants';
import Modal from 'components/@common/Modal';
import { useModal } from 'hooks/useModal';
import usePrice from 'components/Cart/hooks/usePrice';
import useSubmitOrder from '../hooks/useSubmitOrder';

const PaymentDetail = () => {
  const moveTo = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    deliveryLimit,
    deliveryPrice,
    totalDiscountPrice,
    totalPrice,
    finalPrice,
    isDeliveryFree,
  } = usePrice();
  const { makeOrder } = useSubmitOrder();
  const checkItemIds = useRecoilValue(checkedItemIdsAtom);

  const submitOrder = () => {
    makeOrder({
      isDeliveryFree,
      totalPrice: finalPrice,
    });
    moveTo(ROUTES.ORDERED_LIST);
  };

  return (
    <S.Container>
      <S.Title>결제 예상 금액</S.Title>
      <S.Divider />
      <S.Wrapper>
        <S.Text>총 상품 가격</S.Text>
        <S.Text>{totalPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 할인 가격</S.Text>
        <S.Text>
          {totalDiscountPrice && totalPrice
            ? '-' + totalDiscountPrice.toLocaleString('KR')
            : 0}
          원
        </S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 배송비</S.Text>
        <S.Text>
          {isDeliveryFree ? 0 : '+' + deliveryPrice?.toLocaleString('KR')}원
        </S.Text>
      </S.Wrapper>
      <S.SubText>
        {!isDeliveryFree &&
          `주문금액 ${deliveryLimit?.toLocaleString('KR')}원 이상시 무료배송`}
      </S.SubText>
      <S.Divider />
      <S.Wrapper>
        <S.Text>총 주문 금액</S.Text>
        <S.Text>{finalPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.OrderButton disabled={!checkItemIds.length} onClick={openModal}>
        주문하기
      </S.OrderButton>
      <Modal
        message="선택한 상품을 주문하시겠습니까?"
        isOpen={isModalOpen}
        onClickYes={submitOrder}
        onCloseModal={closeModal}
      />
    </S.Container>
  );
};

export default PaymentDetail;
