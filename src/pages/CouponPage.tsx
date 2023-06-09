import { styled } from 'styled-components';
import { Suspense } from 'react';
import CouponList from '../components/coupon/CounponList/CouponList';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner';
import PageContentErrorBoundary from '../errorHandler/ProductsErrorBoundary';
import Colors from '../constant/Colors';

const CouponPage = () => {
  return (
    <Layout>
      <Title>쿠폰 받기</Title>
      <PageContentErrorBoundary message="서버로부터 쿠폰 목록을 가져오는 데 실패했어요.">
        <Suspense
          fallback={
            <Fallback>
              <LoadingSpinner color={Colors.staleTurquoise} />
            </Fallback>
          }
        >
          <CouponList />
        </Suspense>
      </PageContentErrorBoundary>
    </Layout>
  );
};

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 140px 0 60px 0;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  margin-bottom: 60px;

  border-bottom: 4px solid ${Colors.grey1};
  text-align: center;
`;

const Fallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CouponPage;
