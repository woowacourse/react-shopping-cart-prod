import styled from 'styled-components';

const Styled = {
  Container: styled.main`
    width: 1000px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0 100px;
    overflow: scroll;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};

export default Styled;
