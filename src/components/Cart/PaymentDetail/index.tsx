import { useRecoilValue } from 'recoil';
import {
  checkedItemsAtom,
  couponAtom,
  totalDiscountPriceSelector,
  totalPriceSelector,
} from 'recoil/carts';
import * as S from './PaymentDetail.styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/constants';
import Modal from 'components/@common/Modal';
import { useModal } from 'hooks/useModal';
import { useGet } from 'hooks/useGet';
import { getDeliveryPolicy } from 'api/cart';
import { postPayment } from 'api/payments';
import { useMutate } from 'hooks/useMutate';

const PaymentDetail = () => {
  const moveTo = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();

  const checkItemIds = useRecoilValue(checkedItemsAtom);
  const couponIds = useRecoilValue(couponAtom);
  const { request } = useMutate();

  const { data: delivery } = useGet(getDeliveryPolicy);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceSelector);
  const isDeliveryFree =
    totalPrice - totalDiscountPrice >= (delivery?.limit || 0);
  const deliveryFee = isDeliveryFree ? 0 : delivery?.price || 0;
  const orderPrice =
    totalPrice === 0 ? 0 : totalPrice + deliveryFee - totalDiscountPrice;

  const makeOrder = () => {
    const payment = {
      cartItemIds: checkItemIds,
      couponIds,
      isDeliveryFree,
      totalPrice: orderPrice,
    };

    request(postPayment(payment));
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
        <S.Text>{deliveryFee.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.SubText>
        {isDeliveryFree
          ? ''
          : `주문금액 ${delivery?.limit.toLocaleString(
              'KR'
            )}원 이상시 무료배송`}
      </S.SubText>
      <S.Divider />
      <S.Wrapper>
        <S.Text>총 주문 금액</S.Text>
        <S.Text>{orderPrice.toLocaleString('KR')}원</S.Text>
      </S.Wrapper>
      <S.OrderButton disabled={!checkItemIds.length} onClick={openModal}>
        주문하기
      </S.OrderButton>
      <Modal
        message="선택한 상품을 주문하시겠습니까?"
        isOpen={isModalOpen}
        onClickYes={makeOrder}
        onCloseModal={closeModal}
      />
    </S.Container>
  );
};

export default PaymentDetail;
