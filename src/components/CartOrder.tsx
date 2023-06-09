import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import useFutureResult from '../hooks/useFutureResult';
import useOrderMutation from '../hooks/useOrderMutation';
import userCartOrderPriceState from '../recoil/user/userCartOrderPriceState';
import userCartPointsState from '../recoil/user/userCartPointsState';
import userProfileState from '../recoil/user/userProfileState';
import userRemoteCartItemsState from '../recoil/user/userRemoteCartItemsState';
import Button from './common/Button';
import PriceFormat from './common/PriceFormat';
import Spinner from './common/Spinner';
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

const PriceField = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;

  font-size: 20px;
  font-weight: 700;
`;

const PriceFieldName = styled.p``;

const PriceFieldValue = styled.p`
  margin-left: auto;
`;

const PriceFieldInput = styled.input`
  max-width: 120px;
  padding: 8px;
  border: 1px solid #666666;
`;

const PriceFieldCaption = styled.div`
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
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
  const profile = useRecoilValue(userProfileState);

  const { order, future } = useOrderMutation();
  const orderResult = useFutureResult(future);

  const [inputUsedPoints, setInputUsedPoints] = useState('0');
  const [rawUsedPoints, setUsedPoints] = useState(0);
  const maxUsedPoints = Math.min(prices.total, profile.currentPoints);
  const usedPoints = Math.max(0, Math.min(maxUsedPoints, rawUsedPoints));

  useEffect(() => {
    setInputUsedPoints(String(usedPoints));
  }, [usedPoints, prices.total]);

  const handleChangeUsedPoints = (value: string) => {
    if (!/^\d+$/.test(value)) {
      alert('숫자만 입력 가능합니다.');
      return;
    }
    const newUsedPoints = Number(value);
    if (newUsedPoints < 0 || maxUsedPoints < newUsedPoints) {
      alert(`최소 0부터 ${maxUsedPoints}까지 사용 가능합니다.`);
      return;
    }
    setUsedPoints(newUsedPoints);
  };

  const handleSubmitOrder: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const orderId = await order({ usedPoints });
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

            <ContentDivider />

            <PriceField>
              <PriceFieldName>적립 포인트</PriceFieldName>

              <PriceFieldValue>
                <AwaitRecoilState state={userCartPointsState} loadingElement={<Spinner />}>
                  {(cartPoints) => (
                    <>
                      <PriceFormat price={cartPoints.expectedSavePoints} unit="P" /> (
                      {cartPoints.savingRate}%)
                    </>
                  )}
                </AwaitRecoilState>
              </PriceFieldValue>
            </PriceField>

            <PriceField>
              <PriceFieldName>
                사용할 포인트
                <PriceFieldCaption>
                  사용가능한 포인트: <PriceFormat price={profile.currentPoints} unit="P" />
                </PriceFieldCaption>
              </PriceFieldName>
              <PriceFieldValue>
                <PriceFieldInput
                  value={inputUsedPoints}
                  onChange={(event) => setInputUsedPoints(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleChangeUsedPoints(inputUsedPoints);
                    }
                  }}
                  onBlur={() => {
                    setInputUsedPoints(String(usedPoints));
                  }}
                />{' '}
                P
              </PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <PriceField>
              <PriceFieldName>총 주문금액</PriceFieldName>
              <PriceFieldValue>
                <PriceFormat price={prices.total - usedPoints} />
              </PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <Button disabled={orderResult.isLoading || isSynchronizing}>
              {orderResult.isLoading ? <Spinner /> : '주문하기'}
            </Button>
          </>
        )}
      </Content>
    </CartOrderContainer>
  );
};

export default CartOrder;
