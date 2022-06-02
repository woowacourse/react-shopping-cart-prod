import styled from 'styled-components';

const Styled = {
  Container: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 58px;
    background-color: ${({ theme }) => theme.colors.mint_001};
    z-index: 500;
    padding-top: 10px;
  `,
};

export default Styled;
