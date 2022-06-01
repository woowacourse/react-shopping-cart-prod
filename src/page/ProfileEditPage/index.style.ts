import { Button } from 'components';
import styled from 'styled-components';

const Styled = {
  Container: styled.main`
    width: 1269px;
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 140px;
    padding: 40px;
    overflow: scroll;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  ChangePasswordButton: styled(Button)`
    width: 200px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.mint_001};
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    padding: 15px;
  `,

  DeleteAccountButton: styled(Button)`
    background-color: ${({ theme }) => theme.colors.red};
    width: 200px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    padding: 15px;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Line: styled.hr`
    margin: 34px 0;
  `,
};

export default Styled;
