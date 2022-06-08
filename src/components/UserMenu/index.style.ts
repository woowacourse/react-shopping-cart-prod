import styled from 'styled-components';

const Styled = {
  Dimmer: styled.div`
    position: absolute;
    width: 100vw;
    height: 100vw;
    z-index: 100;
    left: -882px;
    top: -13px;
  `,

  Container: styled.div`
    position: relative;
  `,

  NicknameThumbail: styled.div`
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.mint_001};
    font-weight: bold;
    font-size: 12px;
    margin-left: 15px;
    cursor: pointer;
  `,

  Menu: styled.div`
    width: fit-content;
    height: fit-content;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    right: 0px;
    top: 45px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
      0px 1px 3px rgba(0, 0, 0, 0.2);
    border: 0.5px solid ${({ theme }) => theme.colors.gray};
    font-size: 14px;
    z-index: 500;

    &::after {
      top: -14px;
      right: 10px;
      content: '';
      border: 7px solid transparent;
      border-bottom-color: ${({ theme }) => theme.colors.white};
      position: absolute;
    }

    &::before {
      top: -16px;
      right: 9px;
      content: '';
      border: 8px solid transparent;
      border-bottom-color: ${({ theme }) => theme.colors.gray};
      position: absolute;
    }
  `,

  NicknameContainer: styled.div`
    width: 150px;
    padding: 17px 12px;
    color: ${({ theme }) => theme.colors.black};
    font-size: 15px;
  `,

  Nickname: styled.span`
    font-weight: bold;
  `,

  MenuItem: styled.div`
    width: 150px;
    cursor: pointer;
    padding: 12px;
    color: ${({ theme }) => theme.colors.gray_005};
    font-size: 13px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.mint_001};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
};

export default Styled;
