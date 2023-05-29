import { BsChevronRight } from 'react-icons/bs';
import { css, styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import Button from '../common/Button';

interface Props {
  orderId: number;
}

const OrderDetailNavigator = ({ orderId }: Props) => {
  const goToPage = useGoToAnotherPage();

  return (
    <S.Head>
      주문번호 : {orderId}
      <Button css={buttonStyle} onClick={() => goToPage(ROUTE_PATH.ORDER_DETAIL_PAGE)}>
        상세보기
        <BsChevronRight />
      </Button>
    </S.Head>
  );
};

const S = {
  Head: styled.dt`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 36px 40px;
    font-size: 20px;
    color: var(--text-color);
    background: #f6f6f6;
  `,
};

const buttonStyle = css`
  display: flex;

  & > svg {
    padding-top: 2px;
  }
`;

export default OrderDetailNavigator;
