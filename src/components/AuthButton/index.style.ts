import Button from 'components/@shared/Button';
import styled from 'styled-components';

const Styled = {
  Button: styled(Button)<{ color: string }>`
    margin-top: 30px;
    width: 439px;
    height: 48px;
    border-radius: 5px;
    background-color: ${({ theme, color }) =>
      color ? theme.colors[color] : theme.colors.mint_001};
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray};
      cursor: default;
    }
  `,
};

// is

export default Styled;
