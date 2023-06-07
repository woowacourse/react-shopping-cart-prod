import styled, { css } from 'styled-components';

const List = styled.ol`
  max-width: calc(100vw - 48px);
  width: 960px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing6};

  &.center {
    position: relative;
    top: calc(50% - 48px);
    margin: 0;
    padding: 72px 24px;
    justify-content: center;
    align-items: center;
    gap: initial;
    transform: translateY(-50%);

    & button {
      width: 200px;
    }
  }
`;

const EmptyImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
`;

const emptyMessageStyle = css`
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
  font-weight: 600;
  text-align: center;
`;

export { List, EmptyImage, emptyMessageStyle };
