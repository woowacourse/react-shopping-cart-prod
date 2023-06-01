import { styled } from 'styled-components';
import CouponList from '../components/coupon/CounponList/CouponList';

const CouponPage = () => {
  return (
    <Layout>
      <Title>쿠폰 받기</Title>
      <CouponList />
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

  border-bottom: 4px solid #333333;
  text-align: center;
`;

export default CouponPage;
