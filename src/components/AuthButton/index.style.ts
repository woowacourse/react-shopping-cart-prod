import Button from 'components/@shared/Button';
import styled from 'styled-components';

const Styled = {
  Button: styled(Button)`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.mint_001};
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray};
      cursor: default;
    }
  `,
};

export default Styled;
