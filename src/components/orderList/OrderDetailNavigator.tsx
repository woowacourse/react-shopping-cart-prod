import { BsChevronRight } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import Button from '../common/Button';

interface Props {
  orderId: number;
}

const OrderDetailNavigator = ({ orderId }: Props) => {
  const goToPage = useGoToAnotherPage();

  const location = useLocation().pathname;

  return (
    <S.Head>
      주문번호&nbsp;&nbsp;|&nbsp;<S.OrderId>{orderId}</S.OrderId>
      {location !== ROUTE_PATH.ORDER_DETAIL_PAGE && (
        <Button css={buttonStyle} onClick={() => goToPage(ROUTE_PATH.ORDER_DETAIL_PAGE)}>
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
    padding: 30px 0 24px;
    border-bottom: 1px solid var(--gray-color-300);
    color: var(--text-color);
  `,

  OrderId: styled.span`
    font-size: 14px;
    margin: 0 auto 0 8px;
  `,
};

const buttonStyle = css`
  display: flex;

  & > svg {
    padding-top: 2px;
  }
`;

export default OrderDetailNavigator;
