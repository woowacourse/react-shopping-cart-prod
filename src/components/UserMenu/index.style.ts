import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    position: relative;
  `,

  NicknameThumbnail: styled.div`
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.mint_001};
    font-weight: bold;
    font-size: 16px;
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

  Nickname: styled.div`
    width: 60px;
    padding: 10px;
    color: ${({ theme }) => theme.colors.gray_005};
  `,

  MenuItem: styled.div`
    width: 60px;
    cursor: pointer;
    padding: 10px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.mint_001};
      color: ${({ theme }) => theme.colors.white};
    }
  `,

  Line: styled.hr`
    width: 100%;
    height: 1px;
    margin: 0;
    border: none;
    background-color: ${({ theme }) => theme.colors.gray};
  `,
};

export default Styled;
