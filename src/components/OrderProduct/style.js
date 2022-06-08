import styled from 'styled-components';

export default styled.div`
  width: 100%;
  padding: 25px 17px;
  border: 1px solid ${({ theme }) => theme.gray_200};

  .cart-product {
    width: 100px;
    height: 100px;
    margin-right: 17px;
  }

  .info .title {
    margin-bottom: 12px;
    font-size: 1.5rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black_50};
  }

  .info .rest {
    font-size: 1.3rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.gray_400};
  }
`;
