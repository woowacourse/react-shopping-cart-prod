import styled from 'styled-components';
import { Button } from 'components';

const Styled = {
  Container: styled.div`
    width: 348px;
    height: 230px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
  `,

  Header: styled.div`
    width: 350px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: -1px;
  `,

  Body: styled.div`
    width: 348px;
    height: 180px;
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  PriceContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Action: styled(Button)`
    width: 100%;
    height: 53px;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    background-color: ${({ theme }) => theme.colors.mint_001};
    color: ${({ theme }) => theme.colors.white};
  `,
};

export default Styled;
