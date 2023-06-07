import { styled } from 'styled-components';
import { css } from 'styled-components';

const List = styled.ol`
  max-width: calc(100vw - 48px);
  width: 960px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing6};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing4};
`;

const headingStyle = css`
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  padding-bottom: ${({ theme }) => theme.spacer.spacing3};
  border-bottom: 2px solid ${({ theme }) => theme.color.gray6};
`;

export { List, headingStyle };
