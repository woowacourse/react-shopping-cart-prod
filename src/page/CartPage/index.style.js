import { Button } from 'components';
import styled from 'styled-components';

const Styled = {
  Container: styled.main`
    width: 1000px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0 100px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
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
    margin: 10px 0;
  `,

  SelectController: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 28px 0;
  `,

  CheckBoxContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;

    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.5px;
  `,

  ProductListTitle: styled.p`
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #aaaaaa;
    padding: 16px 0;
  `,

  ProductList: styled.div``,

  OrderSheet: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
  `,

  LeftSide: styled.div`
    height: 700px;
  `,

  RightSide: styled.div`
    width: 348px;
    height: 230px;
    position: sticky;
    top: 0;
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
    padding: 12px 22px;
  `,
};

export default Styled;
