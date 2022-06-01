import styled from 'styled-components';

const Styled = {
  ProductListPage: styled.main`
    width: 1269px;
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 100px;
    padding: 40px;
    overflow: scroll;
    height: 100%;
    display: flex;
    justify-content: center;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  ProductList: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  `,

  Loading: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export default Styled;
