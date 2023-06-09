import styled from 'styled-components';
import { Layout } from '../layout';
import { CartItemsSection } from '../components/cartPage/cartItemsSection/CartItemsSection';
import { OrderSummarySection } from '../components/cartPage/orderSummarySection/OrderSummarySection';
import { useRecoilValue } from 'recoil';
import { cartItemsLengthState } from '../recoil/selectors/cartListSelector';
import { PageTitle } from '../layout/pageTitle/PageTitle';
import { Suspense } from 'react';
import Loading from '../components/common/Loading';

export const Cart = () => {
  const cartItemsLength = useRecoilValue(cartItemsLengthState);

  return (
    <Layout>
      <PageTitle>장바구니</PageTitle>

      {cartItemsLength > 0 ? (
        <Style.Content>
          <Suspense fallback={<Loading />}>
            <CartItemsSection />
            <OrderSummarySection />
          </Suspense>
        </Style.Content>
      ) : (
        <Style.EmptyCartContainer>
          <Style.EmptyCartImage
            src={`${process.env.PUBLIC_URL}/assets/empty_cart_image.jpg`}
          />
          <p>장바구니가 비어있습니다.</p>
        </Style.EmptyCartContainer>
      )}
    </Layout>
  );
};

const Style = {
  Header: styled.div`
    width: 100%;
    height: 67px;

    display: flex;
    justify-content: center;

    border-bottom: 4px solid #333333;
    margin-bottom: 34px;
  `,
  HeaderTitle: styled.h1`
    padding: 0;
    margin: 0;

    font-size: 32px;
  `,
  Content: styled.div`
    max-width: 1080px;
    height: max-content;

    display: flex;
    gap: 70px;

    margin: 0 auto;

    @media (max-width: 1080px) {
      flex-direction: column;
      align-items: center;
      gap: 0;
    }
  `,
  EmptyCartContainer: styled.div`
    max-width: 1080px;
    min-height: 50vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
      font-size: 24px;

      margin-top: 60px;
    }
  `,

  EmptyCartImage: styled.img`
    width: 300px;
    height: 300px;
  `,
};
