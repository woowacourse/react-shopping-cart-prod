import styled from 'styled-components';

const Styled = {
  Container: styled.main`
    width: 1269px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 40px;
    overflow: scroll;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};

export default Styled;
