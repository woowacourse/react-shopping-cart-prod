import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { styled } from 'styled-components';
import { selectedOrderIdState } from '../../states/order';
import { toastState } from '../../states/toast/atom';
import { TOAST_STATE } from '../../constants/toast';
import { PAGE_URLS } from '../../constants/urls';

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

    navigate(PAGE_URLS.orderDetail(id));
    setSelectedOrderIdState(id);
  };

  return (
    <StyledOrderBoxItem type={type}>
      {type === 'orderList' ? (
        <TitleContainer type={type}>
          <h2>주문번호 : {id}</h2>
          {pathname === '/orderDetail' ? null : (
            <>
              <DetailButton type="button" onClick={handleDetailButtonClick}>
                {'상세정보 >'}
              </DetailButton>
              <MobileDetailButton
                type="button"
                onClick={handleDetailButtonClick}
              >
                {'>'}
              </MobileDetailButton>
            </>
          )}
        </TitleContainer>
      ) : (
        <TitleContainer type={type}>
          <h2>결제금액 정보</h2>
        </TitleContainer>
      )}
      {children}
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

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    & > h2 {
      font-size: 20px;
    }

    & > button {
      font-size: 16px;
    }
  }
`;

const DetailButton = styled.button`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.5px;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    display: none;
  }
`;

const MobileDetailButton = styled(DetailButton)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    display: block;
  }
`;

export default OrderBoxItem;
