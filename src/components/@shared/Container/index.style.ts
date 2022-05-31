import styled from 'styled-components';

const Styled = {
  Container: styled.div<{ width: string; height: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 48px;
    border: 2px solid ${({ theme }) => theme.colors.gray_003};
    border-radius: 16px;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
  `,
};

export default Styled;
