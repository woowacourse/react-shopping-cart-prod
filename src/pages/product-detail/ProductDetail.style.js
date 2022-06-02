import styled from "@emotion/styled";

const StyledProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 375px;
  margin: 30px auto;

  img {
    width: 400px;
    height: 400px;
    border: 2px solid ${({ theme }) => theme.colors.gray3};
    margin-bottom: 30px;
  }

  .product__name {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
  }

  hr {
    width: 100%;
    margin: 15px 0;
    border: 1.5px solid ${({ theme }) => theme.colors.gray1};
  }

  .product__price__wrapper {
    display: flex;
    width: 90%;
    justify-content: space-between;
    margin-bottom: 25px;

    .product__price__label {
      font-size: ${({ theme }) => theme.fontSize.ss};
    }
    .product__price {
      font-size: ${({ theme }) => theme.fontSize.m};
    }
  }
`;

export default StyledProductDetailContainer;
