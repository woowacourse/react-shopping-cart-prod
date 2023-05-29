import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { priceSummaryState } from '../../../recoil/selectors/priceSummarySelector';
import { CaptionContainer } from './CaptionContainer';
import { getCommaAddedNumber } from '../../../utils/number';
import { useOrderFetch } from '../../../hooks/fetch/useOrderFetch';
import { usePointInputHandler } from '../../../hooks/cartPage/usePointInputHandler';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../common/Loading';
import { selectedCartIdListState } from '../../../recoil/atoms/cartAtom';
import { userAtomState } from '../../../recoil/atoms/userAtom';
import { orderListState } from '../../../recoil/atoms/orderAtom';

export const OrderSummarySection = () => {
  const {
    totalProductPrice,
    deliveryPrice,
    totalPrice,
    canUsingUserPoint,
    totalPointsToAdd,
  } = useRecoilValue(priceSummaryState);
  const selectedCartIdList = useRecoilValue(selectedCartIdListState);
  const setUserPoint = useSetRecoilState(userAtomState);
  const setOrders = useSetRecoilState(orderListState);

  const { order, getUserPoint, getOrders } = useOrderFetch();

  const {
    usingPoint,
    setUsingPoint,
    handleInputValueChange,
    handleOnBlurFromInput,
    handleOnFocusFromInput,
  } = usePointInputHandler(canUsingUserPoint);

  const { deleteAllSelectedRecoilCartItems } = useCartRecoil();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickOrderButton = () => {
    if (selectedCartIdList.length === 0) return alert('상품을 선택해주세요!');

    setIsLoading(true);

    order(usingPoint).then((res) => {
      const orderId = res.headers.get('Location');

      setIsLoading(false);
      deleteAllSelectedRecoilCartItems();
      getUserPoint().then((userPoint) => setUserPoint(userPoint.point));
      getOrders().then((orders) => setOrders(orders));

      if (orderId) navigate('/orderDetail', { state: { orderId } });
    });
  };

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderTitle>결제예상금액</Style.HeaderTitle>
      </Style.Header>
      <Style.Content>
        <CaptionContainer
          title="총 상품가격"
          marginBottom={19}
          price={totalProductPrice}
        />
        <CaptionContainer
          title="총 배송비"
          marginBottom={41}
          price={deliveryPrice}
        />
        <CaptionContainer title="적립금 사용" marginBottom={60}>
          <Style.PointInputContainer>
            <Style.FlexBox>
              <Style.PointInput
                type="number"
                value={usingPoint ? usingPoint : ''}
                onChange={handleInputValueChange}
                onFocus={handleOnFocusFromInput}
                onBlur={handleOnBlurFromInput}
                placeholder={`${getCommaAddedNumber(canUsingUserPoint)}`}
              />
              <Style.UseAllPointButton
                onClick={() => setUsingPoint(canUsingUserPoint)}
              >
                전액사용
              </Style.UseAllPointButton>
            </Style.FlexBox>
            <Style.PointCaption>
              사용 가능 적립금 ({getCommaAddedNumber(canUsingUserPoint)}원)
            </Style.PointCaption>
          </Style.PointInputContainer>
        </CaptionContainer>
        <CaptionContainer
          title="총 주문 금액"
          marginBottom={19}
          price={totalPrice - (usingPoint ?? 0)}
        />
        <CaptionContainer
          title="적립 예정 금액"
          marginBottom={41}
          price={totalPointsToAdd}
        />
        <Style.OrderButton
          disabled={isLoading}
          onClick={handleClickOrderButton}
        >
          {isLoading ? <Loading /> : '주문하기'}
        </Style.OrderButton>
      </Style.Content>
    </Style.Container>
  );
};

const Style = {
  Container: styled.section`
    width: 448px;
    height: max-content;

    margin-top: 49px;

    border: 1px solid #dddddd;
    position: sticky;
    top: 80px;

    @media screen and (max-width: 480px) {
      display: none;
    }
  `,
  Header: styled.div`
    width: 448px;
    height: 81px;

    padding: 30px;

    border-bottom: 3px solid #dddddd;
  `,
  HeaderTitle: styled.h2`
    font-size: 24px;
  `,
  Content: styled.div`
    width: 448px;
    height: max-content;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 34px;
    padding-bottom: 34px;
  `,
  OrderButton: styled.button`
    width: 388px;
    height: 73px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background-color: #04c092;
    font-size: 24px;
    color: #ffffff;
    font-family: var(--baemin-font);
  `,
  PointInputContainer: styled.div`
    width: max-content;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;

    position: relative;
  `,
  FlexBox: styled.div`
    display: flex;
  `,
  PointInput: styled.input`
    width: 200px;
    height: 40px;

    text-align: right;
    font-size: 18px;

    border-bottom: 2px solid #c0c0c0;
    padding-right: 10px;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    ::placeholder {
      color: #c0c0c0;
    }
  `,
  UseAllPointButton: styled.button`
    width: max-content;
    background-color: #333333;

    color: #ffffff;
    padding: 0 5px;
  `,
  PointCaption: styled.span`
    position: absolute;
    top: 45px;

    font-size: 15px;
    color: #04c092;
  `,
};
