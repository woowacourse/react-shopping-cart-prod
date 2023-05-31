import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { localProductsSelector } from "../recoil/selector";
import {
  Header,
  Page,
  CartProductList,
  TotalPriceTable,
  GuideBox,
} from "../components";

const Cart = () => {
  const cartProducts = useRecoilValue(localProductsSelector);

  return (
    <>
      <Header />
      <Page>
        <TitleBox>장바구니</TitleBox>
        {cartProducts.length === 0 ? (
          <GuideBox
            icon="🛒"
            message="장바구니가 텅 비었어요"
            guideMessage="상품 담으러 가기"
          />
        ) : (
          <Container>
            <CartProductList />
            <TotalPriceTable status="cart" />
          </Container>
        )}
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

export default Cart;
