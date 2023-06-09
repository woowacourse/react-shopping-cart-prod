import { css, styled } from 'styled-components';

import { TickCircleIcon } from '../../assets/svg';

const InformationContainer = styled.div`
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50%);

  & > .heading {
    margin-bottom: ${({ theme }) => theme.spacer.spacing1};
    font-weight: 500;

    & > span {
      font-weight: bold;
    }
  }
`;

const SuccessIcon = styled(TickCircleIcon)`
  width: 64px;
  height: 64px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};

  & path {
    stroke: ${({ theme }) => theme.color.primary};
    stroke-width: 1.5;
  }
`;

const messageStyle = css`
  margin: ${({ theme }) => theme.spacer.spacing2} 0;
`;

const homeButtonStyle = css`
  margin-top: ${({ theme }) => theme.spacer.spacing3};
`;

const detailButtonStyle = css`
  margin-top: ${({ theme }) => theme.spacer.spacing2};
`;

export { InformationContainer, SuccessIcon, messageStyle, homeButtonStyle, detailButtonStyle };
