import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import useFutureResult from '../hooks/useFutureResult';
import useOrderMutation from '../hooks/useOrderMutation';
import userCartOrderPriceState from '../recoil/user/userCartOrderPriceState';
import userCartPointsState from '../recoil/user/userCartPointsState';
import userRemoteCartItemsState from '../recoil/user/userRemoteCartItemsState';
import Button from './common/Button';
import PriceFormat from './common/PriceFormat';
import AwaitRecoilState from './utils/AwaitRecoilState';

const CartOrderContainer = styled.form`
  min-width: 440px;
  border: 1px solid #dddddd;
`;

const Title = styled.h1`
  padding: 20px 30px;

  font-size: 24px;
  font-weight: 400;
`;

const Divider = styled.hr`
  height: 3px;
  background-color: #dddddd;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;

  padding: 30px;
`;

const ContentPlaceholder = styled.h2`
  font-size: 16px;
  text-align: center;
  color: #444444;
`;

const PriceField = styled.p`
  display: flex;
  margin-bottom: 20px;

  font-size: 20px;
  font-weight: 700;
`;

const PriceFieldName = styled.p``;

const PriceFieldValue = styled.p`
  margin-left: auto;
`;

const ContentDivider = styled.hr`
  height: 20px;
  background: transparent;
  border: none;
`;

type CartOrderProps = {
  isCartEmpty: boolean;
  onOrderDone?: (orderId: number) => void;
};

const CartOrder = (props: CartOrderProps) => {
  const navigate = useNavigate();
  const { isCartEmpty, onOrderDone = (orderId) => navigate(`/orders/${orderId}/done`) } = props;

  const prices = useRecoilValue(userCartOrderPriceState);
  const { isSynchronizing } = useRecoilValue(userRemoteCartItemsState);

  const { order, future } = useOrderMutation();
  const orderResult = useFutureResult(future);

  const handleSubmitOrder: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const orderId = await order({ usedPoints: 0 });
    onOrderDone(orderId);
  };

  return (
    <CartOrderContainer onSubmit={handleSubmitOrder}>
      <Title>결제예상금액</Title>
      <Divider />

      <Content>
        {isCartEmpty ? (
          <>
            <ContentDivider />
            <ContentPlaceholder>주문할 상품을 선택해주세요!</ContentPlaceholder>
            <ContentDivider />
          </>
        ) : (
          <>
            <PriceField>
              <PriceFieldName>총 상품가격</PriceFieldName>
              <PriceFieldValue>
                <PriceFormat price={prices.products} />
              </PriceFieldValue>
            </PriceField>

            <PriceField>
              <PriceFieldName>총 배송비</PriceFieldName>
              <PriceFieldValue>
                <PriceFormat price={prices.shippingFee} />
              </PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <PriceField>
              <PriceFieldName>적립 포인트</PriceFieldName>

              <PriceFieldValue>
                <AwaitRecoilState state={userCartPointsState} loadingElement="계산중...">
                  {(cartPoints) => (
                    <>
                      <PriceFormat price={cartPoints.expectedSavePoints} unit="P" /> (
                      {cartPoints.savingRate}%)
                    </>
                  )}
                </AwaitRecoilState>
              </PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <PriceField>
              <PriceFieldName>총 주문금액</PriceFieldName>
              <PriceFieldValue>
                <PriceFormat price={prices.total} />
              </PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <Button disabled={orderResult.isLoading || isSynchronizing}>주문하기</Button>
          </>
        )}
      </Content>
    </CartOrderContainer>
  );
};

export default CartOrder;
