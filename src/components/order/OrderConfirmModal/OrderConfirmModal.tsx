import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { selectedCartItems } from '../../../recoil/selectors/cart';
import Modal from '../../common/Modal/Modal';
import Image from '../../common/Image/Image';
import Spacer from '../../common/Spacer/Spacer';
import useModal from '../../common/Modal/useModal';
import useOrder from '../../../hooks/useOrder';
import useCart from '../../../hooks/useCart';
import useToast from '../../common/Toast/useToast';
import usePoint from '../../../hooks/usePoint';
import { formatPrice } from '../../../utils/formatPrice';
import type { CartItem } from '../../../types/cart';

interface OrderConfirmModalProps {
  selectedCartItemIds: Set<CartItem['id']>;
  usingPoint: number;
  totalPaymentPrice: number;
}

const OrderConfirmModal = (props: OrderConfirmModalProps) => {
  const { selectedCartItemIds, usingPoint, totalPaymentPrice } = props;
  const orderItems = useRecoilValue(selectedCartItems(selectedCartItemIds));
  const { sendOrder } = useOrder();
  const { updateCart } = useCart();
  const { updatePoint } = usePoint();
  const { closeModal } = useModal();
  const { showToast } = useToast();

  const handleOrder = async () => {
    const cartItemIds = Array.from(selectedCartItemIds);

    try {
      await sendOrder({
        cartItemIds,
        usePoint: usingPoint,
      });
      updateCart();
      updatePoint();
      closeModal();
    } catch (e) {
      if (e instanceof Error) {
        showToast('error', e.message);
      }
    }
  };

  return (
    <Modal>
      <Container>
        <TitleWrapper>
          <Title>주문 확인</Title>
        </TitleWrapper>
        <OrderSummaryContainer>
          <div>
            <OrderSummary>
              <dt>주문 요약</dt>
              <dl>총 {orderItems.length}건</dl>
            </OrderSummary>
            <Spacer height={20} />
            <OrderItemList>
              {orderItems.map((orderItem) => {
                const { id, quantity, product } = orderItem;
                const { imageUrl, name, price } = product;

                return (
                  <OrderItem key={id}>
                    <Image size="small" src={imageUrl} alt={name} />
                    <Spacer width={14} />
                    <OrderItemName>{name}</OrderItemName>
                    <span> x {quantity}</span>
                    <OrderItemPrice>
                      {formatPrice(price * quantity)}
                    </OrderItemPrice>
                  </OrderItem>
                );
              })}
            </OrderItemList>
          </div>
        </OrderSummaryContainer>
        <Detail>
          <DetailInner>
            {usingPoint > 0 && (
              <>
                <dt>사용 포인트</dt>
                <UsingPoint>- {formatPrice(usingPoint)}</UsingPoint>
              </>
            )}
          </DetailInner>
          <DetailInner>
            <dt>총 결제금액</dt>
            <dl>{formatPrice(totalPaymentPrice)}</dl>
          </DetailInner>
          <DetailInner>
            <dt>적립 예정 포인트</dt>
            <Point>
              + {formatPrice(Math.floor(totalPaymentPrice * 0.025))}
            </Point>
          </DetailInner>
        </Detail>
        <ButtonContainer>
          <CancelButton type="button" onClick={closeModal}>
            취소
          </CancelButton>
          <OrderButton type="button" onClick={handleOrder}>
            주문하기
          </OrderButton>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 500px;
  height: 650px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 3px solid ${(props) => props.theme.color.gray300};
  padding: 0 30px;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-size: 22px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.5px;
`;

const OrderSummaryContainer = styled.div`
  padding: 20px 30px;
  border-bottom: 2px solid ${(props) => props.theme.color.gray300};
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: space-between;

  & > dt,
  & > dl {
    font-weight: 600;
  }

  & > dt {
    font-size: 18px;
  }
`;

const OrderItemList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-height: 300px;
  overflow: scroll;
`;

const OrderItem = styled.li`
  display: flex;
  padding: 5px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  }
`;

const OrderItemName = styled.span`
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const OrderItemPrice = styled.span`
  margin-left: auto;
`;

const Detail = styled.dl`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 30px;
`;

const DetailInner = styled.div`
  display: flex;
  justify-content: space-between;

  & > dt {
    font-size: 18px;
    font-weight: 600;
  }

  & > dl {
    font-size: 16px;
    font-weight: 600;
  }
`;

const UsingPoint = styled.dl`
  color: ${(props) => props.theme.color.error};
`;

const Point = styled.dl`
  color: ${(props) => props.theme.color.primary};
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;

  & > button {
    width: 50%;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const CancelButton = styled.button`
  border-top: 1px solid ${(props) => props.theme.color.gray350};
  border-bottom-left-radius: 4px;
`;

const OrderButton = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.white};
  border-bottom-right-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.color.primaryLight};
  }
`;

export default OrderConfirmModal;
