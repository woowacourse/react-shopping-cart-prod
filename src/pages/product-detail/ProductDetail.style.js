import styled from "@emotion/styled";

const StyledProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 375px;
  margin: 0 auto;

  img {
    width: 500px;
    height: 500px;
    border: 2px solid #cccccc;
    margin-bottom: 30px;
  }

  .product__name {
    font-size: 32px;
    font-weight: 700;
  }

  hr {
    width: 100%;
    margin: 15px 0;
    border: 1.5px solid #aaaaaa;
  }

  .product__price__wrapper {
    display: flex;
    width: 90%;
    justify-content: space-between;
    margin-bottom: 25px;

    .product__price__label {
      font-size: 16px;
    }
    .product__price {
      font-size: 20px;
    }
  }
`;

export default StyledProductDetailContainer;
