import Header from "@/components/pages/cart/header/Header";
import Content from "@/components/pages/cart/content/Content";
import ProductList from "@/components/pages/cart/product-list/ProductList";
import Price from "@/components/pages/cart/price/Price";

import StyledWrapper from "@/components/common/wrapper/ContentWrapper.styled";

function Cart() {
  return (
    <StyledWrapper>
      <Header />
      <Content>
        <ProductList />
        <Price />
      </Content>
    </StyledWrapper>
  );
}

export default Cart;
