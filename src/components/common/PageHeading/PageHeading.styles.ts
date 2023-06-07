import { css } from 'styled-components';

const headingStyle = css`
  margin-bottom: ${({ theme }) => theme.spacer.spacing5};
  padding-top: ${({ theme }) => theme.spacer.spacing3};
  text-align: center;
`;

export { headingStyle };
