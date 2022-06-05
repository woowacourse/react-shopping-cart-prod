import Title from "@/components/Title";
import CartList from "@/components/CartList";

import StyledWrapper from "@/components/Wrapper/index.styled";

function Cart() {
  return (
    <StyledWrapper>
      <Title>장바구니</Title>
      <CartList />
    </StyledWrapper>
  );
}

export default Cart;
