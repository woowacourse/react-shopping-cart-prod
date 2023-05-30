import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { useRouter } from "../hooks/useRouter";
import { localProductsSelector } from "../recoil/selector";
import { ROUTER_PATH } from "../router";
import { Header, Page, TotalPriceTable } from "../components";
import { OrderProductList } from "../components/OrderProductList";
import { CouponSelectBox } from "../components/CouponSelectBox";

const Order = () => {
  const { goPage } = useRouter();

  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문서</TitleBox>
        <Container>
          <OrderProductList />
          <PriceContainer>
            <CouponSelectBox />
            <TotalPriceTable status="order" />
          </PriceContainer>
        </Container>
      </Page>
    </>
  );
};

const TitleBox = styled.div`
  align-self: center;
  width: 85%;
  height: 40px;

  font-weight: 700;
  font-size: 25px;
  text-align: center;
  border-bottom: 4px solid var(--dark-gray);
`;

const Container = styled.section`
  display: flex;
  padding: 40px 8%;
  justify-content: space-between;

  @media screen and (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
  }
`;

const PriceContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export default Order;
