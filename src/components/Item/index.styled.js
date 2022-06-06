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

const StyledProductItem = styled.div`
  position: relative;
  transition: 0.3s ease;
  margin: 10px 0;

  :hover {
    .thumbnail {
      img {
        transform: scale(0.99);
      }
    }
  }

  .thumbnail {
    overflow: hidden;
    height: 100%;
    img {
      transition: 0.3s ease;
    }
  }

  .content {
    position: absolute;
    margin-top: 5px;

    left: 0;
    right: 0;
  }
`;

export { StyledProductInfo, StyledProductItem };
