import styled, { css } from 'styled-components';

const ListContainer = styled.section`
  margin-top: 24px;
  width: 760px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing4};
  justify-self: start;

  &.center {
    margin: 0;
    padding: 72px 24px;
    justify-content: center;
    align-items: center;
    gap: initial;

    & button {
      width: 200px;
    }
  }

  @media screen and (max-width: 1200px) {
    width: calc(100vw - 48px);
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

export { ListContainer, EmptyImage, emptyMessageStyle };
