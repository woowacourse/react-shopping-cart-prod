import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1320];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 80px;

  margin-top: 50px;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

export default CartWrapper;
