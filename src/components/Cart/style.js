import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0;
  border-bottom: 1.5px solid ${({ theme }) => theme.gray_100};

  &:last-child {
    margin-bottom: none;
  }

  .left {
    display: flex;
  }

  .cart-product {
    width: 144px;
    height: 147px;
    margin: 0 20px 0 15px;
    transition: transform 0.2s;
  }

  .cart-product:hover {
    transform: scale(1.2);
  }

  .left .title {
    font-size: 2rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black_50};
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  .right img {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }

  .quantity-wrapper {
    display: flex;
    height: 60px;
  }

  .quantity-wrapper .quantity {
    width: 73px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.gray_100};
  }

  .quantity-wrapper .quantity p {
    font-size: 2.4rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black_50};
  }

  .plus-minus-wrapper .plus {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 50%;
    border-top: 1px solid ${({ theme }) => theme.gray_100};
    border-right: 1px solid ${({ theme }) => theme.gray_100};
    border-bottom: 1px solid ${({ theme }) => theme.gray_100};

    &:hover {
      background-color: ${({ theme }) => theme.gray_100};
    }
  }

  .plus-minus-wrapper .plus div {
    width: 0;
    height: 0;
    border-bottom: 6px solid ${({ theme }) => theme.black_50};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }

  .plus-minus-wrapper .minus {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 50%;
    border-right: 1px solid ${({ theme }) => theme.gray_100};
    border-bottom: 1px solid ${({ theme }) => theme.gray_100};

    &:hover {
      background-color: ${({ theme }) => theme.gray_100};
    }
  }

  .plus-minus-wrapper .minus div {
    width: 0;
    height: 0;
    border-top: 6px solid ${({ theme }) => theme.black_50};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }

  .right .price {
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black_50};
  }

  @media screen and (max-width: 1100px) {
    .cart-product {
      width: 100px;
      height: 97px;
    }
  }

  @media screen and (max-width: 1000px) {
    .cart-product {
      width: 90px;
      height: 87px;
    }
  }
`;
