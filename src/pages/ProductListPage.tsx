import { styled } from 'styled-components';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/product/ProductList/ProductList';
import ProductFallBack from '../components/product/ProductFallBack/ProductFallBack';
import CouponBannerImage from '../assets/CouponBanner.png';
import CouponBannerImageSmall from '../assets/CouponBannerSmall.png';
import PageContentErrorBoundary from '../errorHandler/PageContentErrorBoundary';

const ProductListPage = () => {
  return (
    <Layout>
      <BannerDiv>
        <Link to="/coupons" aria-label="쿠폰 지급 이벤트">
          <picture>
            <source srcSet={CouponBannerImage} media="(min-width: 800px)" />
            <source srcSet={CouponBannerImageSmall} media="(min-width: 0px)" />
            <img
              src={CouponBannerImage}
              loading="lazy"
              alt="쿠폰 이벤트 배너. 무너진 건물에 '우리 식당 정상 영업 합니다'라는 플랜카드가 걸려 있다."
            />
          </picture>
        </Link>
      </BannerDiv>
      <PageContentErrorBoundary message="서버로부터 물건 정보를 불러오는 데 실패했어요.">
        <Suspense fallback={<ProductFallBack />}>
          <ProductList />
        </Suspense>
      </PageContentErrorBoundary>
    </Layout>
  );
};

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 60px;

  padding: 140px 0 60px 0;

  @media screen and (min-width: 1200px) {
    justify-content: center;
  }
`;

const BannerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ProductListPage;
