import { BsChevronRight } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { css, styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { ORDER_URL } from '../../constants/url';
import { useFetchData } from '../../hooks/useFetchData';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import { orderListState, serverState } from '../../recoil';
import Button from '../common/Button';
import TrashCanIcon from '../icons/TrashCanIcon';

interface Props {
  orderId: number;
  createdAt: string;
}

const OrderDetailNavigator = ({ orderId, createdAt }: Props) => {
  const goToPage = useGoToAnotherPage();
  const location = useLocation().pathname;

  const server = useRecoilValue(serverState);
  const { api } = useFetchData();

  const setOrderList = useSetRecoilState(orderListState);

  const handleTrashCanClick = () => {
    api
      .delete(`${server}${ORDER_URL}/${orderId}`)
      .then(() => {
        setOrderList((prev) => prev.filter((list) => list.orderId !== orderId));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <S.Head tabIndex={0}>
      {location !== `${ROUTE_PATH.ORDER_LIST_PAGE}/${orderId}` && (
        <Button onClick={handleTrashCanClick}>
          <TrashCanIcon patternId={orderId} imageSize={{ width: '40', height: '40' }} />
        </Button>
      )}
      <p>
        주문번호&nbsp;&nbsp;|&nbsp;
        <S.OrderId>{orderId}</S.OrderId>
        <span>[ {createdAt} ]</span>
      </p>
      {location !== `${ROUTE_PATH.ORDER_LIST_PAGE}/${orderId}` && (
        <Button
          css={buttonStyle}
          onClick={() => goToPage(`${ROUTE_PATH.ORDER_LIST_PAGE}/${orderId}`)}
        >
          상세보기
          <BsChevronRight style={{ marginLeft: '4px' }} />
        </Button>
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
  `,

  OrderId: styled.span`
    font-size: 14px;
    margin: 0 auto 0 8px;

    & + span {
      margin-left: 28px;
      font-size: 14px;
      color: var(--text-color);
    }
  `,
};

const buttonStyle = css`
  display: flex;

  & > svg {
    padding-top: 2px;
  }
`;

export default OrderDetailNavigator;
