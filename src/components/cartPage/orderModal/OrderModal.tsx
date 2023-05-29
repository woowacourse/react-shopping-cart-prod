import styled, { keyframes } from 'styled-components';
import { Fragment, useState } from 'react';
import { priceSummaryState } from '../../../recoil/selectors/priceSummarySelector';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useOrderFetch } from '../../../hooks/fetch/useOrderFetch';
import { usePointInputHandler } from '../../../hooks/cartPage/usePointInputHandler';
import { CaptionContainer } from '../orderSummarySection/CaptionContainer';
import { getCommaAddedNumber } from '../../../utils/number';
import { useNavigate } from 'react-router-dom';
import { Loading } from './../../common/Loading';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { userAtomState } from '../../../recoil/atoms/userAtom';
import { orderListState } from '../../../recoil/atoms/orderAtom';

interface OrderModalProps {
  closeModal: () => void;
}

export const OrderModal = ({ closeModal }: OrderModalProps) => {
  const {
    totalProductPrice,
    deliveryPrice,
    totalPrice,
    canUsingUserPoint,
    totalPointsToAdd,
  } = useRecoilValue(priceSummaryState);
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
    setIsLoading(true);

    order(usingPoint).then((res) => {
      const orderId = res.headers.get('Location');

      closeModal();
      setIsLoading(false);
      deleteAllSelectedRecoilCartItems();
      getUserPoint().then((userPoint) => setUserPoint(userPoint.point));
      getOrders().then((orders) => setOrders(orders));

      if (orderId) navigate('/orderDetail', { state: { orderId } });
    });
  };

  return (
    <Fragment>
      <Style.BackDrop onClick={closeModal} />
      <Style.Content>
        <Style.HeaderContainer>
          <Style.Header>주문 내역 상세</Style.Header>
        </Style.HeaderContainer>
        <CaptionContainer
          title="총 상품가격"
          marginBottom={19}
          price={totalProductPrice}
          isMobile={true}
        />
        <CaptionContainer
          title="총 배송비"
          marginBottom={41}
          price={deliveryPrice}
          isMobile={true}
        />
        <CaptionContainer title="적립금 사용" marginBottom={60} isMobile={true}>
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
          isMobile={true}
        />
        <CaptionContainer
          title="적립 예정 금액"
          marginBottom={41}
          price={totalPointsToAdd}
          isMobile={true}
        />
        <Style.OrderButton
          onClick={handleClickOrderButton}
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : '주문하기'}
        </Style.OrderButton>
      </Style.Content>
    </Fragment>
  );
};

const ModalShowKeyframes = keyframes`
from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Style = {
  BackDrop: styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;

    background-color: #0000006d;
    z-index: 9999;
  `,
  Content: styled.div`
    width: 100vw;
    height: max-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;

    padding: 40px 0;
    background-color: white;
    z-index: 99999;

    animation: ${ModalShowKeyframes} 0.4s;
  `,
  HeaderContainer: styled.div`
    width: 90vw;
    height: 40px;

    align-items: center;
    margin-bottom: 20px;
  `,
  Header: styled.h2`
    font-size: 20px;
    color: #333333;
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
    width: 150px;
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
  OrderButton: styled.button`
    width: 90vw;
    height: 50px;

    background-color: #04c092;
    color: white;
    border-radius: 10px;
    font-size: 20px;
    font-family: var(--baemin-font);
  `,
};
