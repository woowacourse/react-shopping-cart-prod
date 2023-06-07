import styled from '@emotion/styled';
import PageTemplate from '../templates/PageTemplate';
import { Text } from '../common/Text/Text';
import { useNavigate, useParams } from 'react-router-dom';
import useOrderDetail from '../../hooks/useOrderDetail';
import TextList from '../common/TextList/TextList';
import OrderItem from '../box/Order/OrderItem';
import Modal from '../common/Modal/Modal';
import ConfirmOrderModal from '../common/Modal/ConfirmOrderModal';
import DeleteOrderModal from '../common/Modal/DeleteOrderModal';
import { confirmOrderModalState, deleteOrderModalState } from '../../service/atom';

const OrderDetailPage = () => {
  const { orderId } = useParams();

  const { orderDetailData } = useOrderDetail(orderId);

  const navigate = useNavigate();

  return (
    <PageTemplate
      title="장바구니 미션 - 주문내역 상세페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문내역 상세페이지입니다."
    >
      <CartPageWrapper>
        <CartPageHead style={{ position: 'relative' }}>
          <BackButton onClick={() => navigate('/order')}>
            <BackButtonImage src="https://cdn.pixabay.com/photo/2020/03/22/15/19/arrow-4957487_1280.png" />
          </BackButton>
          <Text size="extraLarge" weight="bold">
            주문내역 상세
          </Text>
        </CartPageHead>
        <CartPageContent>
          {orderDetailData && (
            <OrderDetailInnerWrapper>
              <OrderItem order={orderDetailData} />
              <OrderDetailPriceBox>
                <BoxHead>
                  <Text size="smaller" weight="light">
                    결제금액 정보
                  </Text>
                </BoxHead>
                <BoxInner>
                  <TextList
                    label="총 상품금액"
                    text={`${orderDetailData.originalPrice.toLocaleString()}원`}
                  />
                  {orderDetailData.discountPrice > 0 && (
                    <CouponInfo>
                      <TextList
                        label="쿠폰 할인"
                        text={`- ${(
                          orderDetailData.originalPrice - orderDetailData.discountPrice
                        ).toLocaleString()}원`}
                        color="rgb(255, 64, 62)"
                      />
                      <Text size="smallest" weight="light" color="rgba(0,0,0,0.4)">
                        {orderDetailData.coupon?.name ?? ''}
                      </Text>
                    </CouponInfo>
                  )}
                  <TextList label="배송비" text={`+ ${'3,000'}원`} />
                  <TotalPriceWrapper>
                    <TextList
                      label="총 주문금액"
                      text={`${(
                        orderDetailData.originalPrice +
                        3000 -
                        (orderDetailData.originalPrice - orderDetailData.discountPrice)
                      ).toLocaleString()}원`}
                      primary
                    />
                  </TotalPriceWrapper>
                </BoxInner>
              </OrderDetailPriceBox>
            </OrderDetailInnerWrapper>
          )}
        </CartPageContent>
      </CartPageWrapper>
      <Modal modalState={confirmOrderModalState}>
        <ConfirmOrderModal />
      </Modal>
      <Modal modalState={deleteOrderModalState}>
        <DeleteOrderModal />
      </Modal>
    </PageTemplate>
  );
};

export default OrderDetailPage;

const BackButton = styled.div`
  position: absolute;
  left: 30px;
  cursor: pointer;
`;

const BackButtonImage = styled.img`
  width: 28px;
  height: 28px;
`;

const CartPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1140px;
  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 350px;
  }
`;

const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 5px;
`;

const CartPageHead = styled.div`
  border-bottom: 4px solid #333;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const CartPageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
  position: relative;
  @media screen and (max-width: 1320px) {
    flex-direction: column;
    width: 100%;
  }
`;

const OrderDetailInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 40px;
  width: 100%;
`;

const OrderDetailPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: auto;

  border-radius: 6px;
`;

const BoxHead = styled.div`
  padding: 12px 18px 12px 18px;
  background-color: rgb(243, 245, 247);
`;

const BoxInner = styled.div`
  padding: 12px 18px 12px 18px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  background-color: #fff;
  border-radius: 0 0 6px 6px;
`;

const TotalPriceWrapper = styled.div`
  margin: 12px 0 0 0;
  padding: 12px 0 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
