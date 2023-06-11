import { BsChevronRight } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import { useRemoveOrderFromList } from '../../hooks/useRemoveOrderFromList';
import { OrderList } from '../../types';
import Button from '../common/Button';
import TrashCanIcon from '../icons/TrashCanIcon';

interface Props extends Pick<OrderList, 'orderStatus'> {
  orderId: number;
  createdAt: string;
}

const OrderDetailNavigator = ({ orderId, createdAt, orderStatus }: Props) => {
  const goToPage = useGoToAnotherPage();
  const location = useLocation().pathname;

  const handleOrderRemoveFromList = useRemoveOrderFromList(orderId);

  return (
    <S.Head tabIndex={0}>
      {location !== `${ROUTE_PATH.ORDER_LIST_PAGE}/${orderId}` && (
        <Button onClick={handleOrderRemoveFromList}>
          <TrashCanIcon patternId={orderId} imageSize={{ width: '40', height: '40' }} />
        </Button>
      )}
      <p>
        <span>주문번호&nbsp; | </span>
        <S.OrderId>{orderId}</S.OrderId>
        <span>[ {createdAt} ]</span>
      </p>
      {location !== `${ROUTE_PATH.ORDER_LIST_PAGE}/${orderId}` ? (
        <Button
          css={buttonStyle}
          onClick={() => goToPage(`${ROUTE_PATH.ORDER_LIST_PAGE}/${orderId}`)}
        >
          <span>상세보기</span>
          <BsChevronRight />
        </Button>
      ) : (
        <S.OrderStatus>{orderStatus}</S.OrderStatus>
      )}
    </S.Head>
  );
};

const S = {
  Head: styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 30px 0 16px;
    border-bottom: 1px solid var(--gray-color-300);
    color: var(--text-color);

    & button:first-child {
      margin-right: 14px;

      & svg {
        margin-top: 3px;
      }

      & + p {
        margin-right: auto;
      }
    }

    @media (max-width: 420px) {
      padding-bottom: 12px;

      & button:first-child {
        margin-right: 16px;
      }

      & p > span:first-child,
      & p > span:nth-child(2) {
        display: none;
      }
    }
  `,

  OrderId: styled.span`
    font-size: 14px;
    margin: 0 auto 0 8px;

    & + span {
      margin-left: 28px;
      font-size: 14px;
      color: var(--text-color);
    }

    @media (max-width: 420px) {
      & + span {
        margin-left: 0;
        font-size: 15px;
        font-weight: 500;
      }
    }
  `,

  OrderStatus: styled.p`
    color: var(--red-color);
  `,
};

const buttonStyle = css`
  display: flex;

  & > svg {
    padding-top: 2px;
    margin-left: 4px;
  }

  @media (max-width: 420px) {
    & > svg {
      padding-top: 0;
    }

    & span {
      display: none;
    }
  }
`;

export default OrderDetailNavigator;
