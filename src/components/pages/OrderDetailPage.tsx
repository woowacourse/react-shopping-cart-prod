import styled from '@emotion/styled';
import PageTemplate from '../templates/PageTemplate';
import { Text } from '../common/Text/Text';
import { useNavigate, useParams } from 'react-router-dom';
import useOrderDetail from '../../hooks/useOrderDetail';
import { skeletonAnimation } from '../box/ProductItem/ProductItem';
import TextList from '../common/TextList/TextList';
import Button from '../common/Button/Button';

const OrderDetailPage = () => {
  const { orderId } = useParams();

  const { orderDetailData, confirmOrderAPI, deleteOrderAPI } = useOrderDetail(orderId);

  const navigate = useNavigate();

  return (
    <PageTemplate
      title="장바구니 미션 - 주문내역 상세페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문내역 상세페이지입니다."
    >
      <CartPageWrapper>
        <CartPageHead style={{ position: 'relative' }}>
          <div
            style={{ position: 'absolute', left: 30, cursor: 'pointer' }}
            onClick={() => navigate('/order')}
          >
            <img
              src="https://cdn.pixabay.com/photo/2020/03/22/15/19/arrow-4957487_1280.png"
              style={{ width: 28, height: 28 }}
            />
          </div>
          <Text size="extraLarge" weight="bold">
            주문내역 상세
          </Text>
        </CartPageHead>
        <CartPageContent>
          {orderDetailData && (
            <OrderDetailInnerWrapper>
              <OrderItemWrapper>
                <OrderItemHead>
                  <Text size="smaller" weight="light">
                    주문번호 {orderDetailData.id}
                  </Text>
                  {!orderDetailData.confirmState && (
                    <ButtonWrapper>
                      <Button
                        text="주문확정"
                        size="small"
                        primary
                        borderRadius={2}
                        onClick={() => confirmOrderAPI.mutate()}
                      />
                      <Button
                        text="주문취소"
                        size="small"
                        borderRadius={2}
                        onClick={() => deleteOrderAPI.mutate()}
                      />
                    </ButtonWrapper>
                  )}
                </OrderItemHead>
                <OrderProductList>
                  {orderDetailData.orderProducts.map((orderProduct) => (
                    <OrderProduct key={orderProduct.product.id}>
                      <ProductImage src={orderProduct.product.imageUrl} />
                      <ProductInfo>
                        <Text size="small" weight="normal">
                          {orderProduct.product.name}
                        </Text>
                        <Text size="smaller" weight="light" color="rgba(0,0,0,0.4)">
                          {`${orderProduct.product.price.toLocaleString()}원 / ${
                            orderProduct.quantity
                          }개`}
                        </Text>
                      </ProductInfo>
                    </OrderProduct>
                  ))}
                </OrderProductList>
              </OrderItemWrapper>
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
    </PageTemplate>
  );
};

export default OrderDetailPage;

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

const OrderItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const OrderItemHead = styled.div`
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 62px;
  background-color: rgb(243, 245, 247);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderProductList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const OrderProduct = styled.div`
  padding: 40px 26px;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 141px;
  height: 141px;
  object-fit: cover;
  margin-right: 44px;
  border-radius: 3px;
  transition: all 0.32s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  background: linear-gradient(120deg, #e5e5e5 20%, #f0f0f0 28%, #f0f0f0 40%, #e5e5e5 48%);
  background-position: 100% 0;
  background-size: 282px;
  animation: ${skeletonAnimation} 1s infinite;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
