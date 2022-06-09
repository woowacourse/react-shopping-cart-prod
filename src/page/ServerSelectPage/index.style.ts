// @ts-nocheck
import styled from 'styled-components';
import { Button } from 'components';

const Styled = {
  Container: styled.main`
    width: 1000px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0 100px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    margin-top: 26px;
    align-items: center;
    justify-content: center;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  SelectButton: styled(Button)``,
};

export default Styled;
