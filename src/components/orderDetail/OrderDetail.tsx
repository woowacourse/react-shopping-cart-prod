import { BsCreditCardFill, BsFillCartDashFill } from 'react-icons/bs';
import { css, styled } from 'styled-components';
import { ORDER_STATUS } from '../../constants';
import { CouponState, OrderList } from '../../types';
import Price from '../Price';

interface Props extends Pick<OrderList, 'orderStatus'> {
  totalPrice: number;
  deliveryFee: number;
  coupon: CouponState | null;
  totalPayments: number;
}

const OrderDetail = ({ totalPrice, deliveryFee, coupon, totalPayments, orderStatus }: Props) => {
  return (
    <S.Wrapper>
      <S.List tabIndex={0}>
        <S.Title>
          <BsCreditCardFill />
          결제 정보
        </S.Title>
        <li>
          총 상품금액 <Price price={totalPrice} />
        </li>
        <li>
          배송비 <Price price={deliveryFee} />
        </li>
        <S.Coupon coupon={coupon?.name}>
          할인쿠폰
          <Price price={coupon && coupon.priceDiscount ? -coupon.priceDiscount : 0} />
        </S.Coupon>
        <li>
          총 결제금액 <Price price={totalPayments} />
        </li>
      </S.List>
      {orderStatus === ORDER_STATUS.CANCEL && (
        <S.Return>
          <S.Title>
            <BsFillCartDashFill />
            환불 금액
          </S.Title>
          <li>
            총 환불금 <Price price={totalPayments} css={returnStyle} />
          </li>
        </S.Return>
      )}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: sticky;
    top: 80px;
    flex: 0.5;
    max-height: 338px;
    margin-top: 30px;
    font-size: 18px;
    color: var(--text-color);
    border: 1px solid var(--gray-color-300);
    border-radius: 4px;
  `,

  List: styled.ul`
    & li {
      display: flex;
      align-items: center;

      & svg {
        margin: 4px 12px 0 0;
      }
    }

    & > li:not(li:first-child) {
      padding: 28px 28px 0;
      justify-content: space-between;
      font-weight: 500;

      & + li:last-child {
        padding: 64px 28px 38px;
        font-weight: 600;
      }
    }
  `,

  Title: styled.li`
    margin-bottom: 8px;
    padding: 22px 28px 24px;
    font-size: 20px;
    font-weight: 700;
    color: var(--white-color);
    background: var(--text-color);
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  `,

  Coupon: styled.li<{ coupon?: string }>`
    position: relative;

    &::after {
      content: '${(props) => props.coupon}';
      position: absolute;
      right: 28px;
      bottom: -24px;
      font-size: 12px;
      color: var(--gray-color-300);
    }
  `,

  Return: styled.ul`
    margin-top: 32px;
    font-size: 18px;
    color: var(--text-color);
    border: 1px solid var(--gray-color-300);
    border-radius: 4px;

    & li:first-child {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    & li {
      display: flex;
      align-items: center;

      & + li:last-child {
        justify-content: space-between;
        padding: 24px 28px 38px;
        font-weight: 600;
      }
    }
  `,
};

const returnStyle = css`
  color: var(--red-color);
`;

export default OrderDetail;
