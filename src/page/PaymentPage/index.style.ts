// @ts-nocheck
import styled from 'styled-components';

const Styled = {
  Container: styled.main`
    width: 1000px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0 100px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    margin-top: 26px;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  Title: styled.p`
    font-weight: 700;
    font-size: 23px;
    line-height: 37px;
    text-align: center;
    letter-spacing: 0.5px;
  `,

  Division: styled.hr`
    width: inherit;
    height: 2px;
    background-color: black;
    margin: 10px 0 0 0;
  `,

  ProductListTitle: styled.p`
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.5px;
    padding: 16px 0;
  `,

  ProductList: styled.div`
    overflow: scroll;
    height: 522px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray};

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  OrderSheet: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
  `,

  LeftSide: styled.div``,

  RightSide: styled.div`
    padding-top: 100px;
  `,
};

export default Styled;
