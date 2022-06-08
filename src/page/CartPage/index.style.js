import { Button } from 'components';
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

  SelectController: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  `,

  CheckBoxContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 78px;

    font-weight: 400;
    font-size: 13px;
    letter-spacing: 0.5px;
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
    height: 430px;
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

  Empty: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProductDeleteButton: styled(Button)`
    color: ${({ theme }) => theme.colors.black};
    border: 1px solid #bbbbbb;
    padding: 10px 16px;
    font-size: 12px;
  `,
};

export default Styled;
