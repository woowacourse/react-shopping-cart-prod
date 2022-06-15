import styled from "@emotion/styled";

const StyledCartContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .product-item__left {
    display: flex;
    gap: 15px;
    margin-top: 10px;

    img {
      width: 144px;
      height: 144px;

      cursor: pointer;
    }

    a {
      font-size: ${({ theme }) => theme.fontSize.xs};
      height: 120px;

      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-underline-position: under;
      }
    }
  }

  .product-item__right {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    gap: 15px;

    button {
      border: none;
      width: 28px;
      height: 28px;
    }

    .quantity__container {
      display: flex;
      justify-content: center;
      align-items: center;

      .quantity {
        justify-content: center;

        width: 50px;
        height: 40px;
        border: 1px solid ${({ theme }) => theme.colors.gray_400};
        text-align: center;
        line-height: 40px;
        font-size: ${({ theme }) => theme.fontSize.m};
      }

      .quantity__buttons {
        display: flex;
        flex-direction: column;

        button {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 20px;
          height: 20px;
          border: 1px solid ${({ theme }) => theme.colors.gray_400};
        }
      }

      .cart-price {
        color: ${({ theme }) => theme.colors.gray_700};
        align-self: flex-end;
      }
    }
  }
`;

const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray_600};
  margin-top: 10px;
`;

export { StyledCartContainer, StyledHr };
