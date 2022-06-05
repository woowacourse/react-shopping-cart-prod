import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1320];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 80px;
  grid-column-gap: 40px;
  margin-top: 20px;
  padding: 0 20px;

  ${mq[0]} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mq[1]} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mq[2]} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${mq[3]} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default StyledProductList;
