import styled, { css } from 'styled-components';

const ContentContainer = styled.div`
  width: 300px;
`;

const messageStyle = css`
  margin: ${({ theme }) => theme.spacer.spacing4};
  padding: ${({ theme }) => theme.spacer.spacing3} 0;
  font-weight: 600;
  text-align: center;
`;

const buttonStyle = css`
  border-top: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 0 0 8px 8px;
`;

export { ContentContainer, messageStyle, buttonStyle };
