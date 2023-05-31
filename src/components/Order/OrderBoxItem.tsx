import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { styled } from 'styled-components';
import { selectedOrderIdState } from '../../states/order';
import { toastState } from '../../states/toast/atom';
import { TOAST_STATE } from '../../constants/toast';

interface OrderBoxItemProps {
  id?: number;
  type: 'orderList' | 'payment';
}

const OrderBoxItem = ({
  id,
  type,
  children,
}: PropsWithChildren<OrderBoxItemProps>) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const setSelectedOrderIdState = useSetRecoilState(selectedOrderIdState);
  const setToastState = useSetRecoilState(toastState);

  const handleDetailButtonClick = () => {
    if (!id) {
      setToastState(TOAST_STATE.failedGetOrderDetail);
      return;
    }

    navigate(`/order/detail/${id}`);
    setSelectedOrderIdState(id);
  };

  return (
    <StyledOrderBoxItem type={type}>
      {type === 'orderList' ? (
        <TitleContainer type={type}>
          <h2>주문번호 : {id}</h2>
          {pathname === '/orderDetail' ? null : (
            <button type="button" onClick={handleDetailButtonClick}>
              {'상세정보 >'}
            </button>
          )}
        </TitleContainer>
      ) : (
        <TitleContainer type={type}>
          <h2>결재금액 정보</h2>
        </TitleContainer>
      )}
      <OrderBoxContents type={type}>{children}</OrderBoxContents>
    </StyledOrderBoxItem>
  );
};

const StyledOrderBoxItem = styled.li<Pick<OrderBoxItemProps, 'type'>>`
  width: ${({ type }) => (type === 'orderList' ? '100%' : '400px')};

  border: 1px solid #aaaaaa;
`;

const TitleContainer = styled.div<Pick<OrderBoxItemProps, 'type'>>`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;

  border-bottom: 1px solid #aaaaaa;
  background-color: #f6f6f6;

  & > h2 {
    font-size: ${({ type }) => (type === 'orderList' ? '20px' : '28px')};
    font-weight: ${({ type }) => (type === 'orderList' ? '400' : '700')};

    height: 80px;
    line-height: 80px;
  }

  & > button {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.5px;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.medium}) {
    & > h2 {
      font-size: 24px;
    }

    & > button {
      font-size: 16px;
    }
  }
`;

const OrderBoxContents = styled.div<OrderBoxItemProps>`
  display: flex;
  flex-direction: ${({ type }) => (type === 'orderList' ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  padding: ${({ type }) => (type === 'payment' ? '36px 30px' : '')};

  & > p {
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 0.5px;
    line-height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.medium}) {
    & > p {
      font-size: 20px;
    }
  }
`;

export default OrderBoxItem;
