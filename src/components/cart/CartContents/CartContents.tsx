import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { Suspense, useState } from 'react';
import CartList from '../CartList/CartList';
import PaymentAmount from '../PaymentAmount/PaymentAmount';
import getCartLength from '../../../globalState/selectors/getCartLength';
import CouponInfo from '../../../types/coupon';
import CouponSelectRadio from '../../coupon/CouponSelectRadio/CouponSelectRadio';
import CartCouponErrorBoundary from '../../../errorHandler/CartCouponErrorBoundary';
import Colors from '../../../constant/Colors';

const CartContents = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<CouponInfo | null>(null);
  const cartLength = useRecoilValue(getCartLength);

  return cartLength ? (
    <Contents>
      <CartList />
      <PaymentDiv>
        <CartCouponErrorBoundary>
          <Suspense fallback={<CouponFallbackDiv>쿠폰 목록을 불러오고 있어요.</CouponFallbackDiv>}>
            <CouponSelectRadio selected={selectedCoupon} setSelected={setSelectedCoupon} />
          </Suspense>
        </CartCouponErrorBoundary>
        <PaymentAmount coupon={selectedCoupon ?? undefined} />
      </PaymentDiv>
    </Contents>
  ) : (
    <EmptyCartView>
      장바구니에 상품이 존재하지 않습니다.
      <Link to="/">
        <LinkButton>상품 담으러 가기</LinkButton>
      </Link>
    </EmptyCartView>
  );
};

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 34px;

  @media screen and (max-width: 1320px) {
    flex-direction: column;
    justify-content: baseline;
    gap: 100px;
  }
`;

const EmptyCartView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  margin-top: 200px;

  font-weight: 500;
  font-size: 30px;
`;

const LinkButton = styled.button`
  width: 300px;
  padding: 20px 50px;
  background-color: ${Colors.grey1};

  border: none;
  border-radius: 15px;

  font-size: 20px;
  color: white;

  cursor: pointer;
`;

const CouponFallbackDiv = styled.div`
  padding: 20px 30px;

  border: 1px solid ${Colors.grey4};
  color: ${Colors.grey1};
  font-weight: 400;
  font-size: 24px;
`;

const PaymentDiv = styled.div`
  width: 550px;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

export default CartContents;
