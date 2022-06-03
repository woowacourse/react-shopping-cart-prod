import styled from "@emotion/styled";

const StyledProductInfo = styled.div`
  display: flex;
  padding: 10px 0px 10px 15px;
  margin-bottom: 30px;

  .l-left {
    width: 100%;
  }

  color: ${({ theme }) => theme.colors.black1};
  .product-title {
    font-size: ${({ theme }) => theme.fontSize.m};
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
      text-decoration: underline;
      text-underline-position: under;
      text-decoration-color: ${({ theme }) => theme.colors.mint};
    }
  }
  .product-price {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

export default StyledProductInfo;
