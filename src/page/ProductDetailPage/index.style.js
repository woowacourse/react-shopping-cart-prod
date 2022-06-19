import styled from 'styled-components';
import { Button } from 'components';

const Styled = {
  Container: styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1269px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 40px;
    overflow: scroll;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  ProductContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 390px;
    align-items: center;
  `,

  ProductName: styled.p`
    width: inherit;
    box-sizing: border-box;
    padding: 0 23px;

    font-weight: 700;
    font-size: 23px;
    line-height: 25px;
    letter-spacing: 0.5px;
    margin-top: 21px;
  `,

  Division: styled.hr`
    width: 390px;
    height: 0.15px;
    background-color: ${({ theme }) => theme.colors.brown};
    margin: 16px 0;
  `,

  PriceContainer: styled.div`
    width: inherit;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 25px;
  `,

  PriceTag: styled.p`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.5px;
  `,

  ProductPrice: styled.p`
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    letter-spacing: 0.5px;
  `,

  PutCartButton: styled(Button)`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.brown};
    width: 390px;
    height: 60px;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    margin-top: 30px;
    padding: 7px;
  `,
};

export default Styled;
